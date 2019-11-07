class FileHelper {

    static isOpenedFileValid(fileContent) {
        return fileContent.contains('ats-editor-file');
    }


    static getFileNameFromPath(path) {

        return path.split('\\').pop()
            .substr(0, path.split('\\')
                .pop().indexOf('.'));
    }

    static handleLoadedFile(loadedFile, file) {

        if (FileHelper.isOpenedFileValid(loadedFile.content)) {
            file = loadedFile;
            EditorHelper.cleanEditor();
            EditorHelper.setEditorContent(file.content);
            file.setName(FileHelper.getFileNameFromPath(file.path));
            new AlertHelper('success', 'فُتح الملف');
        } else {
            new AlertHelper('fail', 'المستند معطوب');
        }
    }

    static HTMLToDocx() {
        const doc = new Document();

        return doc;
    }
};