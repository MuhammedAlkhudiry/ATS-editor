'use strict';

// Arabic Text Smart file.
class ATSFile {
    name;
    path;
    content;
    savingStatus;

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

}