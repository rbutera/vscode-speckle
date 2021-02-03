import * as vscode from 'vscode'
import { compose, ifElse } from 'ramda'
import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { switchToFile } from '../utils/switch-to-file'

const switchToSourceOf = compose(switchToFile, getSourceFilePath)
const switchToTestOf = compose(switchToFile, getTestFilePath)
const switchBetweenSourceAndTest = ifElse(
  isTestFile,
  switchToSourceOf,
  switchToTestOf
)

export const switchCommand = () => {
  const activeFile = vscode.window.activeTextEditor
  if (activeFile === undefined) return

  switchBetweenSourceAndTest(activeFile.document.uri.fsPath)
}
