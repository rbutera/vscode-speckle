import * as vscode from 'vscode'
import { LanguageTestTemplateInput } from '../types/language-test-template-input.type'

/**
 *  generates a spec file template for a JS/TS file
 */

export function generateJavascriptTemplate(
  input: LanguageTestTemplateInput
): string {
  const { useTestsDirectoryForCreation } = vscode.workspace.getConfiguration(
    'speckle'
  )
  const directory = useTestsDirectoryForCreation ? '../' : './'
  return `import { ${input.name} } from '${directory}${input.implementation}'\n\ndescribe('${input.name}', () => {\n\n})`
}
