 class TypingHelper {
    static currentCaretPosition = null;

    static getCaretPosition() {
        return quill.getSelection(true);
    }

    static setCaretPosition(index) {
        quill.setSelection(index);
    }

    static isWhitespace(char) {
        return (char === ' ') || (char === '\t') || (char === '\n');
    }

}