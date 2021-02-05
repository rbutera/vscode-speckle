import * as CreateCommand from './create.command'
import * as vscode from 'vscode'
jest.mock('vscode')

import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { openFile } from '../utils/open-file'
import { createTestFilePath } from '../utils/create-test-file-path'
import { createFile } from '../utils/create-file'
jest.mock('../utils/get-source-file-path')
jest.mock('../utils/get-test-file-path')
jest.mock('../utils/is-test-file')
jest.mock('../utils/open-file')
jest.mock('../utils/create-test-file-path')
jest.mock('../utils/create-file')

describe('commands: open', () => {
  beforeEach(() => {
    ;(getSourceFilePath as any).mockReturnValue('source-file-path')
    ;(getTestFilePath as any).mockReturnValue('test-file-path')
    ;(isTestFile as any).mockReturnValue(false)
    ;(openFile as any).mockReturnValue('opened')
    ;(createTestFilePath as any).mockReturnValue('path-to-create')
    ;(createFile as any).mockReturnValue('created')
  })

  describe('createTestFor', () => {
    const file = '/foo/bar/baz.ts'
    it('is defined', () => {
      expect(CreateCommand.createTestFor).toBeDefined()
    })

    it('calls createFile and openFile', async () => {
      await expect(CreateCommand.createTestFor(file)).resolves.toEqual('opened')
      expect(createFile).toHaveBeenCalledWith('path-to-create')
      expect(openFile).toHaveBeenCalledWith('test-file-path')
    })
  })

  describe('createCommand', () => {
    const file = '/foo/bar'
    const testFile = `${file}.spec.ts`
    const implementationFile = `${file}.ts`
    const activeFile = {
      document: {
        uri: {
          fsPath: implementationFile,
        },
      },
    }
    beforeEach(() => {
      ;(vscode.window as any).activeTextEditor = activeFile
    })

    it('is defined', () => {
      expect(CreateCommand.createCommand).toBeDefined()
    })

    it('returns false if there is no active text editor', async () => {
      vscode.window.activeTextEditor = undefined
      await expect(CreateCommand.createCommand()).resolves.toBeFalsy()
    })

    it('does nothing if in a test file', async () => {
      ;(isTestFile as any).mockReturnValue(true)
      const active = { document: { uri: { fsPath: testFile } } }
      ;(vscode.window as any).activeTextEditor = active
      await expect(CreateCommand.createCommand()).resolves.toEqual(false)
    })

    it('calls createTestFor if in an implementation file', async () => {
      ;(isTestFile as any).mockReturnValue(false)
      await expect(CreateCommand.createCommand()).resolves.toEqual('opened')
      expect(createFile).toHaveBeenCalledWith('path-to-create')
      expect(openFile).toHaveBeenCalledWith('test-file-path')
    })
  })
})
