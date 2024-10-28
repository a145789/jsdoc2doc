export interface ConfigOptions {
  entry: string
  output: string
}

export enum DocMenuType {
  ExportAll = 0,
  ExportNamed = 1,
  ImportDefault = 2,
  ImportDeclaration = 3,
  NormalFunction = 4,
}

export type DocMenu =
  | {
      type: DocMenuType.ExportAll // export * from 'xxx'
      title: string
      path: string
    }
  | {
      type: DocMenuType.ExportNamed // export { xxx } from 'xxx'
      title: string
      path: string
      names: string[]
    }

export type DocItem = {
  name: string
  sourceText: string
  jsdoc: {
    description?: string
    example?: string
    params?: {
      name: string
      description?: string
    }[]
    returns?: string
  }
}

export interface Program {
  type: "Program"
  body: Statement[]
}

export type Statement =
  | {
      type: "ExportNamedDeclaration"
      source: {
        value: string
      }
      specifiers: {
        local: {
          name: string
        }
      }[]
      declaration: {
        type: "FunctionDeclaration"
        start: number
        end: number
        id: {
          name: string
        }
      }
    }
  | {
      type: "ExportAllDeclaration"
      source: {
        value: string
      }
    }
