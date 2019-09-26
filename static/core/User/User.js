class User {

    dictionary = {};
    settings = {};
    shortcuts = {};
    ignoreWords = [];


    constructor(settings, shortcuts) {
        fsx.readJson('./static/core/User/user_dictionary.json').then(data => this.dictionary = data);
        this.settings = settings;
        this.shortcuts = shortcuts;
    }

    addToDictionary() {
        fsx.writeJson('./static/core/User/user_dictionary.json').then(() => new Notification('success', 'أُضيفت الكلمة إلى القاموس الشخصي'));
        fsx.readJson('./static/core/User/user_dictionary.json').then(data => this.dictionary = data);
    }

    removeFromDictionary() {

    }

    updateSettings() {

    }

    addToIgnoreWords() {
        this.ignoreWords.push(misspelledWord.textContent);
    }
}

