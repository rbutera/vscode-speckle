import * as vscode from 'vscode'
import { OpenOption } from '../types/open-option.type'
import { openTextDocument } from './open-text-document'
export async function switchToFile({
  possiblePaths,
  fileName,
}: OpenOption): Promise<vscode.TextEditor> {
  const document = await openTextDocument({ possiblePaths, fileName })
  return vscode.window.showTextDocument(document)
}
