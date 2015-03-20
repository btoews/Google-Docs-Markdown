var showdownConverter;

// A hook to add the menu item when a document is opened.
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Render document', 'showMarkdown')
      .addToUi();
}

// A hook to add the menu item when this addon is installed.
function onInstall(e) {
  onOpen(e);
}

// Render document text as markdown and show in a modal dialog.
function showMarkdown() {
  var markdown, html, output;
  
  try {
    markdown = getDocumentText();
    html = getConverter().makeHtml(markdown);
    output = HtmlService.createHtmlOutput(html)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setWidth(700)
      .setHeight(500);
    DocumentApp.getUi().showModalDialog(output, 'Rendered Markdown');
  } catch(e) {
    DocumentApp.getUi().alert('There was an error rendering this document as markdown.');
  }
}

// Get the body of the active document as plain text.
function getDocumentText() {
  return DocumentApp.getActiveDocument().getBody().getText();
}

// Get markdown converter.
function getConverter() {
  if (!showdownConverter) {
    showdownConverter = new Showdown.converter();
  }
  return showdownConverter;
}
