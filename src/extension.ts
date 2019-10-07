// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { jsonToSchema } from "@walmartlabs/json-to-simple-graphql-schema/lib";
var path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jsontographqlschema" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.convertToSchema', () => {
		// The code you place here will be executed every time your command is executed

		// TODO: execute this command using some shortcut key
		// Get the current file data
		const data = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.getText();
		// convert data into graphql schema
		var schema = jsonToSchema({jsonInput: data});
		// if any error occoured show error
		if (schema.error) {
			vscode.window.showErrorMessage(schema.error.message);			
		}
		if(schema.value) {
			const content: vscode.TextDocument = schema.value;
			vscode.window.showTextDocument(content).then((t: vscode.TextEditor) => {
				let selection = t.selection;
				t.edit(editBuilder => {
					editBuilder.replace(selection, content.toString());
				});
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}