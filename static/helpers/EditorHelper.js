'use strict';

module.exports = class EditorHelper {

    static cleanEditor() {
        quill.setContents([]);
        quill.format('direction', 'rtl');
        quill.format('align', 'right');

    }

    static setEditorContent(htmlString) {
        htmlString = htmlString.replace('ats-editor-file', '');
        quill.clipboard.dangerouslyPasteHTML(0, htmlString);
    }

    static getEditorContent() {
        return 'ats-editor-file' + quill.container.firstChild.innerHTML;
    }

    static customGetText() {

        return quill.getContents().filter(function (op) {
            return typeof op.insert === 'string' || op.insert.image;
        }).map(function (op) {
            if (op.insert.image) {
                return op.insert.image = 'i';
            }
            return op.insert;
        }).join('');
    }

}
