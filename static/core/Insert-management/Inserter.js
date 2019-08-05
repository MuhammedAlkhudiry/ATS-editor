module.exports = class Inserter {

    constructor(text, textType, index = 0, data) {


        switch (textType) {
            case 'ayah':
                this.insertAyah(text);
                break;
            case 'hadith':
                this.insertHadith(text);
                break;
            case 'poetry':
                // text = `﴿ ${text} ﴾`;
                break;
        }


    }

    insertAyah(text) {
        quill.insertText(TypingHelper.getCaretPosition(), `﴿ ${text} ﴾`, 'Ayah', true);
    }

    insertHadith(text) {
        quill.insertText(TypingHelper.getCaretPosition(), `(${text})`, 'Hadith', true);

    }

    insertPoetry() {

    }

};