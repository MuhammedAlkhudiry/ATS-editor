class FileLoader {
    static load(file) {

        let loadedFile = new ATSFile();

        let options = {
            defaultPath: path.resolve(app.getPath('desktop')),

            filters: [{
                name: 'html',
                extensions: ['htm', 'html']
            },
            ],
            properties: ['openFile']
        };

        // show open file dialog, if you choose file, then read it.
        dialog.showOpenDialog(options)
            .then(result => {
                if (!result.canceled) {
                    loadedFile.path = result.filePaths[0];
                    fs.readFile(loadedFile.path, 'utf8')
                        .then(data => {
                            loadedFile.content = data;
                            FileHelper.handleLoadedFile(loadedFile, file);

                        }).catch(() => new Notification('fail', 'ثمة خلل.. تعذر فتح الملف'));
                }
            }).catch(err => {
            console.log(err);
        });
    }

    static loadByDragDrop(draggedFile, file) {
        let docFile = 'application/msword';
        let docxFile = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        let loadedFile = new ATSFile();
        if (draggedFile.type === 'text/html') {
            loadedFile.path = draggedFile.path;

            fs.readFile(loadedFile.path, 'utf8').then(data => {
                loadedFile.content = data;
                FileHelper.handleLoadedFile(loadedFile, file);
            }).catch(() => new Notification('fail', 'ثمة خلل.. تعذر فتح الملف'));

        } else if (draggedFile.type === docFile || draggedFile.type === docxFile) {
            // TODO: convert from doc/docx to html
        } else {
            new Notification('fail', 'صيغة المستند غير مقبولة');
        }
    }
}
