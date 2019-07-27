
let ATSFile = require('./../static/core/file-management/ATSFile');
let FileSaver = require('./../static/core/file-management/FileSaver');
let FileLoader = require('./../static/core/file-management/FileLoader');
let file = new ATSFile();
let change = new Delta();

/* -------------------------------- file name ------------------------------- */
let fileName = document.getElementById('file-name');
let fileNameValidationImg = document.getElementById('file-name-valid-img');

fileName.addEventListener('input', e => {
  if (fileName.value.length > 0) {
    fileName.className = 'valid-file-name'
    fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/check.svg'
  }
  else {
    fileName.className = 'unvalid-file-name'
    fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/times.svg'
  }

  // when fileName field change, create new file.
  file = new ATSFile();

})

fileName.addEventListener('focusout', e => {
  fileName.className = '';
})
/* -------------------------------------------------------------------------- */


let savingBoxHTML = `
<div id="saving-box-content">
  <div id="pdf">
    <img src="../static/assets/fontawesome-free-5.9.0-web/svgs/regular/file-pdf.svg" width="18" height="18">
    <br>
    <strong class="ext-name">PDF</strong>
    <br>
    <span class="is-size-7 ext-notes">
      مناسب للقراءة والطباعة <br>
      غير مناسب للتحرير لاحقًا
    </span>

  </div>
  <div id="html">
    <img src="../static/assets/fontawesome-free-5.9.0-web/svgs/regular/file-code.svg" width="18" height="18">
    <br>

    <strong class="ext-name">HTML</strong>
    <br>
    <span class="is-size-7 ext-notes">

      مناسب للتحرير لاحقًا
    </span>
  </div>
  <div id="docx">
    <img src="../static/assets/fontawesome-free-5.9.0-web/svgs/regular/file-word.svg" width="18" height="18">
    <br>
    <strong class="ext-name">DOCX</strong>
    <br>
    <span class="is-size-7 ext-notes">
      مناسب لفتح الملف في برنامج وورد.
    </span>
  </div>
</div>
`

/* --------------------------------- saving --------------------------------- */

tippy('#save-icon', {
  trigger: 'click',
  theme: 'light',
  interactive: true,
  maxWidth: 1000,
  content: savingBoxHTML,
  onShown() {

    document.getElementById('saving-box-content').addEventListener('click', e => {
      if (isFileNameNotValid(fileName.value)) {
        new Note().fail('خانة اسم المستند فارغة');
        fileName.focus();
        fileName.className = 'unvalid-file-name';
        return;
      };

      e.preventDefault();
      e.stopPropagation();
      let chosenExt = e.target.id;
      // when opening save window, open the window in desktop.
      let toLocalPath = path.resolve(app.getPath("desktop"));

      try {
        file = FileSaver.save(fileName.value, chosenExt, toLocalPath);
        new Note().success('حٌفظ المستند');
        file.setSavingStatus('الملف محفوظ', 'saved-file');
        change = new Delta();

      } catch (err) {
        new Note().fail('ثمة خلل.. تعذر حفظ المستند')

      }
    })

  }
})

/* -------------------------------------------------------------------------- */

/* --------------------------------- auto-saving --------------------------------- */

// Save periodically
setInterval(function () {
  if (change.length() > 0 && file.path) {
    file.setSavingStatus('يجري الحفظ...', 'currently-saving')
    file.content = getEditorContent();
    FileSaver.autoSave(file);
    change = new Delta();
    file.setSavingStatus('الملف محفوظ', 'saved-file');
  }
}, 5 * 1000);

/* -------------------------------------------------------------------------- */

/* ------------------------------ loading file ----------------------------- */

document.getElementById('open-file-icon').addEventListener('click', openFile);

function openFile(e) {

  if (change.length() > 0) {

    // if true, means user want to discard the unsaved file and open another file.
    if (new Note().unsavedFile()) {
      cleanFile();
      try {
        handleLoadedFile(FileLoader.load(file));
      } catch (error) {
        new Note().fail('ثمة خلل.. تعذر فتح الملف')
      }
    }

  } else {
    cleanFile();
    try {
      handleLoadedFile(FileLoader.load(file));
    } catch (error) {
      new Note().fail('ثمة خلل.. تعذر فتح الملف')
    }
  }
}

/* -------------------------------------------------------------------------- */

/* -------------- open file by drag-drop from operating system -------------- */

document.body.addEventListener('drop', (e) => {


  e.preventDefault();
  e.stopPropagation();

  if (e.dataTransfer.files.length == 0) return;

  if (e.dataTransfer.files.length > 1) {
    new Note().fail('تعذر مستند الملف.. يسمح بفتح مستند واحد فقط')
    return;
  }

  let draggedFile = e.dataTransfer.files[0];

  if (change.length() > 0) {

    if (new Note().unsavedFile()) {
      cleanFile();
      try {
        handleLoadedFile(FileLoader.loadByDragDrop(draggedFile));
      } catch (error) {
        new Note().fail('ثمة خلل.. تعذر فتح الملف')
      }
    }
  } else {
    cleanFile();
    try {
      handleLoadedFile(FileLoader.loadByDragDrop(draggedFile));
    } catch (error) {
      new Note().fail('ثمة خلل.. تعذر فتح الملف')
    }
  }
});


/* -------------------------------------------------------------------------- */

function handleLoadedFile(loadedFile) {

  if (isOpenedFileValid(loadedFile.content)) {
    file = loadedFile;
    setEditorContent(file.content)
    new Note().success('فُتح الملف');
  } else {
    new Note().fail('المستند معطوب')
  }
}

/* -------------------------- tracking file changes ------------------------- */

quill.on('text-change', function (delta) {
  change = change.compose(delta);
  file.setSavingStatus('الملف غير محفوظ', 'unsaved-file')
});

/* -------------------------------------------------------------------------- */
