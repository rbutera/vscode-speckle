import * as SwitchCommand from './switch.command'
import * as vscode from 'vscode'
jest.mock('vscode')

import { getSourceFilePath } from '../utils/get-source-file-path'
import { getTestFilePath } from '../utils/get-test-file-path'
import { isTestFile } from '../utils/is-test-file'
import { switchToFile } from '../utils/switch-to-file'
import { createTestFilePath } from '../utils/create-test-file-path'
import { createFile } from '../utils/create-file'
jest.mock('../utils/get-source-file-path')
jest.mock('../utils/get-test-file-path')
jest.mock('../utils/is-test-file')
jest.mock('../utils/switch-to-file')
jest.mock('../utils/create-test-file-path')
jest.mock('../utils/create-file')

describe('commands: switch', () => {
  beforeEach(() => {
    ;(getSourceFilePath as any).mockReturnValue('source-file-path')
    ;(getTestFilePath as any).mockReturnValue('test-file-path')
    ;(isTestFile as any).mockReturnValue(false)
    ;(switchToFile as any).mockReturnValue('opened')
    ;(createTestFilePath as any).mockReturnValue('path-to-create')
    ;(createFile as any).mockReturnValue('created')
  })

  describe('switchToTestOf', () => {
    const file = '/foo/bar/baz.ts'

    beforeEach(() => {
      vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
        automaticallyCreateTestFile: false,
      })
    })

    it('is defined', () => {
      expect(SwitchCommand.switchToTestOf).toBeDefined()
    })

    it('attempts to switch the file using switchToFile, and returns the result if successful', async () => {
      await expect(SwitchCommand.switchToTestOf(file)).resolves.toEqual(
        'opened'
      )
    })

    describe('when opening fails', () => {
      beforeEach(() => {
        ;(switchToFile as any).mockImplementationOnce(() => {
          throw new Error('404')
        })
      })

      it('calls createFile if automaticallyCreateTestFile is set and opening fails', async () => {
        vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
          automaticallyCreateTestFile: true,
        })
        await expect(SwitchCommand.switchToTestOf(file)).resolves.toEqual(
          'opened'
        )
      })

      it('does nothing if automaticallyCreateTestFile is set', async () => {
        await expect(
          SwitchCommand.switchToTestOf(file)
        ).resolves.toBeUndefined()
      })
    })
  })

  describe('switchCommand', () => {
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
      expect(SwitchCommand.switchCommand).toBeDefined()
    })

    it('returns false if there is no active text editor', async () => {
      vscode.window.activeTextEditor = undefined
      await expect(SwitchCommand.switchCommand()).resolves.toBeFalsy()
    })

    it('opens implementation if active editor and in a test file', async () => {
      ;(isTestFile as any).mockReturnValue(true)
      const active = { document: { uri: { fsPath: testFile } } }
      ;(vscode.window as any).activeTextEditor = active

      await expect(SwitchCommand.switchCommand()).resolves.toEqual('opened')
      expect(switchToFile).toHaveBeenCalledWith('source-file-path')
    })

    it('calls switchToTestOf if in implementation file', async () => {
      ;(isTestFile as any).mockReturnValue(false)
      await expect(SwitchCommand.switchCommand()).resolves.toEqual('opened')
      expect(switchToFile).toHaveBeenCalledWith('test-file-path')
    })
  })
})
