import { processFilename } from './process-filename'
import { generateJavascriptTemplate } from './generate-template'
import * as fs from 'fs'
// eslint-disable-next-line unicorn/import-style
import * as path from 'path'
const { promises } = fs
// eslint-disable-next-line @typescript-eslint/no-var-requires
const camelCase = require('camelCase')

export type CreateFileOptions = {
  readonly contents?: boolean | string
  readonly useJavascriptTemplate?: boolean
}

export async function createFile(
  fullFileName: string,
  { contents, useJavascriptTemplate }: CreateFileOptions = {
    contents: false,
    useJavascriptTemplate: false,
  }
): Promise<string> {
  if (fs.existsSync(fullFileName)) {
    return fullFileName
  }

  const { extension } = processFilename(fullFileName)
  const { name, extensionPrefix } = processFilename(path.basename(fullFileName))
  const isJavascriptOrTypescript = ['ts', 'js', 'tsx', 'jsx'].includes(
    extension
  )
  const shouldUseJavascriptTemplate =
    isJavascriptOrTypescript || useJavascriptTemplate
  const description: string = camelCase(name)
  const implementation = !extensionPrefix ? name : `${name}.${extensionPrefix}`
  const javascriptTemplate = generateJavascriptTemplate({
    implementation,
    name: description,
  })

  const contentsOrBlank = !contents ? '' : `${contents as string}`
  const contentsToWrite = shouldUseJavascriptTemplate
    ? javascriptTemplate
    : contentsOrBlank

  await promises.writeFile(fullFileName, contentsToWrite)
  return fullFileName
}
