module.exports = class FileSaver {

    static save(file, extension, localPath) {

        // show save dialog, and let user choose a location, and store the path.
        file.path = dialog.showSaveDialog({
            defaultPath: localPath + "/" + file.name,
            "filters": [{
                "name": extension,
                "extensions": [extension]
            },],
        });
        // TODO: if pdf, docx.
        if (extension === 'html') {
            file.content = EditorHelper.getEditorContent();

            try {
                fs.writeFile(file.path, file.content, e => {
                    new Note('success', 'حٌفظ المستند');
                    file.setSavingStatus('المستند محفوظ', 'saved-file');
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    static autoSave(file) {
        try {
            fs.writeFile(file.path, file.content, e => {
                file.setSavingStatus('المستند محفوظ', 'saved-file');
            })
        } catch (e) {
            console.log(e)
        }
    }
};


