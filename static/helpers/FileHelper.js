 class FileHelper {

    static isOpenedFileValid(fileContent) {
        return fileContent.contains('ats-editor-file');
    }

    static isFileNameNotValid(fileName) {
        return fileName.isEmpty();
    }


    static getFileNameFromPath(path) {

        return path.split('\\').pop()
            .substr(0, path.split('\\')
                .pop().indexOf('.'));
    }

    static handleLoadedFile(loadedFile, file) {

        if (FileHelper.isOpenedFileValid(loadedFile.content)) {
            file = loadedFile;
            EditorHelper.setEditorContent(file.content);
            file.setName(FileHelper.getFileNameFromPath(file.path));
            new Notification('fail', 'تعذر فتح المستند.. يسمح بفتح مستند واحد فقط')('success', 'فُتح الملف');
        } else {
            new Notification('fail', 'المستند معطوب')
        }
    }
};