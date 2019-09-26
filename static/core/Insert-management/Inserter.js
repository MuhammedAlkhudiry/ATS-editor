class Inserter {

    constructor(text, textType, textDetails) {
        this.text = text;
        this.textDetails = textDetails;
        switch (textType) {
            case 'ayah':
                this.insertAyah();
                break;
            case 'hadith':
                this.insertHadith();
                break;
            case 'poetry':
                this.insertPoetry();
                break;
            case 'date':
                this.insertDate();
                break;
        }
    }

    insertAyah() {
        quill.insertText(quill.getSelection(true), `﴿ ${this.text} ﴾`, 'Ayah', this.textDetails);
    }

    insertHadith() {
        quill.insertText(quill.getSelection(true), `(${this.text})`, 'Hadith', this.textDetails);

    }

    insertPoetry() {
        quill.insertText(quill.getSelection(true), `${this.text}`, 'Poetry', true);
    }

    insertDate() {
        quill.insertText(quill.getSelection(true), `${this.text}`);

    }
}