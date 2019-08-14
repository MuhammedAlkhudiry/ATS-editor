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
        Searcher.SearchedString = document.getElementById('search-input').value;
        if (Searcher.SearchedString) {
            let totalText = quill.getText();
            let re = new RegExp(Searcher.SearchedString, 'gi');
            let match = re.test(totalText);
            if (match) {
                let indices = Searcher.occurrencesIndices = totalText.getIndicesOf(Searcher.SearchedString);
                let length = (Searcher.SearchedStringLength = Searcher.SearchedString.length);

                indices.forEach(index => quill.formatText(index, length, 'SearchedString', true)
                );
            }
            else {
                Searcher.occurrencesIndices = null;
                Searcher.currentIndex = 0;
            }
        }
        else {
            Searcher.removeStyle();
        }
    }

    replace() {
        if (!Searcher.SearchedString) return;

        // if no occurrences, then search first.
        if (!Searcher.occurrencesIndices) this.search();
        if (!Searcher.occurrencesIndices) return;

        let indices = Searcher.occurrencesIndices;

        let oldString = document.getElementById('search-input').value;
        let newString = document.getElementById('replace-input').value;

        quill.deleteText(indices[Searcher.currentIndex], oldString.length);
        quill.insertText(indices[Searcher.currentIndex], newString);
        quill.formatText(indices[Searcher.currentIndex], newString.length, 'SearchedString', false);
        // update the occurrencesIndices.
        this.search();
    }

    replaceAll() {
        if (!Searcher.SearchedString) return;
        let oldStringLen = document.getElementById('search-input').value.length;
        let newString = document.getElementById('replace-input').value;

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
}