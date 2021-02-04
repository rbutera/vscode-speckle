import * as vscode from 'vscode'
import { OpenOption } from '../types/open-option.type'
import { openTextDocument } from './open-text-document'

export const getNewColumnNumber = (currentColumn?: number): number => {
  return currentColumn === 2 ? 1 : 2
}

export async function openFile(input: OpenOption) {
  const document = await openTextDocument(input)
  return vscode.window.showTextDocument(
    document,
    getNewColumnNumber(vscode.window?.activeTextEditor?.viewColumn)
  )
}
