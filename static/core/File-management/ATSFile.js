'use strict';

// Arabic Text Smart file.
class ATSFile {
    name;
    path;
    content;
    savingStatus;
    lastModifiedDate = null;

    setSavingStatus(msg, cssClass) {
        let savingStatusText = document.getElementById('saving-status-text');

        this.savingStatus = savingStatusText.innerText = msg;
        savingStatusText.className = cssClass;
        if (msg === 'المستند محفوظ') {
            this.setLastModifiedDate();

        }
    }

    setName(name) {
        let fileName = document.getElementById('file-name');
        fileName.value = name;
        this.name = name;
    }

    setLastModifiedDate() {
        this.lastModifiedDate = `${new HijriDate().getWeekdayName()}، الساعة: ${new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
        })}`;

        lastModifiedDate.textContent = ` آخر تعديل: ${this.lastModifiedDate}`;
    };

}