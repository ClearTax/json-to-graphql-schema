import * as vscode from "vscode";
import { jsonToSchema } from "@walmartlabs/json-to-simple-graphql-schema/lib";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('jsontographqlschema.convertToSchema', () => {
    // Get the current file data
    const data =
      vscode.window.activeTextEditor &&
      vscode.window.activeTextEditor.document.getText();
    // convert data into graphql schema
    const schema = jsonToSchema({ jsonInput: data });
    // if any error occoured show error
    if (schema.error) {
      vscode.window.showErrorMessage(schema.error.message);
    }
    if (schema.value) {
      const content: vscode.TextDocument = schema.value;
      vscode.window.showTextDocument(content).then((t: vscode.TextEditor) => {
        const { selection } = t;
        t.edit(editBuilder => {
          editBuilder.replace(selection, content.toString());
        });
      });
    }
  });
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
