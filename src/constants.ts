import * as vscode from 'vscode'
import { uniq } from 'ramda'

const configuration = vscode.workspace.getConfiguration('speckle')

const { testExtensionPrefix } = configuration

export const TEST_FOLDER_NAME = '__tests__'
export const TEST_FILE_SUFFIX = testExtensionPrefix ?? 'test'
export const TEST_FILE_SUFFIXES = uniq(['test', 'spec', testExtensionPrefix])
