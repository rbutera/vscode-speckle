import { switchToFile } from './switch-to-file'
import { openTextDocument } from './open-text-document'
import * as vscode from 'vscode'
jest.mock('vscode')
jest.mock('./open-text-document', () => ({
  openTextDocument: jest.fn().mockReturnValue('document'),
}))

describe('switchToFile', () => {
  it('calls showTextDocument on a newly opened document', async () => {
    vscode.window.showTextDocument = jest.fn().mockResolvedValue('shown')
    const input = {
      possiblePaths: ['foo'],
      fileName: 'bar',
    }
    await expect(switchToFile(input)).resolves.toEqual('shown')
    expect(openTextDocument).toHaveBeenCalledWith(input)
    expect(vscode.window.showTextDocument).toHaveBeenCalledWith('document')
  })
})
