// eslint-disable-next-line unicorn/import-style
import * as path from 'path'
import { endsWith } from 'ramda'
import {
  constructFilename,
  processFilename,
  removeTestFromPrefix,
} from './process-filename'
import { OpenOption } from '../types/open-option.type'

// function removeTestSuffix(fileName: string) {
// TEST_FILE_SUFFIXES.forEach(suffix => {
// fileName = fileName.replace(`.${suffix}.`, '.')
// })
// return fileName
// }

function removeTestSuffix(fileName: string): string {
  const { name, extension, extensionPrefix } = processFilename(fileName)
  const extensionPrefixWithoutTest = extensionPrefix
    ? removeTestFromPrefix(extensionPrefix)
    : ''
  return constructFilename({
    name,
    extension,
    extensionPrefix: extensionPrefixWithoutTest,
  })
}
const endsWithTests = endsWith('__tests__')

export function getSourceFilePath(testFilePath: string): OpenOption {
  const fileFullName = path.basename(testFilePath) // sum.test.js or sum.service.test.js
  const directory = path.dirname(testFilePath) // /user/demo/__tests__ or /user/demo/
  const isTestDirectory = endsWithTests(directory)
  const sourceFolder = isTestDirectory ? path.dirname(directory) : directory

  const fileName = removeTestSuffix(fileFullName) // sum.js
  const sourceFilePath = path.join(sourceFolder, fileName) // /user/demo/sum.js
  return { possiblePaths: [sourceFilePath], fileName }
}
