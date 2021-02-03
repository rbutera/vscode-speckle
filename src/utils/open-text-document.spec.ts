import openTextDocument from './open-text-document'
import targetFile from './target-file'
import * as vscode from 'vscode'
jest.mock('vscode')
jest.mock('./target-file', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('target'),
}))

describe('openTextDocument', () => {
  it('opens a text document by targeting any existing file from a list of files', async () => {
    const input = {
      possiblePaths: ['foo/bar', 'bar/foo'],
      fileName: 'bar',
    }

    vscode.workspace.openTextDocument = jest.fn().mockResolvedValue('foobar')
    const result = await openTextDocument(input)
    expect(result).toEqual('foobar')
    expect(targetFile).toHaveBeenCalledWith(input)
    expect(vscode.workspace.openTextDocument).toHaveBeenCalledWith('target')
  })
})
