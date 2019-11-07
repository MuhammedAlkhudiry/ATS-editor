'use strict';

class Settings {

    constructor(settings) {
        this.settings = settings;
        const settingsIcons = document.getElementsByClassName('settings-icon');
        [...settingsIcons].forEach(icon => {
            icon.addEventListener('click', e => {
            });
        });
    }

}