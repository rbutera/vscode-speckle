import * as vscode from 'vscode'
// eslint-disable-next-line unicorn/import-style
import * as path from 'path'
import { endsWith } from 'ramda'
import { constructFilename, processFilename } from './process-filename'
import { SpeckleConfiguration } from '../types/speckle-configuration.type'

/**
 * generates an appropriate test file
 * if user has configured the option speckle.useTestsDirectoryForCreation then will use __tests directory
 * otherwise uses the current directory
 * @param filePath the implementation filename
 */
export function createTestFilePath(filePath: string): string {
  const {
    useTestsDirectoryForCreation,
    testExtensionPrefix,
  }: SpeckleConfiguration = vscode.workspace.getConfiguration(
    'speckle'
  ) as SpeckleConfiguration

  const filename = path.basename(filePath) // sum.test.js or sum.service.test.js
  const directory = path.dirname(filePath) // /user/demo/__tests__ or /user/demo/
  const inTestsDirectory = endsWith('__tests__', directory)
  const { name, extension, extensionPrefix } = processFilename(filename)
  const endsWithTestPrefix = endsWith(testExtensionPrefix)
  const extensionPrefixEndsWithTestPrefix =
    extensionPrefix && endsWithTestPrefix(extensionPrefix)

  const isTestFile = inTestsDirectory || extensionPrefixEndsWithTestPrefix

  const dotTestExtensionPrefix: string = testExtensionPrefix
    ? `.${testExtensionPrefix}`
    : ''

  const combinedTestExtensionPrefix = extensionPrefix
    ? `${extensionPrefix}${dotTestExtensionPrefix}`
    : testExtensionPrefix

  const testName = constructFilename({
    name,
    extension,
    extensionPrefix: useTestsDirectoryForCreation
      ? extensionPrefix
      : combinedTestExtensionPrefix,
  })

  const testDirectory = useTestsDirectoryForCreation
    ? path.join(directory, '__tests__')
    : directory

  return isTestFile ? filePath : path.join(testDirectory, testName)
}
