const fs = require('fs');
let ATSFile = require('./ATSFile');

module.exports = class FileLoader {
    static load() {

        let options = {
            defaultPath: path.resolve(app.getPath("desktop")),

            filters: [{
                name: 'html',
                extensions: ['htm', 'html']
            },],
            properties: ['openFile']
        }

        let file = new ATSFile();

        try {
            file.path = dialog.showOpenDialog(options)[0]
        } catch (error) {
            file.path = null;
        }

        if (file.path != null) {
            file.content = fs.readFileSync(file.path, 'utf8');

            file.name = getFileName(file.path);

            return file;
        }
    }

    static loadByDragDrop(draggedFile) {
        let docFile = "application/msword";
        let docxFile = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        if (draggedFile.type == "text/html") {
                let file = new ATSFile();
                file.name = getFileName(draggedFile.path);
                file.path = draggedFile.path;
            file.content = fs.readFileSync(draggedFile.path, 'utf8');
                return file; 

        } else if (draggedFile.type == docFile || draggedFile.type == docxFile) {
            // TODO: convert from doc/docx to html then send to main process
        } else {
            new Note().fail('صيغة المستند غير مقبولة')
        }
    }
}
