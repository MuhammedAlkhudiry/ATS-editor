// let chosenPath;
const fs = require('fs');
let ATSFile = require('./ATSFile');

module.exports = class FileSaver {

  static save(fileName, extension, localPath) {
    let file = new ATSFile();
    file.name = fileName;

    // show save dialog, and let user choose a location, and store the path.
    file.path = dialog.showSaveDialog({
      defaultPath: localPath + "/" + file.name,
      "filters": [{
        "name": extension,
        "extensions": [extension]
      },],
    });
    // TODO: if pdf, docx.
    if (extension == 'html') {
      file.content = getEditorContent();

      // create a file in the chosen location, then write the file content in it
      try {
        fs.writeFileSync(file.path, file.content)
        return file;
      } catch (e) {
        console.log(e)
      }
    }
  }

  static autoSave(file) {
    fs.writeFileSync(file.path, file.content)
  }
}


