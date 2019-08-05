const fs = require('fs');
let ATSFile = require('./ATSFile');

module.exports = class FileLoader {
    static load(file) {

        let loadedFile = new ATSFile();

        let options = {
            defaultPath: path.resolve(app.getPath("desktop")),

            filters: [{
                name: 'html',
                extensions: ['htm', 'html']
            },
            ],
            properties: ['openFile']
        };

        // show open file dialog, if you choose file, then read it.
        loadedFile.path = dialog.showOpenDialog(options)[0];
        if (loadedFile.path) {
            fs.readFile(loadedFile.path, 'utf8', (err, data) => {
                if (err) {
                    new Note('fail', 'ثمة خلل.. تعذر فتح الملف')
                    return;
                }
                loadedFile.content = data;
                FileHelper.handleLoadedFile(loadedFile, file);

            })

        }
    }

    static loadByDragDrop(draggedFile, file) {
        let docFile = "application/msword";
        let docxFile = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        let loadedFile = new ATSFile();
        if (draggedFile.type === "text/html") {

            loadedFile.path = draggedFile.path;

            fs.readFile(loadedFile.path, 'utf8', (err, data) => {
                if (err) {
                    new Note('fail', 'ثمة خلل.. تعذر فتح الملف')
                    return;
                }
                loadedFile.content = data;
                FileHelper.handleLoadedFile(loadedFile, file);
            })

        } else if (draggedFile.type === docFile || draggedFile.type === docxFile) {
            // TODO: convert from doc/docx to html then send to main process
        } else {
            new Note('fail', 'صيغة المستند غير مقبولة')
        }
    }
};
