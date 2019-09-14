class User {

    dictionary = {};
    settings = {};
    shortcuts = {};
    ignoreWords = [];


    constructor(settings, shortcuts) {
        this.dictionary =
            JSON.parse(fs.readFileSync('./static/core/User/user_dictionary.json').toString());
        this.settings = settings;
        this.shortcuts = shortcuts;
    }

    addToDictionary() {
        fs.writeFile('./static/core/User/user_dictionary.json').then(() => new Notification('success', 'أُضيفت الكلمة إلى القاموس الشخصي'));
        fs.readFile('./static/core/User/user_dictionary.json').then(data => {
            this.dictionary = JSON.parse(data.toString());
        });
    }

    removeFromDictionary() {

    }

    updateSettings() {

    }

    addToIgnoreWords() {
        this.ignoreWords.push(misspelledWord.textContent);
    }

    get dictionary() {
        fs.readFile('./static/core/User/user_dictionary.json').then(() => new Notification('success', 'أُضيفت الكلمة إلى القاموس الشخصي'));
    }

    set dictionary(value) {
        this.dictionary = value;
    }

    get settings() {
        return this.settings;
    }

    set settings(value) {
        this.settings = value;
    }

    get shortcuts() {
        return this.shortcuts;
    }

    set shortcuts(value) {
        this.shortcuts = value;
    }
}

