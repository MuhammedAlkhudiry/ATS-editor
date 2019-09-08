class FileSaver {

    static save(file, extension, localPath) {

        // show save dialog, and let user choose a location, and store the path.
        file.path = dialog.showSaveDialogSync({
            defaultPath: localPath + '/' + file.name,
            'filters': [{
                'name': extension,
                'extensions': [extension]
            },],
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
        try {
            fs.writeFile(file.path, file.content, e => {
                file.setSavingStatus('المستند محفوظ', 'saved-file');
            });
        } catch (e) {
            console.log(e);
        }
    }

    static saveAsPDF() {

        const options = {
            'format': 'A4',        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
            'orientation': 'landscape', // portrait or landscape
        };

        pdf.create(EditorHelper.getEditorContent().replace('ats-editor-file', ''), options).toFile(file.path, (err, res) => {
            if (err) return console.log(err);
            new Notification('success', 'PDF حٌفظ المستند بصيغة');
            file.path = null;
        });
    }

    static saveAsHTML() {
        Searcher.removeStyle();
        file.content = EditorHelper.getEditorContent();

        try {
            fs.writeFile(file.path, file.content, e => {
                new Notification('success', 'حٌفظ المستند');
                file.setSavingStatus('المستند محفوظ', 'saved-file');
            });
        } catch (e) {
            console.log(e);
        }
    }
}


