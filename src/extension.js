// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const note = require("./noteStyle");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let window = vscode.window;
let workspace = vscode.workspace;
let env = vscode.env;
let document = window.activeTextEditor.document;
let editor = window.activeTextEditor;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "fileHeader" is now active!');

	let fileHeader = vscode.commands.registerCommand('extension.fileHeader', function () {
		let workspaceEdit = new vscode.WorkspaceEdit();

		let line = editor.selection.active.line;

		
		workspaceEdit.insert(document.uri,new vscode.Position(line,0),"test");
		workspace.applyEdit(workspaceEdit);

		// Display a message box to the user
		vscode.window.showInformationMessage('file');
	});

	let funHeader = vscode.commands.registerCommand("extension.funHeader", function() {

		vscode.window.showInformationMessage('fun');
	});

	let authorHeader = vscode.commands.registerCommand("extension.authorHeader", function() {

		vscode.window.showInformationMessage('author');
	});

	context.subscriptions.push(fileHeader);
	context.subscriptions.push(funHeader);
	context.subscriptions.push(authorHeader);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
