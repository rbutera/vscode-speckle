import * as vscode from 'vscode'

import { openCommand } from './commands/open.command'
import { switchCommand } from './commands/switch.command'
import { createCommand } from './commands/create.command'

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const switchSubscription = vscode.commands.registerCommand(
    'speckle.switch',
    switchCommand
  )

  const openSubscription = vscode.commands.registerCommand(
    'speckle.open',
    openCommand
  )

  const createSubscription = vscode.commands.registerCommand(
    'speckle.create',
    createCommand
  )
  // eslint-disable-next-line functional/immutable-data
  context.subscriptions.push(
    switchSubscription,
    openSubscription,
    createSubscription
  )
}
