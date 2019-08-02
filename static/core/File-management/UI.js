let ATSFile = require('./../static/core/File-management/ATSFile');
let FileSaver = require('./../static/core/File-management/FileSaver');
let FileLoader = require('./../static/core/File-management/FileLoader');
let file = new ATSFile();
let change = new Delta();

/* -------------------------------- file name ------------------------------- */
let fileName = document.getElementById('file-name');
let fileNameValidationIcon = document.getElementById('file-name-valid-icon');

fileName.addEventListener('input', e => {
    if (fileName.value.length > 0) {
        fileName.className = 'valid-file-name';
        fileNameValidationIcon.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" widthz="20" height="20" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>';
    } else {
        fileName.className = 'unvalid-file-name';
        fileNameValidationIcon.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';
    }

    // when fileName field change, discard old file.
    file = new ATSFile();
    file.setSavingStatus('المستند غير محفوظ', 'unsaved-file');

});

fileName.addEventListener('focusout', e => {
    fileName.className = '';
});


/* -------------------------------------------------------------------------- */
/* -------------------------------- file name ------------------------------- */
document.getElementById('new-file-icon').addEventListener('click', e => {

    if (change.length() > 0) {

        new Note().unsavedFile().then((result) => {
            if (result.value) {

                EditorHelper.cleanEditor();
                new Note().info('مستند جديد');
            }
        });

    } else {
        EditorHelper.cleanEditor();
        new Note().info('مستند جديد');
    }

});
/* -------------------------------------------------------------------------- */

let savingBoxHTML = `
<div id="saving-box-content">
  <div id="pdf">
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19M10.59,10.08C10.57,10.13 10.3,11.84 8.5,14.77C8.5,14.77 5,16.58 5.83,17.94C6.5,19 8.15,17.9 9.56,15.27C9.56,15.27 11.38,14.63 13.79,14.45C13.79,14.45 17.65,16.19 18.17,14.34C18.69,12.5 15.12,12.9 14.5,13.09C14.5,13.09 12.46,11.75 12,9.89C12,9.89 13.13,5.95 11.38,6C9.63,6.05 10.29,9.12 10.59,10.08M11.4,11.13C11.43,11.13 11.87,12.33 13.29,13.58C13.29,13.58 10.96,14.04 9.9,14.5C9.9,14.5 10.9,12.75 11.4,11.13M15.32,13.84C15.9,13.69 17.64,14 17.58,14.32C17.5,14.65 15.32,13.84 15.32,13.84M8.26,15.7C7.73,16.91 6.83,17.68 6.6,17.67C6.37,17.66 7.3,16.07 8.26,15.7M11.4,8.76C11.39,8.71 11.03,6.57 11.4,6.61C11.94,6.67 11.4,8.71 11.4,8.76Z" /></svg>    
    <br>
    <strong class="ext-name">PDF</strong>
    <br>
    <span class="is-size-7 ext-notes">
      مناسب للقراءة والطباعة <br>
      غير مناسب للتحرير لاحقًا
    </span>

  </div>
  <div id="html">
    
    <?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L
    9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z" /></svg>
    <br>

    <strong class="ext-name">HTML</strong>
    <br>
    <span class="is-size-7 ext-notes">

      مناسب للتحرير لاحقًا
    </span>
  </div>
  <div id="docx">
   <?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
   "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
   version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0
    20,20V8L14,2M15.2,20H13.8L12,13.2L10.2,20H8.8L6.6,11H8.1L9.5,17.8L11.3,11H12.6L14.4,17.8L15.8,11H17.3L15.2,20M13,9V3.5L18.5,9H13Z" /></svg>
    <br>
    <strong class="ext-name">DOCX</strong>
    <br>
    <span class="is-size-7 ext-notes">
      مناسب لفتح المستند في برنامج وورد.
    </span>
  </div>
</div>
`;

/* --------------------------------- saving --------------------------------- */

tippy('#save-icon', {
    trigger: 'click',
    theme: 'light',
    interactive: true,
    multiple: true,
    maxWidth: 1000,
    content: savingBoxHTML,
    onShown() {

        document.getElementById('saving-box-content').addEventListener('click', e => {
            if (FileHelper.isFileNameNotValid(fileName.value)) {
                new Note().fail('خانة اسم المستند فارغة');
                fileName.focus();
                fileName.className = 'unvalid-file-name';
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            file.setName(fileName.value);
            let chosenExt = e.target.id;
            // when opening save window, open the window in desktop.
            let toLocalPath = path.resolve(app.getPath('desktop'));

            try {
                FileSaver.save(file, chosenExt, toLocalPath);
                change = new Delta();

            } catch (err) {
                new Note().fail('ثمة خلل.. تعذر حفظ المستند');

            }
        });
    },
});

/* -------------------------------------------------------------------------- */

/* --------------------------------- auto-saving --------------------------------- */

// Save periodically
setInterval(function () {
    if (change.length() > 0 && file.path) {
        file.setSavingStatus('يجري الحفظ...', 'currently-saving');
        file.content = EditorHelper.getEditorContent();
        FileSaver.autoSave(file);
        change = new Delta();
        file.setSavingStatus('المستند محفوظ', 'saved-file');
    }
}, 5 * 1000);

/* -------------------------------------------------------------------------- */

/* ------------------------------ loading file ----------------------------- */

document.getElementById('open-file-icon').addEventListener('click', loadFile);

function loadFile(e) {

    if (change.length() > 0) {

        new Note().unsavedFile().then((result) => {
            if (result.value) {

                EditorHelper.cleanEditor();
                FileLoader.load(file);

            }
        });

    } else {
        EditorHelper.cleanEditor();
        FileLoader.load(file);
    }
}

/* -------------------------------------------------------------------------- */

/* -------------- open file by drag-drop from operating system -------------- */

document.body.addEventListener('drop', (e) => {


    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files.length === 0) return;

    if (e.dataTransfer.files.length > 1) {
        new Note().fail('تعذر فتح المستند.. يسمح بفتح مستند واحد فقط');
        return;
    }

    let draggedFile = e.dataTransfer.files[0];

    if (change.length() > 0) {

        new Note().unsavedFile().then((result) => {
            if (result.value) {
                EditorHelper.cleanEditor();
                FileHelper.handleLoadedFile(FileLoader.loadByDragDrop(draggedFile));
            }
        });

    } else {
        EditorHelper.cleanEditor();
        FileHelper.handleLoadedFile(FileLoader.loadByDragDrop(draggedFile));
    }
});


/* -------------------------------------------------------------------------- */

/* -------------------------- tracking file changes ------------------------- */

quill.on('text-change', function (delta) {
    change = change.compose(delta);
    file.setSavingStatus('المستند غير محفوظ', 'unsaved-file');
});

/* -------------------------------------------------------------------------- */
