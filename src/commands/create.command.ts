import * as vscode from 'vscode'

const openTestOrImplementation = (input) => {
  return input
}

export const createCommand = () => {
  const activeFile = vscode.window.activeTextEditor
  if (activeFile === undefined) return

  openTestOrImplementation(activeFile.document.uri.fsPath)
}
