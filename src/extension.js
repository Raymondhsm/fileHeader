// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const note = require("./noteStyle");
const fs = require('fs');
const logic = require("./logic");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let window = vscode.window;
	let workspace = vscode.workspace;
	let env = vscode.env;
	let document = window.activeTextEditor.document;
	let editor = window.activeTextEditor;
	const config = vscode.workspace.getConfiguration('fileheader');

	console.log('Congratulations, your extension "fileHeader" is now active!');

	let fileHeader = vscode.commands.registerCommand('extension.fileHeader', function () {
		
		// 文件创建时间
		let time = new Date().toLocaleString()
		try{
			// 获取当前激活文件的路径
			const filepath =editor.document.fileName;
			time = new Date(fs.statSync(filepath).birthtime).toLocaleString()
			
		}catch(err){
			console.log(err.message)
		}

		//判断文件是否有Header，设置author和description
		let check = logic.checkFileHasHeader()

		let workspaceEdit = new vscode.WorkspaceEdit();
		if(check.hasHeader){
			let data = note.updateFileHeader(config)
			workspaceEdit.replace(document.uri,check.EditorRange,data.LastEditor)
			workspaceEdit.replace(document.uri,check.ModifyRange,data.ModifyTime)
		}
		else{
			let data = note.insertFileHeader(time,config)
			workspaceEdit.insert(document.uri,new vscode.Position(0,0),data);
		}
		workspace.applyEdit(workspaceEdit);

	});

	let funHeader = vscode.commands.registerCommand("extension.funHeader", function() {
		//获取行号
		let line = editor.selection.active.line;

		let workspaceEdit = new vscode.WorkspaceEdit();
		workspaceEdit.insert(document.uri,new vscode.Position(line,0),note.noteFunData(line));
		workspace.applyEdit(workspaceEdit);

	});

	let authorHeader = vscode.commands.registerCommand("extension.authorHeader", function() {
		//获取行号
		let line = editor.selection.active.line;

		// 文件创建时间
		let time = new Date().toLocaleString()
		try{
			// 获取当前激活文件的路径
			const filepath =editor.document.fileName;
			time = new Date(fs.statSync(filepath).birthtime).toLocaleString()
			
		}catch(err){
			console.log(err.message)
		}

		//判断文件是否有Header，设置author和description
		let check = logic.checkFunHasTail(line)

		let workspaceEdit = new vscode.WorkspaceEdit();
		if(check.hasTail){
			let data = note.updateAuthorNote(config)
			workspaceEdit.replace(document.uri,check.EditorRange,data.LastEditor)
			workspaceEdit.replace(document.uri,check.ModifyRange,data.ModifyTime)
		}
		else{
			let data = note.insertAuthorNote(time,config)
			workspaceEdit.insert(document.uri,new vscode.Position(line,0),data);
		}
		workspace.applyEdit(workspaceEdit);

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
