'use strict';

class EditorHelper {
    static isPoetryInserted = false;
    static isFormatCopied = false;
    static isAutoCompleteMenuShown = false;
    static copiedFormat = null;
    static zoomTypes = [50, 75, 100, 125, 150, 200];
    static currentFocus = -1;

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
        return quill.container.firstChild.innerHTML;
    }

    static customGetText() {
        return quill.getContents().filter(function (op) {
            return typeof op.insert === 'string' || op.insert.image || op.insert.video;
        }).map(function (op) {
            if (op.insert.image) {
                return op.insert.image = '҄';
            } else if (op.insert.video)
                return op.insert.video = '҄';
            return op.insert;
        }).join('');
    }

    static format(blot, words) {
        for (const word of words.trim().split(' ')) {
            if (word.length < 5) continue;
            let indices = quill.getText().getIndicesOf(word);
            for (let i = 0; i < indices.length; i++) {
                setTimeout(() => {
                    let currentCaretPos = quill.getSelection(true);
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

    static setRangeIn(element) {
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(element, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    static isTextSelected() {
        return !window.getSelection().isCollapsed;
    }

    static isLastCharsEquals(oldDelta, numberOfChar, string) {
        return oldDelta.ops[0].insert.slice(-numberOfChar) === string;
    }

    static isRTL(currentFormat) {
        return currentFormat.align === 'right' && currentFormat.direction === 'rtl';
    }

    static isLTR(currentFormat) {
        return !(currentFormat.align === 'right' && currentFormat.direction === 'rtl');
    }

    static getInsertedText(delta) {
        // if delta is undefined, return empty array.
        return delta ? delta.ops.filter(op => {
            if (op.insert)
                if (typeof op.insert === 'string') return op.insert;
        }) : [];
    }

    static setToRTL() {
        quill.format('direction', 'rtl');
        quill.format('align', 'right');

    }

    static setToLTR() {
        quill.format('direction', false);
        quill.format('align', false);

    }

    static scrollToCaret() {
        const currRangeContainer = window.getSelection().getRangeAt(0).endContainer;
        let containerPos;
        if (currRangeContainer.nodeName === 'P')
            containerPos = currRangeContainer.getBoundingClientRect().top;
        else
            containerPos = currRangeContainer.parentElement.getBoundingClientRect().top;

        // if caret in the bottom/top of the window, scroll
        if (containerPos < 200 || containerPos > 800)
            textBox.scrollTop = currRangeContainer.offsetTop - textBox.offsetTop - 300;
    }

    static isCaretInTable() {
        let caretContainer = window.getSelection().getRangeAt(0).endContainer;

        if (!caretContainer.dataset) return false;
        else return caretContainer.dataset.row;
    };

    static insertEmptyLineIn(index = quill.getSelection()) {
        quill.insertText(index, '\n');
    }
}
