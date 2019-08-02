module.exports = class Inserter {

    constructor(text, textType, index = 0) {

        switch (textType) {
            case 'ayah':
                text = `﴿ ${text} ﴾`;
                break;
            case 'hadith':
                // text = `﴿ ${text} ﴾`;
                break;
            case 'poetry':
                // text = `﴿ ${text} ﴾`;
                break;

        }

        quill.insertText(index, text, 'Ayah', true);
    }

};