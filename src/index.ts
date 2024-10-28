import {
  type DocItem,
  DocMenuType,
  type ConfigOptions,
  type DocMenu,
} from "./types"
import fs from "fs-extra"
import { getFileNameWithoutExtension, OxcVisitor, oxcResolve } from "./utils"
import {
  createSourceFile,
  type ExportDeclaration,
  type ExportSpecifier,
  type JSDoc,
  ScriptTarget,
  SyntaxKind,
  transpileDeclaration,
} from "typescript"
import { resolve } from "node:path"

const CWD = process.cwd()

export function generateDoc({ entry, output }: ConfigOptions) {
  const docList = parseIndex(entry).map((doc) => ({
    ...doc,
    items: parseFile(doc),
  }))

  for (const doc of docList) {
    const docDir = resolve(CWD, output, doc.title)

    fs.removeSync(docDir)
    fs.mkdirSync(docDir)

    for (const item of doc.items) {
      fs.writeFileSync(resolve(docDir, `${item.name}.md`), makeMd(item))
    }
  }

  fs.writeFileSync(
    resolve(CWD, output, "sidebarItems.ts"),
    docList
      .map(
        (doc) =>
          `
export const ${doc.title}Items = [
${doc.items.map((item) => `  { text: '${item.name}', link: '/${doc.title}/${item.name}' },`).join("\n")}
]`,
      )
      .join("\n"),
  )
}

export function parseIndex(rootPath: string) {
  const indexPath = oxcResolve(CWD, rootPath)
  const content = fs.readFileSync(indexPath, "utf-8")
  const result = createSourceFile(rootPath, content, ScriptTarget.Latest)

  const docList: DocMenu[] = []
  new OxcVisitor(result, (ast: ExportDeclaration) => {
    if (ast.exportClause) {
      const {
        elements,
        moduleSpecifier: { text: path },
      } = ast as any

      docList.push({
        type: DocMenuType.ExportNamed,
        title: getFileNameWithoutExtension(path),
        path: oxcResolve(rootPath, path),
        names: (elements as ExportSpecifier[]).map(
          (element) => (element.propertyName || element.name) as any,
        ),
      })
    } else {
      const {
        moduleSpecifier: { text: path },
      } = ast as any

      docList.push({
        type: DocMenuType.ExportAll,
        title: getFileNameWithoutExtension(path),
        path: oxcResolve(rootPath, path),
      })
    }
  })

  return docList
}

function parseFile(doc: DocMenu) {
  const { path } = doc
  const content = fs.readFileSync(path, "utf-8")

  const { outputText: code } = transpileDeclaration(content, {
    fileName: path,
    compilerOptions: { noResolve: true, noLib: true },
  })

  let { statements } = createSourceFile(path, code, ScriptTarget.Latest)

  statements = statements.filter((statement: any) => {
    if (
      statement.modifiers?.[0]?.kind === SyntaxKind.ExportKeyword &&
      (statement.kind === SyntaxKind.FunctionDeclaration ||
        (statement.kind === SyntaxKind.VariableStatement &&
          statement.declarationList.declarations[0].type?.kind ===
            SyntaxKind.FunctionType))
    ) {
      if (doc.type === DocMenuType.ExportNamed) {
        const name =
          statement.name?.escapedText ||
          statement.declarationList?.declarations[0].name?.escapedText ||
          ""
        if (!doc.names.includes(name)) {
          return false
        }
      }
      return true
    }
    return false
  }) as any

  const items: DocItem[] = statements.map((statement: any) => {
    const name =
      statement.name?.escapedText ||
      statement.declarationList?.declarations[0].name?.escapedText

    const jsDoc: JSDoc[] | undefined = statement.jsDoc

    const sourceText = jsDoc
      ? code.slice(jsDoc.at(-1)!.end, statement.end)
      : code.slice(statement.pos, statement.end)

    return {
      name,
      sourceText: sourceText.trim().replace("export declare ", ""),
      jsdoc: getJsDoc(jsDoc?.[0]),
    }
  })

  return items
}

function getJsDoc(jsDoc?: JSDoc) {
  if (!jsDoc) {
    return
  }
  return {
    description: (jsDoc.comment as string)?.trim(),

    example: (
      jsDoc.tags?.find(
        (tag) =>
          tag.kind === SyntaxKind.JSDocTag &&
          tag.tagName.escapedText === "example",
      )?.comment as string
    )?.trim(),

    returns: (
      jsDoc.tags?.find((tag) => tag.kind === SyntaxKind.JSDocReturnTag)
        ?.comment as string
    )?.trim(),
    params: jsDoc.tags
      ?.filter((tag) => tag.kind === SyntaxKind.JSDocParameterTag)
      .map((item: any) => ({
        name: item.name.escapedText,
        description: (item.comment as string)?.trim(),
      })),
  } as any
}

function makeMd(item: DocItem) {
  return `
# ${item.name}

${item.jsdoc?.description || ""}

\`\`\`ts
${item.sourceText}
\`\`\`

### Usage

${item.jsdoc?.example?.trim() || ""}

### Arguments

| Arg | Description |
| --- | ----------- |
${item.jsdoc?.params?.map((item) => `| \`${item.name}\` | ${item.description} |`).join("\n") || ""}

### Returns

${item.jsdoc?.returns || ""}
`.trim()
}
