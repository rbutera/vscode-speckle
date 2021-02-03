import * as vscode from 'vscode'
import * as fs from 'fs'
import { OpenOption } from '../types/open-option.type'

const getNewColumnNumber = (currentColumn?: number): number => {
  return currentColumn === 2 ? 1 : 2
}

export async function openFile({ possiblePaths, fileName }: OpenOption) {
  const target = possiblePaths.find(fs.existsSync)
  if (!target) {
    throw new Error(fileName)
  }
  const document = await vscode.workspace.openTextDocument(target)
  return vscode.window.showTextDocument(
    document,
    getNewColumnNumber(vscode.window?.activeTextEditor?.viewColumn)
  )
}
