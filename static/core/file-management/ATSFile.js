'use strict';

const fs = require('fs');

module.exports = class ATSFile {

    constructor() {
        this.name;
        this.path;
        this.content;
        this.savingStatus;
    }

    setSavingStatus(msg, cssClass) {
        let savingStatusText = document.getElementById('saving-status-text');

        this.savingStatus = savingStatusText.innerText = msg;
        savingStatusText.className = cssClass;
    }
}
