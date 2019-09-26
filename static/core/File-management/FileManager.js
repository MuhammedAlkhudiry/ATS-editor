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
            new Notification('unsaved-file')
                .then((result) => {
                    if (result.value) EditorHelper.cleanEditor();
                });
    }

    openFile() {
        if (change.length() === 0) {
            EditorHelper.cleanEditor();
            this.loadFile(file);
        } else
            new Notification('unsaved-file').then((result) => {
                if (result.value) {
                    EditorHelper.cleanEditor();
                    this.loadFile();
                }
            });

    }

    handleDragDropFile(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files.length === 0) return;

        if (e.dataTransfer.files.length > 1) {
            new Notification('fail', 'تعذر فتح المستند.. يسمح بفتح مستند واحد فقط');
            return;
        }

        let draggedFile = e.dataTransfer.files[0];

        if (change.length() === 0) {
            EditorHelper.cleanEditor();
            ATSFile.loadFileByDragDrop(draggedFile);

        } else
            new Notification('unsaved-file').then((result) => {
                if (result.value) {
                    EditorHelper.cleanEditor();
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
                if (!result.canceled) {
                    loadedFile.path = result.filePaths[0];
                    fsx.readFile(loadedFile.path, 'utf8');
                }
            })
            .then(data => {
                loadedFile.content = data;
                FileHelper.handleLoadedFile(loadedFile, file);

            }).catch(() => new Notification('fail', 'ثمة خلل.. تعذر فتح الملف'));
    }

    loadFileByDragDrop() {
        const docFile = 'application/msword';
        const docxFile = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const loadedFile = new ATSFile();
        if (draggedFile.type === 'text/html') {
            loadedFile.path = draggedFile.path;

            fsx.readFile(loadedFile.path, 'utf8').then(data => {
                loadedFile.content = data;
                FileHelper.handleLoadedFile(loadedFile, file);
            }).catch(() => new Notification('fail', 'ثمة خلل.. تعذر فتح الملف'));

        } else if (draggedFile.type === docFile || draggedFile.type === docxFile) {
            // TODO: convert from doc/docx to html
        } else if (draggedFile.type !== 'image/jpeg') {
            new Notification('fail', 'صيغة المستند غير مقبولة');
        }
    }

    saveAsPDF(file) {
        Searcher.removeStyle();
        document.querySelector('.for-print').innerHTML = document.querySelector('.ql-container').outerHTML;
        win.webContents.printToPDF({})
            .then((data) => fsx.writeFile(file.path, data))
            .then(() => {
                new Notification('success', 'حٌفظ المستند');
                file.setSavingStatus('المستند محفوظ', 'saved-file');
            }).catch((err) => {
            new Notification('fail', 'تعذر حفظ المستند');
            console.log(err);});
    }

    saveAsHTML(file) {
        Searcher.removeStyle();

        fsx.writeFile(file.path, file.content).then(() => {
            new Notification('success', 'حٌفظ المستند');
            file.setSavingStatus('المستند محفوظ', 'saved-file');

        }).catch(() => new Notification('fail', 'تعذر حفظ المستند'));
    }

    saveAsPlainText(file) {
        Searcher.removeStyle();
        fsx.writeFile(file.path, file.content).then(() => {
            new Notification('success', 'حٌفظ المستند');
            file.setSavingStatus('المستند محفوظ', 'saved-file');

        }).catch(() => new Notification('fail', 'تعذر حفظ المستند'));
    }
}

const fileManager = new FileManager();