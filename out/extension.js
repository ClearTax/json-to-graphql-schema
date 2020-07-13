const vscode = require("vscode");
const schemaConvertor = require("@walmartlabs/json-to-simple-graphql-schema/lib");

Object.defineProperty(exports, "__esModule", { value: true });

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "extension.convertToSchema",
    () => {
      // Get the current file data
      const data =
        vscode.window.activeTextEditor &&
        vscode.window.activeTextEditor.document.getText();
      // convert data into graphql schema
      const schema = schemaConvertor.jsonToSchema({ jsonInput: data });
      // if any error occoured show error
      if (schema.error) {
        vscode.window.showErrorMessage(schema.error.message);
      }
      if (schema.value) {
        const content = schema.value;
        vscode.window.showTextDocument(content).then(t => {
          const { selection } = t;
          t.edit(editBuilder => {
            editBuilder.replace(selection, content.toString());
          });
        });
      }
    }
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
// # sourceMappingURL=extension.js.map
