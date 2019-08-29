class User {

    dictionary = {};
    settings = {};
    shortcuts = {};
    ignoreWords = [];


    constructor(dictionary, settings, shortcuts) {
        this._dictionary = dictionary;
        this._settings = settings;
        this._shortcuts = shortcuts;
    }


    get dictionary() {
        return this._dictionary;
    }

    set dictionary(value) {
        this._dictionary = value;
    }

    get settings() {
        return this._settings;
    }

    set settings(value) {
        this._settings = value;
    }

    get shortcuts() {
        return this._shortcuts;
    }

    set shortcuts(value) {
        this._shortcuts = value;
    }
}

