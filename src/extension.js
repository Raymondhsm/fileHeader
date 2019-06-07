// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const note = require("./noteStyle");
const fs = require('fs');

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
		// 文件创建时间
		let time = new Date().toLocaleString()
		try{
			// 获取当前激活文件的路径
			const filepath =editor.document.fileName;
			time = new Date(fs.statSync(filepath).birthtime).toLocaleString()
			
			console.log(time)
		}catch(err){
			console.log(err.message)
		}

		let workspaceEdit = new vscode.WorkspaceEdit();
		workspaceEdit.insert(document.uri,new vscode.Position(0,0),note.noteData(time));
		workspace.applyEdit(workspaceEdit);

		// Display a message box to the user
		vscode.window.showInformationMessage('file');
	});

	let funHeader = vscode.commands.registerCommand("extension.funHeader", function() {
		let workspaceEdit = new vscode.WorkspaceEdit();

		let line = editor.selection.active.line;

		
		workspaceEdit.insert(document.uri,new vscode.Position(line,0),note.noteData());
		workspace.applyEdit(workspaceEdit);


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
