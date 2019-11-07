class User {

    dictionary = {};
    settings = {};
    shortcuts = {};
    ignoreWords = [];


    constructor(settings) {
        fsx.readJson('./static/core/User/user_dictionary.json').then(data => this.dictionary = data);
        this.settings = settings;
    }

    addToDictionary(word) {
        fsx.writeJson('./static/core/User/user_dictionary.json').then(() => new AlertHelper('success', 'أُضيفت الكلمة إلى القاموس الشخصي'));
        fsx.readJson('./static/core/User/user_dictionary.json').then(data => this.dictionary = data);
    }

    removeFromDictionary(word) {

    }

    updateSettings() {

    }

    addToIgnoreWords() {
        this.ignoreWords.push(misspelledWord.textContent);
    }

    removeFromIgnoreWords(word) {

    }

}

