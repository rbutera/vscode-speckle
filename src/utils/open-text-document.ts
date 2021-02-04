import targetFile from './target-file'
import * as vscode from 'vscode'
import { OpenOption } from '../types/open-option.type'

export async function openTextDocument({
  possiblePaths,
  fileName,
}: OpenOption): Promise<vscode.TextDocument> {
  const target = targetFile({ possiblePaths, fileName })
  return vscode.workspace.openTextDocument(target)
}
