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
        else if (extension === 'pdf') {

            win.webContents.printToPDF({
                marginsType: 0,
                printBackground: false,
                printSelectionOnly: false,
                landscape: false,
                pageSize: 'A4',
            }, (error, data) => {
                if (error) throw error;
                fs.writeFile(file.path, data, e => {
                    new Notification('success', 'حٌفظ المستند بصيغة PDF');
                    file.path = null;
                });
            });
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
};


