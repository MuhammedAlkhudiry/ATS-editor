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
function isFileNameNotValid(fileName) {

    // TODO: check first char...
    return fileName.isEmpty();

}

function getFileName(path) {

    return path.split('\\').pop()
        .substr(0, path.split('\\')
            .pop().indexOf('.'));

}
