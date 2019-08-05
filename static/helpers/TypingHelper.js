module.exports = class TypingHelper {

    static getCaretPosition() {
        return quill.getSelection(true);
    }

    static setCaretPosition() {

    }

    static isWhitespace(char) {
        return (char === ' ') || (char === '\t') || (char === '\n');
    }
};