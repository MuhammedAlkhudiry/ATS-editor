'use strict';

class EditorHelper {

    static isFormatCopied = false;
    static copiedFormat = null;
    static tableSelectedCells = null;
    static currentZoom = 3;
    static zoomTypes = [50, 75, 100, 125, 150, 200];


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

    static format(blot, words) {
        for (const word of words.trim().split(' ')) {
            if (word.length < 5) continue;
            let indices = quill.getText().getIndicesOf(word);
            for (let i = 0; i < indices.length; i++) {
                setTimeout(() => {
                    let currentCaretPos = TypingHelper.getCaretPosition();
                    quill.formatText(indices[i], word.length, 'Misspell', true);
                    TypingHelper.setCaretPosition(currentCaretPos);
                }, 0);

            }
        }
    }

    static getCurrentWord() {
        let sel, word = '';
        if (window.getSelection && (sel = window.getSelection()).modify) {
            const selectedRange = sel.getRangeAt(0);
            sel.collapseToStart();
            sel.modify('move', 'backward', 'word');
            sel.modify('extend', 'forward', 'word');

            word = sel.toString();

            // Restore selection
            sel.removeAllRanges();
            sel.addRange(selectedRange);
        } else if ((sel = document.selection) && sel.type !== 'Control') {
            const range = sel.createRange();
            range.collapse(true);
            range.expand('word');
            word = range.text;
        }
        return word;
    }
}
