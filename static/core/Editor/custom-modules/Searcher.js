const numberOccurrences = document.getElementById('number-occurrences');

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

        document.getElementById('search-input').addEventListener('input', this.search.bind(this));
        document.getElementById('search-input').addEventListener('keyup', this.keyPressedSearchHandler.bind(this));
        document.getElementById('replace').addEventListener('click', this.replace.bind(this));
        document.getElementById('replace-input').addEventListener('keyup', this.keyPressedReplaceHandler.bind(this));
        document.getElementById('replace-all').addEventListener('click', this.replaceAll.bind(this));
    }


    search() {
        //  remove any previous search
        if (!Searcher.occurrencesIndices.isEmpty()) Searcher.removeStyle();

        let isTashkeelIgnore = document.getElementById('ignore-taskeel').checked;
        let isHamzaIgnore = document.getElementById('ignore-hamza').checked;
        Searcher.SearchedString = searchInput.value;

        // if input is empty, return input style to default, return.
        if (!Searcher.SearchedString) {
            searchInput.className = 'text-input';
            numberOccurrences.textContent = `عدد حالات التطابق: 0 مرات`;
            return;
        }

        if (Searcher.isSearchedStringFound(isHamzaIgnore, isTashkeelIgnore)) {
            searchInput.classList.contains('invalid') ? searchInput.classList.remove('invalid') : searchInput.classList.add('valid');
            setTimeout(() => {
                let totalText = quill.getText();
                if (isHamzaIgnore) {
                    totalText = ArabicHelper.removeHamza(totalText);
                    Searcher.SearchedString = ArabicHelper.removeHamza(Searcher.SearchedString);
                }
                if (isTashkeelIgnore) this.SearchIgnoreTashkeel(totalText, isHamzaIgnore);
                else this.SearchTashkeel(totalText, isHamzaIgnore);
                numberOccurrences.textContent = ` عدد حالات التطابق: ${Searcher.occurrencesIndices.length} مرات `;

            }, 0);
        } else {
            Searcher.occurrencesIndices = [];
            Searcher.currentIndex = 0;
            searchInput.classList.contains('valid') ? searchInput.classList.remove('valid') : searchInput.classList.add('invalid');
            numberOccurrences.textContent = ` عدد حالات التطابق: 0`;
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
                    } else if (totalText[j] !== Searcher.SearchedString[currentCharSS]) {
                        currentCharSS++;
                        isMatched = false;
                        break;
                    } else {
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
        if (Searcher.occurrencesIndices.isEmpty()) this.search();
        if (Searcher.occurrencesIndices.isEmpty()) return;

        let indices = Searcher.occurrencesIndices;
        let newString = replaceInput.value;

        if (Searcher.totalLength.isEmpty()) {
            quill.deleteText(indices[Searcher.currentIndex], Searcher.length);
            quill.insertText(indices[Searcher.currentIndex], newString);
        } else {
            quill.deleteText(indices[Searcher.currentIndex], Searcher.totalLength[Searcher.currentIndex]);
            quill.insertText(indices[Searcher.currentIndex], newString);
        }

        // update the occurrencesIndices.
        this.search();
    }

    replaceAll() {
        if (!Searcher.SearchedString) return;
        let newString = replaceInput.value;

        // if no occurrences, then search first.
        if (Searcher.occurrencesIndices.isEmpty()) this.search();
        if (Searcher.occurrencesIndices.isEmpty()) return;

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

    keyPressedSearchHandler(e) {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    keyPressedReplaceHandler(e) {
        if (e.key === 'Enter') {
            this.replace();
        }
    }

    static addStyle() {
        if (Searcher.totalLength.isEmpty()) {
            for (let i = 0; i < Searcher.occurrencesIndices.length; i++) {
                setTimeout(() => {
                    quill.formatText(Searcher.occurrencesIndices[i], Searcher.length, 'SearchedString', true);
                }, 0);
            }
        } else {
            for (let i = 0; i < Searcher.occurrencesIndices.length; i++) {
                setTimeout(() => {
                    quill.formatText(Searcher.occurrencesIndices[i], Searcher.totalLength[i], 'SearchedString', true);
                }, 0);
            }
        }
    }

    static removeStyle() {
        quill.formatText(0, quill.getLength(), 'SearchedString', false);
    }

    static isSearchedStringFound(isHamzaIgnored, isTashkeelIgnored) {
        if (isHamzaIgnored && isTashkeelIgnored)
            return new RegExp(Searcher.SearchedString, 'gi').test(ArabicHelper.removeHamza(ArabicHelper.removeTashkeel(quill.getText())));
        if (isTashkeelIgnored)
            return new RegExp(Searcher.SearchedString, 'gi').test(ArabicHelper.removeTashkeel(quill.getText()));
        if (isHamzaIgnored)
            return new RegExp(Searcher.SearchedString, 'gi').test(ArabicHelper.removeHamza(quill.getText()));
        else
            return new RegExp(Searcher.SearchedString, 'gi').test(quill.getText());
    }

}
