import * as OpenFile from './open-file'
import openTextDocument from './open-text-document'
import * as vscode from 'vscode'
jest.mock('vscode')
jest.mock('./open-text-document', () => ({
  default: jest.fn().mockReturnValue('document'),
}))

describe('openFile', () => {
  it('calls showTextDocument on a newly opened document', async () => {
    vscode.window.showTextDocument = jest.fn().mockResolvedValue('shown')
    const input = {
      possiblePaths: ['foo'],
      fileName: 'bar',
    }
    ;(OpenFile as any).getNewColumnNumber = jest.fn().mockReturnValue(1337)
    const windowBackup = vscode.window
    // @ts-expect-error incomplete type just for testing
    vscode.window.activeTextEditor = {
      viewColumn: 99,
    }
    await expect(OpenFile.openFile(input)).resolves.toEqual('shown')
    expect(openTextDocument).toHaveBeenCalledWith(input)
    expect(vscode.window.showTextDocument).toHaveBeenCalledWith(
      'document',
      1337
    )
    expect(OpenFile.getNewColumnNumber).toHaveBeenCalledWith(
      vscode.window.activeTextEditor.viewColumn
    )

    // @ts-expect-error incomplete type just for testing
    vscode.window = windowBackup
  })
})
