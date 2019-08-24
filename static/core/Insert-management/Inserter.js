class Inserter {

    constructor(text, textType) {

        switch (textType) {
            case 'ayah':
                Inserter.insertAyah(text);
                break;
            case 'hadith':
                Inserter.insertHadith(text);
                break;
            case 'poetry':
                Inserter.insertPoetry(text);
                break;
        }
    }

    static insertAyah(text) {
        quill.insertText(TypingHelper.getCaretPosition(), `﴿ ${text} ﴾`, 'Ayah', true);
    }

    static insertHadith(text) {
        quill.insertText(TypingHelper.getCaretPosition(), `(${text})`, 'Hadith', true);

    }

    static insertPoetry(text) {
        quill.insertText(TypingHelper.getCaretPosition(), `${text}`, 'Poetry', true);
    }
}