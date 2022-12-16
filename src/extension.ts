// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const { exec } = require("child_process");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "swiftprojectsetup" is now active!');

	let initSwiftPackage = vscode.commands.registerCommand('swiftprojectsetup.initSwiftPackage', async (uri:vscode.Uri) => {
		if(vscode.workspace.workspaceFolders !== undefined) {
			let path = uri.fsPath;
			let pathParts = path.split("/");
			let pathEscaped = pathParts.join("'/'");
			pathEscaped += "'";
			// remove first char from pathEscaped
			path = pathEscaped.substring(1);

			// get currently focused folder in explorer
			// const activeFolder = uri.fsPath;

			// vscode.window.showInformationMessage(`${pathEscaped}`);

			const name = await vscode.window.showInputBox({
				placeHolder: "Name"
			});
;			
			// eslint-disable-next-line eqeqeq
			if (name === "" || name == null) {
				return;
			}

			await exec(`cd ${path} && swift package init --type executable --name ${name}`);

		} 
		else {
			let message = "YOUR-EXTENSION: Working folder not found, open a folder an try again" ;
		
			vscode.window.showErrorMessage(message);
		}
	});


	context.subscriptions.push(initSwiftPackage);
}

// This method is called when your extension is deactivated
export function deactivate() {}
