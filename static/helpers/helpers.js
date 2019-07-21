'use strict';

String.prototype.contains = function (str) { return this.indexOf(str) != -1; };

function showSuccessNote(msg) {
    const fileSaved = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5 * 1000
    });

    fileSaved.fire({
        type: 'success',
        title: msg
    })
}
function showFailedNote(msg) {
    const fileSaved = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5 * 1000
    });

    fileSaved.fire({
        type: 'error',
        title: msg
    })
}


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