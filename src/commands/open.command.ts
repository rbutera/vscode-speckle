import * as vscode from 'vscode'
// eslint-disable-next-line unicorn/import-style
import { compose, ifElse } from 'ramda'
import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { openFile } from '../utils/open-file'
import { createTestFilePath } from '../utils/create-test-file-path'
import { createFile } from '../utils/create-file'

export async function openTestOf(file: string): Promise<vscode.TextEditor> {
  const { automaticallyCreateTestFile } = vscode.workspace.getConfiguration(
    'speckle'
  )
  const open = async () => {
    const openOptions = getTestFilePath(file)
    return openFile(openOptions)
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

export const openSourceOf = compose(openFile, getSourceFilePath)
export const openTestOrImplementation = ifElse(
  isTestFile,
  openSourceOf,
  openTestOf
)

export const openCommand = async (): Promise<boolean | vscode.TextEditor> => {
  const activeFile = vscode.window.activeTextEditor
  if (activeFile === undefined) return false

  return openTestOrImplementation(activeFile.document.uri.fsPath)
}
