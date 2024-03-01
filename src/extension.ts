import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "miro" is now active!');

  let disposable = vscode.commands.registerCommand("miro.start", async () => {
    let input =
      (await vscode.window.showInputBox({ prompt: "Enter board URL" })) ||
      "Invalid URL";

    if (!input.includes("https://miro.com/app/board/")) {
      vscode.window.showErrorMessage("Invalid URL");
      return;
    }

    let boardUrl = input.replace("board", "live-embed");

    const panel = vscode.window.createWebviewPanel(
      "miroBoard",
      "Miro Board",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );
    panel.webview.html = getMiroBoard(boardUrl);
  });

  context.subscriptions.push(disposable);
}

function getMiroBoard(boardUrl: string) {
  return `<div style="position:absolute; left: 0; right: 0; bottom: 0; top: 0px">
						<iframe width="100%" height="100%" src="${boardUrl}?embedAutoplay=true" frameBorder="0" scrolling="no" allowFullScreen></iframe>
					</div>`;
}
export function deactivate() {}
