// eslint-disable-next-line unicorn/import-style
import * as path from 'path'
import { TEST_FILE_SUFFIXES } from '../constants'
import { endsWith } from 'ramda'
import { processFilename } from './process-filename'

export function isTestFile(filePath: string): boolean {
  const fileName = path.basename(filePath)
  const directory = path.dirname(filePath)
  const { extensionPrefix } = processFilename(fileName)

  const fileNameContainsSuffix = TEST_FILE_SUFFIXES.some((suffix: string) =>
    endsWith(`${suffix}`)(extensionPrefix)
  )
  const isInTestDirectory = path.basename(directory) === '__tests__'
  return isInTestDirectory || fileNameContainsSuffix
}
