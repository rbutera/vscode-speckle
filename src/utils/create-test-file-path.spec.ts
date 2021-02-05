import { createTestFilePath } from './create-test-file-path'
import * as vscode from 'vscode'

jest.mock('vscode')

describe('createTestFilePath', () => {
  beforeEach(() => {
    vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
      useTestsDirectoryForCreation: false,
      testExtensionPrefix: 'spec',
      automaticallyCreateTestFile: false,
    })
  })

  it('takes a file path as input and returns a suitable test path when values are default', () => {
    const file = '/foo/bar/baz.ts'
    const expected = '/foo/bar/baz.spec.ts'
    expect(createTestFilePath(file)).toEqual(expected)
  })

  it('uses tests folder if the project has useTestsDirectoryForCreation enabled', () => {
    vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
      useTestsDirectoryForCreation: true,
    })

    const file = '/foo/bar/baz.ts'
    const expected = '/foo/bar/__tests__/baz.ts'

    expect(createTestFilePath(file)).toEqual(expected)
  })

  it('returns the current path if the path is a test file', () => {
    expect(createTestFilePath('/foo/bar/baz.spec.ts')).toEqual(
      '/foo/bar/baz.spec.ts'
    )
    expect(createTestFilePath('/foo/bar/__tests__/baz.ts')).toEqual(
      '/foo/bar/__tests__/baz.ts'
    )
  })
})
