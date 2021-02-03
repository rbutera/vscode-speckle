import * as vscode from 'vscode'
import { compose, ifElse } from 'ramda'
import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { openFile } from '../utils/open-file'

const openSourceOf = compose(openFile, getSourceFilePath)
const openTestOf = compose(openFile, getTestFilePath)
const openTestOrImplementation = ifElse(isTestFile, openSourceOf, openTestOf)

export const openCommand = () => {
  const activeFile = vscode.window.activeTextEditor
  if (activeFile === undefined) return

  openTestOrImplementation(activeFile.document.uri.fsPath)
}
