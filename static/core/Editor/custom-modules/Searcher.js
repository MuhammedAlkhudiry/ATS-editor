class Searcher {

    static occurrencesIndices = [];
    static currentIndex = 0;
    static SearchedStringLength = 0;
    static SearchedString = '';

    constructor(quill) {
        this.quill = quill;
        this.container = document.getElementById('search-container');

        document
            .getElementById('search')
            .addEventListener('click', this.search.bind(this));
        document
            .getElementById('replace')
            .addEventListener('click', this.replace.bind(this));
        document
            .getElementById('replace-all')
            .addEventListener('click', this.replaceAll.bind(this));
    }

    search() {
        //  remove any previous search
        Searcher.removeStyle();

        Searcher.SearchedString = searchInput.value;
        if (!Searcher.SearchedString) return;

        if (Searcher.isSearchedStringFound()) {

            let totalText = quill.getText();
            this.SearchWithoutTaskeel(totalText);
        }
        else {
            Searcher.occurrencesIndices = null;
            Searcher.currentIndex = 0;
        }
    }

    SearchWithTaskeel(totalText) {

        if (!new RegExp(SearchedString, 'gi').test(ArabicHelper.removeTashkeel(totalText))) return;

        let indices = [];
        let totalLength = [];

        for (let i = 0; i < totalText.length; i++) {

            let tempLen = SearchedString.length;
            let isMatched = true;

            let currentCharSS = 0;
            if (totalText[i] === SearchedString[currentCharSS]) {
                currentCharSS++;

                for (let j = i + 1, k = 0; k < SearchedString.length; j++ , k++) {
                    if (ArabicHelper.isHarakah(totalText[j])) {
                        tempLen++;

                        // if current word is not matched with searched string.
                    }
                    else if (totalText[j] !== SearchedString[currentCharSS]) {
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
                    if (!SearchedString[currentCharSS]) break;
                }
                // if word is matched after parsing it, add it
                if (isMatched) {
                    totalLength[indices.length] = tempLen;
                    indices.push(i);
                }
            }

        }

        return {
            index: indices,
            length: totalLength
        };

    }

    SearchWithoutTaskeel(totalText) {
        let indices = Searcher.occurrencesIndices = totalText.getIndicesOf(Searcher.SearchedString);
        let length = (Searcher.SearchedStringLength = Searcher.SearchedString.length);

        indices.forEach(index => quill.formatText(index, length, 'SearchedString', true));

    }

    replace() {
        if (!Searcher.SearchedString) return;

        // if no occurrences, then search first.
        if (!Searcher.occurrencesIndices) this.search();
        if (!Searcher.occurrencesIndices) return;

        let indices = Searcher.occurrencesIndices;

        let oldString = searchInput.value;
        let newString = replaceInput.value;

        quill.deleteText(indices[Searcher.currentIndex], oldString.length);
        quill.insertText(indices[Searcher.currentIndex], newString);
        quill.formatText(indices[Searcher.currentIndex], newString.length, 'SearchedString', false);
        // update the occurrencesIndices.
        this.search();
    }

    replaceAll() {
        if (!Searcher.SearchedString) return;
        let oldStringLen = searchInput.value.length;
        let newString = replaceInput.value;

        // if no occurrences, then search first.
        if (!Searcher.occurrencesIndices) this.search();
        if (!Searcher.occurrencesIndices) return;


        if (Searcher.occurrencesIndices) {
            while (Searcher.occurrencesIndices) {
                quill.deleteText(Searcher.occurrencesIndices[0], oldStringLen);
                quill.insertText(Searcher.occurrencesIndices[0], newString);

                // update the occurrencesIndices.
                this.search();
            }
        }
        Searcher.removeStyle();
    }

    static removeStyle() {
        if (Searcher.occurrencesIndices) {
            Searcher.occurrencesIndices.forEach(index =>
                quill.formatText(index, Searcher.SearchedStringLength, 'SearchedString', false
                )
            );
        }
    }

    static isSearchedStringFound() {
        return new RegExp(Searcher.SearchedString, 'gi').test(quill.getText());
    }
}