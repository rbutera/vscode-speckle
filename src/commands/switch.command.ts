import * as vscode from 'vscode'
import { compose, ifElse } from 'ramda'
import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { switchToFile } from '../utils/switch-to-file'
import { createTestFilePath } from '../utils/create-test-file-path'
import { createFile } from '../utils/create-file'

export async function switchToTestOf(file: string): Promise<vscode.TextEditor> {
  const { automaticallyCreateTestFile } = vscode.workspace.getConfiguration(
    'speckle'
  )
  const open = async () => {
    const openOptions = getTestFilePath(file)
    return switchToFile(openOptions)
  }

  try {
    return await open()
  } catch {
    if (automaticallyCreateTestFile) {
      const testFilePath = createTestFilePath(file)
      await createFile(testFilePath)
      return open()
    }
  }
}
const switchToSourceOf = compose(switchToFile, getSourceFilePath)
const switchBetweenSourceAndTest = ifElse(
  isTestFile,
  switchToSourceOf,
  switchToTestOf
)

export const switchCommand = async (): Promise<boolean | vscode.TextEditor> => {
  const activeFile = vscode.window.activeTextEditor
  if (activeFile === undefined) return false

  return switchBetweenSourceAndTest(activeFile.document.uri.fsPath)
}
