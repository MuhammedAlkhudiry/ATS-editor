class Searcher {

    static occurrencesIndices = [];
    static currentIndex = 0;
    static length = 0;
    // used for ignore tashkeel
    static totalLength = [];
    static SearchedString = '';

    constructor(quill) {
        this.quill = quill;
        this.container = document.getElementById('search-container');

        document
            .getElementById('search-input')
            .addEventListener('input', this.search.bind(this));
        document
            .getElementById('replace')
            .addEventListener('click', this.replace.bind(this));
        document
            .getElementById('replace-all')
            .addEventListener('click', this.replaceAll.bind(this));
    }


    // مُحمد
    // مُحًمد
    search() {
        //  remove any previous search
        if (!Searcher.occurrencesIndices.isEmpty()) Searcher.removeStyle();

        let isTashkeelIgnore = document.getElementById('ignore-taskeel').checked;
        Searcher.SearchedString = searchInput.value;

        if (!Searcher.SearchedString) return;

        if (Searcher.isSearchedStringFound()) {
            setTimeout(() => {
                let totalText = quill.getText();
                if (isTashkeelIgnore) this.SearchIgnoreTashkeel(totalText);
                else this.SearchTashkeel(totalText);
            }, 0);
        }
        else {
            Searcher.occurrencesIndices = [];
            Searcher.currentIndex = 0;
        }
    }


    SearchIgnoreTashkeel(totalText) {

        let indices = [];
        let totalLength = [];

        for (let i = 0; i < totalText.length; i++) {

            let tempLen = Searcher.SearchedString.length;
            let isMatched = true;

            let currentCharSS = 0;
            if (totalText[i] === Searcher.SearchedString[currentCharSS]) {
                currentCharSS++;

                for (let j = i + 1, k = 0; k < Searcher.SearchedString.length; j++ , k++) {
                    if (ArabicHelper.isHarakah(totalText[j])) {
                        tempLen++;

                        // if current word is not matched with searched string.
                    }
                    else if (totalText[j] !== Searcher.SearchedString[currentCharSS]) {
                        currentCharSS++;
                        isMatched = false;
                        break;
                    }
                    else {
                        currentCharSS++;
                    }
                    // if end of text
                    if (!totalText[j]) {
                        isMatched = false;
                        break;
                    }
                    // if word without tashkeel matched
                    if (!Searcher.SearchedString[currentCharSS]) break;
                }
                // if word is matched after parsing it, add it
                if (isMatched) {
                    totalLength[indices.length] = tempLen;
                    indices.push(i);
                }
            }

        }

        Searcher.occurrencesIndices = indices;
        Searcher.totalLength = totalLength;
        Searcher.addStyle();
    }

    SearchTashkeel(totalText) {
        Searcher.occurrencesIndices = totalText.getIndicesOf(Searcher.SearchedString);
        Searcher.length = Searcher.SearchedString.length;
        Searcher.addStyle();
    }

    replace() {
        if (!Searcher.SearchedString) return;

        // if no occurrences, then search first.
        if (!Searcher.occurrencesIndices) this.search();
        if (!Searcher.occurrencesIndices) return;

        let indices = Searcher.occurrencesIndices;
        let newString = replaceInput.value;

        if (Searcher.totalLength.isEmpty()) {
            quill.deleteText(indices[Searcher.currentIndex], Searcher.length);
            quill.insertText(indices[Searcher.currentIndex], newString);
            quill.formatText(indices[Searcher.currentIndex], newString.length, 'SearchedString', false);
        }
        else {
            quill.deleteText(indices[Searcher.currentIndex], Searcher.totalLength[Searcher.currentIndex]);
            quill.insertText(indices[Searcher.currentIndex], newString);
            quill.formatText(indices[Searcher.currentIndex], newString.length, 'SearchedString', false);

        }
        // update the occurrencesIndices.
        this.search();
    }

    replaceAll() {
        if (!Searcher.SearchedString) return;
        let newString = replaceInput.value;

        // if no occurrences, then search first.
        if (!Searcher.occurrencesIndices) this.search();
        if (!Searcher.occurrencesIndices) return;

        if (Searcher.totalLength.isEmpty()) {
            while (Searcher.occurrencesIndices) {
                setTimeout(() => {
                    quill.deleteText(Searcher.occurrencesIndices[0], Searcher.length);
                    quill.insertText(Searcher.occurrencesIndices[0], newString);

                    // update the occurrencesIndices.
                    this.search();
                }, 0);
            }
            while (Searcher.occurrencesIndices) {
                setTimeout(() => {
                    quill.deleteText(Searcher.occurrencesIndices[0], Searcher.totalLength[Searcher.currentIndex]);
                    quill.insertText(Searcher.occurrencesIndices[0], newString);

                    // update the occurrencesIndices.
                    this.search();
                }, 0);

            }
        }

        Searcher.removeStyle();
    }

    static addStyle() {
        if (Searcher.totalLength.isEmpty()) {
            for (let i = 0; i < Searcher.occurrencesIndices.length; i++) {
                setTimeout(() => {
                    quill.formatText(Searcher.occurrencesIndices[i], Searcher.length, 'SearchedString', true);
                }, 0);
            }
        }
        else {
            for (let i = 0; i < Searcher.occurrencesIndices.length; i++) {
                setTimeout(() => {
                    quill.formatText(Searcher.occurrencesIndices[i], Searcher.totalLength[i], 'SearchedString', true);
                }, 0);
            }
        }
    }

    static removeStyle() {

        if (Searcher.totalLength.isEmpty()) {
            for (let i = 0; i < Searcher.occurrencesIndices.length; i++) {
                setTimeout(() => {
                    quill.formatText(Searcher.occurrencesIndices[i], Searcher.length, 'SearchedString', false);
                }, 0);
            }
        }
        else {
            for (let i = 0; i < Searcher.occurrencesIndices.length; i++) {
                setTimeout(() => {
                    quill.formatText(Searcher.occurrencesIndices[i], Searcher.totalLength[i], 'SearchedString', false);
                }, 0);
            }
        }
    }

    static isSearchedStringFound() {
        return new RegExp(Searcher.SearchedString, 'gi').test(ArabicHelper.removeTashkeel(quill.getText()));
    }

}
