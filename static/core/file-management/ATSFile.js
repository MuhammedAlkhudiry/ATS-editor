'use strict';

const fs = require('fs');

// Arabic Text Smart file.
module.exports = class ATSFile {
    name;
    path;
    content;
    savingStatus;

    constructor() {
        document.getElementById('new-file-icon').addEventListener('click', ATSFile.newFile.bind(this));
    }

    setSavingStatus(msg, cssClass) {
        let savingStatusText = document.getElementById('saving-status-text');

        this.savingStatus = savingStatusText.innerText = msg;
        savingStatusText.className = cssClass;
    }

    setName(name) {
        let fileName = document.getElementById('file-name');
        fileName.value = name;
        this.name = name;
    }

    static newFile() {

        if (change.length() > 0) {

            new Note().unsavedFile().then((result) => {
                if (result.value) {

                    EditorHelper.cleanEditor();
                    new Note().info('ملف جديد');
                }
            });

        } else {
            EditorHelper.cleanEditor();
            new Note().info('ملف جديد');
        }
    }

};
