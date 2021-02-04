import { processFilename } from './process-filename'
import * as fs from 'fs'
// eslint-disable-next-line unicorn/import-style
import * as util from 'util'

const writeFile = util.promisify(fs.readFile)
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
  const { name, extension } = processFilename(fullFileName)
  const isJavascriptOrTypescript = ['ts', 'js', 'tsx', 'jsx'].includes(
    extension
  )
  const shouldUseJavascriptTemplate =
    isJavascriptOrTypescript || useJavascriptTemplate
  const description: string = camelCase(name)
  const javascriptTemplate = `import { description } from './${name}'\n\ndescribe('${description}', () => {\n\n})`
  if (fs.existsSync(fullFileName)) {
    throw new Error(`file already exists: ${fullFileName}`)
  }

  const contentsOrBlank = !contents ? '' : `${contents as string}`
  const contentsToWrite = shouldUseJavascriptTemplate
    ? javascriptTemplate
    : contentsOrBlank

  await writeFile(fullFileName, contentsToWrite)
  return fullFileName
}
