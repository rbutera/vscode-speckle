import * as vscode from "vscode";
import { ifElse, compose } from "ramda";
import { getSourceFilePath } from "./getSourceFilePath";
import { getTestFilePath } from "./getTestFilePath";
import { isTestFile } from "./isTestFile";
import { switchToFile, openFile } from "./utils";

const switchToSourceOf = compose(switchToFile, getSourceFilePath);
const switchToTestOf = compose(switchToFile, getTestFilePath);
const switchBetweenSourceAndTest = ifElse(
  isTestFile,
  switchToSourceOf,
  switchToTestOf
);

const openSourceOf = compose(openFile, getSourceFilePath);
const openTestOf = compose(openFile, getTestFilePath);
const openTestOrImplementation = ifElse(isTestFile, openSourceOf, openTestOf);

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let switchSubscription = vscode.commands.registerCommand(
    "speckle.switch",
    () => {
      const activeFile = vscode.window.activeTextEditor;
      if (activeFile === undefined) return;

      switchBetweenSourceAndTest(activeFile.document.uri.fsPath);
    }
  );

  let openSubscription = vscode.commands.registerCommand("speckle.open", () => {
    const activeFile = vscode.window.activeTextEditor;
    if (activeFile === undefined) return;

    openTestOrImplementation(activeFile.document.uri.fsPath);
  });
  context.subscriptions.push(switchSubscription);
  context.subscriptions.push(openSubscription);
}

// this method is called when your extension is deactivated
export function deactivate() {}
