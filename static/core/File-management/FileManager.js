class FileManager {

    constructor() {
        this.fileNameFieldText = document.getElementById('file-name');
        this.fileNameFieldText.addEventListener('input', this.changeFileName.bind(this));
        document.getElementById('new-file').addEventListener('click', this.createNewFile.bind(this));
        document.getElementById('open-file').addEventListener('click', this.openFile.bind(this));
        document.body.addEventListener('drop', this.handleDragDropFile.bind(this));
    }

    changeFileName() {
        if (this.fileNameFieldText.value === '')
            this.fileNameFieldText.classList.add('invalid-file-name');
        else
            this.fileNameFieldText.classList.remove('invalid-file-name');

        // when fileName field change, discard old this.
        file = new ATSFile();
        file.setSavingStatus('المستند غير محفوظ', 'unsaved-file');
    }

    createNewFile() {
        if (change.length() === 0) EditorHelper.cleanEditor();
        else
            new AlertHelper('unsaved-file')
                .then((result) => {
                    if (result.value) {
                        EditorHelper.cleanEditor();
                        new AlertHelper('info', 'مستند جديد');
                        fileManager.fileNameFieldText.value = 'مستند جديد';
                    }
                });
    }

    openFile() {
        if (change.length() === 0) {
            this.loadFile(file);
        } else
            new AlertHelper('unsaved-file').then((result) => {
                if (result.value) {
                    this.loadFile();
                }
            });
    }

    handleDragDropFile(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files.length === 0) return;

        if (e.dataTransfer.files.length > 1) {
            new AlertHelper('fail', 'تعذر فتح المستند.. يسمح بفتح مستند واحد فقط');
            return;
        }

        let draggedFile = e.dataTransfer.files[0];

        if (change.length() === 0) {
            ATSFile.loadFileByDragDrop(draggedFile);

        } else
            new AlertHelper('unsaved-file').then((result) => {
                if (result.value) {
                    ATSFile.loadFileByDragDrop(draggedFile);
                }
            });

    }

    loadFile() {
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
                debugger
                if (result.canceled) return;
                loadedFile.path = result.filePaths[0];
                fsx.readFile(loadedFile.path, 'utf8')
                    .then(data => {
                        if (!data) return;
                        loadedFile.content = data;
                        FileHelper.handleLoadedFile(loadedFile, file);

                    });
            })
            .catch(() => new AlertHelper('fail', 'ثمة خلل.. تعذر فتح الملف'));
    }

    loadFileByDragDrop(draggedFile) {
        const docFile = 'application/msword';
        const docxFile = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const loadedFile = new ATSFile();
        if (draggedFile.type === 'text/html') {
            loadedFile.path = draggedFile.path;

            fsx.readFile(loadedFile.path, 'utf8').then(data => {
                loadedFile.content = data;
                FileHelper.handleLoadedFile(loadedFile, file);
            }).catch(() => new AlertHelper('fail', 'ثمة خلل.. تعذر فتح الملف'));

        } else if (draggedFile.type === docFile || draggedFile.type === docxFile) {
            // TODO: convert from doc/docx to html
        } else if (draggedFile.type !== 'image/jpeg') {
            new AlertHelper('fail', 'صيغة المستند غير مقبولة');
        }
    }

    saveAsPDF(file) {
        Searcher.removeStyle();
        document.querySelector('.for-print').innerHTML = document.querySelector('.ql-container').outerHTML;
        win.webContents.printToPDF({})
            .then((data) => fsx.writeFile(file.path, data))
            .then(() => new AlertHelper('success', 'PDF حٌفظ المستند بصيغة'))
            .catch((err) => {
                new AlertHelper('fail', 'تعذر حفظ المستند');
                console.log(err);
            });
    }

    saveAsHTML(file) {
        Searcher.removeStyle();
        file.content = 'ats-editor-file' + EditorHelper.getEditorContent();
        debugger
        fsx.writeFile(file.path, file.content)
            .then(() => {
                new AlertHelper('success', 'حٌفظ المستند');
                file.setSavingStatus('المستند محفوظ', 'saved-file');
            }).catch((err) => {
            console.log(err);
            new AlertHelper('fail', 'تعذر حفظ المستند');
        });
    }

    saveAsPlainText(file) {
        Searcher.removeStyle();
        file.content = quill.getText();
        fsx.writeFile(file.path, file.content)
            .then(() => {
                new AlertHelper('success', 'حٌفظ المستند');
                file.setSavingStatus('المستند محفوظ', 'saved-file');
            })
            .catch(() => new AlertHelper('fail', 'تعذر حفظ المستند'));
    }

    saveAsDOCX(file) {
        Searcher.removeStyle();
        fsx.writeFile(file.path, file.content)
            .then(() => new AlertHelper('success', 'DOCX حٌفظ المستند بصيغة'))
            .catch(() => new AlertHelper('fail', 'تعذر حفظ المستند'));

    }
}

const fileManager = new FileManager();