'use strict';

const extensionsMenu = document.getElementById('save-extensions-list');

class ATSFile {
    name;
    path;
    content;
    savingStatus;
    lastModifiedDate = null;


    constructor() {
        this.savingStatus = 'المستند غير محفوظ';
        extensionsMenu.addEventListener('click', this.saveFile.bind(this));
        setInterval(this.autoSave.bind(this), 5 * 1000);
    }

    // setters
    setSavingStatus(msg, cssClass) {
        let savingStatusText = document.getElementById('saving-status');

        this.savingStatus = savingStatusText.innerText = msg;
        savingStatusText.className = cssClass;
        if (msg === 'المستند محفوظ') {
            this.lastModifiedDate = `${new HijriDate().getWeekdayName()}، الساعة: ${new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric'
            })}`;
        }
    }

    set name(name) {
        let fileName = document.getElementById('file-name');
        fileName.value = name;
        this.name = name;
    }

    set lastModifiedDate(currentDate) {
        this.lastModifiedDate = currentDate;
        lastModifiedDate.textContent = ` آخر تعديل: ${this.lastModifiedDate}`;
    };

    saveFile(e) {
        if (e.defaultPrevented) return;
        if (fileManager.fileNameFieldText.value.isEmpty()) {
            new Notification('fail', 'خانة اسم المستند فارغة');
            fileManager.fileNameFieldText.focus();
            fileManager.changeFileName();
            return;
        }

        e.preventDefault();
        e.stopPropagation();
        this.name = fileManager.fileNameFieldText.value;
        let chosenExt = e.target.id;
        // when opening save window, open the window in desktop.
        let toLocalPath = path.resolve(app.getPath('desktop'));

        // show save dialog, and let user choose a location, and store the path.
        dialog.showSaveDialog({
            defaultPath: toLocalPath + '/' + this.name,
            filters: [
                {name: chosenExt, extensions: [chosenExt]},
            ],
        }).then(path => {
            this.path = path;
            this.content = 'ats-editor-file' + EditorHelper.getEditorContent();
            switch (chosenExt) {
                case 'html':
                    fileManager.saveAsHTML(this);
                    break;
                case 'pdf':
                    fileManager.saveAsPDF(this);
                    break;
                case'docx':
                    break;
                case'txt':
                    fileManager.saveAsPlainText(this);
                    break;
            }
            change = new Delta();
        }).catch(() => new Notification('fail', 'ثمة خلل.. تعذر حفظ المستند'));


    }

    autoSave() {
        if (!change.length() > 0 || !this.path) return;

        fsx.pathExists(this.path)
            .then(exists => {
                if (exists) {
                    this.content = 'ats-editor-file' + EditorHelper.getEditorContent();
                    change = new Delta();
                    this.setSavingStatus('المستند محفوظ', 'saved-file');
                    fsx.writeFile(this.path, this.content);
                }
            })
            .then(() => this.setSavingStatus('المستند محفوظ', 'saved-file'))
            .catch(() => new Notification('fail', 'تعذر حفظ المستند.. المستند الحالي منقول أو محذوف'));
    }


}

let file = new ATSFile(),
    // user = new User(),
    change = new Delta();

quill.on('text-change', function (delta) {
    change = change.compose(delta);
    if (file.path)
        file.setSavingStatus('يجري الحفظ...', 'currently-saving');
    else
        file.setSavingStatus('المستند غير محفوظ', 'unsaved-file');

});

new Popper(saveIcon, extensionsMenu, {placement: 'left-start'});