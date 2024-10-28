import { resolve } from "node:path"
import slash from "slash"
import { ResolverFactory } from "oxc-resolver"
import { logger } from "rslog"
import {
  SyntaxKind,
  type SourceFile,
  type Statement,
  type ExportDeclaration,
} from "typescript"

export class OxcVisitor {
  constructor(
    ast: SourceFile,
    public visitStatementCall: (ast: ExportDeclaration) => void,
  ) {
    for (const statement of ast.statements) {
      this.visitStatement(statement)
    }
  }

  visitStatement(ast: Statement) {
    if (ast.kind === SyntaxKind.ExportDeclaration) {
      this.visitStatementCall(ast as any)
    }
  }
}

export function getFileNameWithoutExtension(filePath: string) {
  const fileName = filePath.split("/").pop() || ""
  if (!fileName.includes(".")) {
    return fileName
  }

  const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".")
  return fileNameWithoutExtension
}

export function resolveSlash(...argv: string[]) {
  return slash(resolve(...argv))
}

const oxcResolver = new ResolverFactory({
  extensions: [".ts", ".js"],
})

export function oxcResolve(directory: string, request: string) {
  const { path, error } = oxcResolver.sync(directory, request)
  if (error || !path) {
    logger.error(error || `Not found ${request}`)
    process.exit(1)
  }
  return resolveSlash(path)
}
