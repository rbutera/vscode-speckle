// eslint-disable-next-line unicorn/import-style
import * as path from 'path'
// eslint-disable-next-line unicorn/import-style
import * as fs from 'fs'
import * as vscode from 'vscode'
import { createFile, CreateFileOptions } from './create-file'
import { openTextDocument } from './open-text-document'

export async function createAndOpenFile(
  fullFileName: string,
  options?: CreateFileOptions
): Promise<vscode.TextDocument> {
  if (fs.existsSync(fullFileName)) {
    return openTextDocument({
      possiblePaths: [fullFileName],
      fileName: path.basename(fullFileName),
    })
  }
  const created = await createFile(fullFileName, options)
  return openTextDocument({
    possiblePaths: [created],
    fileName: path.basename(fullFileName),
  })
}
