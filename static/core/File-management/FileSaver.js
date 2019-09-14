class FileSaver {

    static save(file, extension, localPath) {

        // show save dialog, and let user choose a location, and store the path.
        file.path = dialog.showSaveDialogSync({
            defaultPath: localPath + '/' + file.name,
            'filters': [{
                'name': extension,
                'extensions': [extension]
            }],
        });

        // TODO: if pdf, docx.
        if (extension === 'html') {
            FileSaver.saveAsHTML();
        } else if (extension === 'pdf') {
            FileSaver.saveAsPDF();
        } else if (extension === 'docx') {

        }
    }

    static autoSave(file) {
        fs.writeFile(file.path, file.content).then(data => file.setSavingStatus('المستند محفوظ', 'saved-file'));
    }


    static saveAsPDF() {

        document.querySelector('.for-print').innerHTML = document.querySelector('.ql-container').outerHTML;
        win.webContents.printToPDF({}).then((data) =>
            fs.writeFile(file.path, data).then(() => {
                new Notification('success', 'حٌفظ المستند');
                file.setSavingStatus('المستند محفوظ', 'saved-file');

            }).catch(() => new Notification('fail', 'تعذر حفظ المستند')));

    }

    static saveAsHTML() {
        Searcher.removeStyle();
        file.content = 'ats-editor-file' + EditorHelper.getEditorContent();

        fs.writeFile(file.path, file.content).then(data => {
            new Notification('success', 'حٌفظ المستند');
            file.setSavingStatus('المستند محفوظ', 'saved-file');

        }).catch(err => new Notification('fail', 'تعذر حفظ المستند'));
    }
}

