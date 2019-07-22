'use strict';


function cleanFile() {
    quill.setContents([]);
    quill.format('direction', 'rtl');
    quill.format('align', 'right');

}

function setEditorContent(htmlString) {
    htmlString = htmlString.replace('ats-editor-file', '');
    quill.clipboard.dangerouslyPasteHTML(0, htmlString);
}

function getEditorContent() {
    let content = 'ats-editor-file' + quill.container.firstChild.innerHTML
    return content;
}


function isOpenedFileValid(fileContent) {
    return fileContent.contains('ats-editor-file');
}

function setSavingStatus(msg, cssClass) {
    let savingStatusText = document.getElementById('saving-status-text');
    savingStatusText.innerText = msg;
    savingStatusText.className = cssClass;

}