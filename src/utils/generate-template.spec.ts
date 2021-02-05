import { generateJavascriptTemplate } from './generate-template'
import * as vscode from 'vscode'
jest.mock('vscode')

const generateExpected = (a: string, b: string, c: string) =>
  `import { ${b} } from '${c}${a}'\n\ndescribe('${b}', () => {\n\n})`

describe('generateJavascriptTemplate', () => {
  beforeEach(() => {
    vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
      useTestsDirectoryForCreation: false,
    })
  })

  it('returns a suitable spec file template for a colocated file', () => {
    expect(
      generateJavascriptTemplate({
        name: 'fooBar',
        implementation: 'foo-bar.service',
      })
    ).toEqual(generateExpected('foo-bar.service', 'fooBar', './'))
  })

  it('returns a suitable spec file template for a file in the tests directory', () => {
    vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
      useTestsDirectoryForCreation: true,
    })
    expect(
      generateJavascriptTemplate({
        name: 'fooBar',
        implementation: 'foo-bar.service',
      })
    ).toEqual(generateExpected('foo-bar.service', 'fooBar', '../'))
  })
})
