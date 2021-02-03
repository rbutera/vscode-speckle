import * as vscode from 'vscode'
import { ifElse, compose } from 'ramda'
import { getSourceFilePath } from './utils/get-source-file-path'
import { getTestFilePath } from './utils/get-test-file-path'
import { isTestFile } from './utils/is-test-file'
import { switchToFile } from './utils/switch-to-file'
import { openFile } from './utils/open-file'

const switchToSourceOf = compose(switchToFile, getSourceFilePath)
const switchToTestOf = compose(switchToFile, getTestFilePath)
const switchBetweenSourceAndTest = ifElse(
  isTestFile,
  switchToSourceOf,
  switchToTestOf
)

const openSourceOf = compose(openFile, getSourceFilePath)
const openTestOf = compose(openFile, getTestFilePath)
const openTestOrImplementation = ifElse(isTestFile, openSourceOf, openTestOf)

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const switchSubscription = vscode.commands.registerCommand(
    'speckle.switch',
    () => {
      const activeFile = vscode.window.activeTextEditor
      if (activeFile === undefined) return

      switchBetweenSourceAndTest(activeFile.document.uri.fsPath)
    }
  )

  const openSubscription = vscode.commands.registerCommand(
    'speckle.open',
    () => {
      const activeFile = vscode.window.activeTextEditor
      if (activeFile === undefined) return

      openTestOrImplementation(activeFile.document.uri.fsPath)
    }
  )
  // eslint-disable-next-line functional/immutable-data
  context.subscriptions.push(switchSubscription, openSubscription)
}
