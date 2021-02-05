import * as vscode from 'vscode'
// eslint-disable-next-line unicorn/import-style
import { compose } from 'ramda'
import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { openFile } from '../utils/open-file'
import { createTestFilePath } from '../utils/create-test-file-path'
import { createFile } from '../utils/create-file'

export async function createTestFor(file: string): Promise<vscode.TextEditor> {
  const testFilePath = createTestFilePath(file)
  await createFile(testFilePath)
  const openOptions = getTestFilePath(file)
  return openFile(openOptions)
}

export const openSourceOf = compose(openFile, getSourceFilePath)

export const createCommand = async (): Promise<boolean | vscode.TextEditor> => {
  const activeFile = vscode.window.activeTextEditor
  if (activeFile === undefined) return false
  const file = activeFile.document.uri.fsPath
  if (isTestFile(file)) return false
  return createTestFor(file)
}
