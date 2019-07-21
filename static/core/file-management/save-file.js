let chosenPath;
// Store accumulated changes
let change = new Delta();

/* --------------------------------- saving --------------------------------- */

document.getElementById('save-icon').addEventListener('click', saveFile);

function saveFile(e) {
  // TODO check if file saved before or not.

  Swal.fire({
    title: '<strong> اختيار صيغة الملف </strong>',
    type: 'info',
    html: `
          <div id="saving-container">

    <div id="saving-box-content">
      <div id="pdf">
        <img src="../static/assets/fontawesome-free-5.9.0-web/svgs/regular/file-pdf.svg" width="18" height="18">
        <br>
        <strong>PDF</strong>
        <br>
        <span class="is-size-7 ext-notes">
          مناسب للقراءة والطباعة <br>
          غير مناسب للتحرير لاحقًا
        </span>

      </div>
      <div id="html">
        <img src="../static/assets/fontawesome-free-5.9.0-web/svgs/regular/file-code.svg" width="18" height="18">
        <br>

        <strong>HTML</strong>
        <br>
        <span class="is-size-7 ext-notes">

          مناسب للتحرير لاحقًا
        </span>
      </div>
      <div id="docx">
        <img src="../static/assets/fontawesome-free-5.9.0-web/svgs/regular/file-word.svg" width="18" height="18">
        <br>
        <strong>DOCX</strong>
        <br>
        <span class="is-size-7 ext-notes">
          مناسب لفتح الملف في برنامج وورد.
        </span>
      </div>
    </div>
  </div>

        `
    ,
    focusConfirm: false,
    confirmButtonText:
      ' إلغاء الأمر',
  })

  document.getElementById('saving-box-content').addEventListener('click', (e) => {
    let chosenExt
    Swal.close();

    if (['pdf', 'html', 'docx'].includes(e.target.id)) {
      chosenExt = e.target.id;
    }

    // if chosenExt == null, means the user clicked away (did not choose ext)
    // then don't show saving window, don't save.
    if (chosenExt != null) {

      // when opening save window, open the window in desktop.
      let toLocalPath = path.resolve(app.getPath("desktop"));
      // show save dialog, and let user choose a location, and store the path.
      documentName = fileName.value;
      chosenPath = dialog.showSaveDialog({
        defaultPath: toLocalPath + "/" + documentName,
        "filters": [{
          "name": chosenExt,
          "extensions": [chosenExt]
        },],
      });
      // TODO-hard: if pdf, docx.
      if (chosenExt == 'html') {
        let fileContent = getEditorContent();

        // create a file in the chosen location, then write the file content in it
        try {
          fs.writeFile(chosenPath, fileContent, (err) => {
            showSuccessNote('حٌفظ المستند');
            setSavingStatus('الملف محفوظ', 'saved-file');
            change = new Delta();
            // put the name that user choose in saving dialog in fileName input in index.html.
            let FileNameWithExt = chosenPath.split('\\').pop();
            fileName.value = FileNameWithExt.substr(0, FileNameWithExt.indexOf('.')); ;
          });
        } catch (e) {
          showFailedNote('ثمة خلل.. تعذر حفظ المستند')
        }
      }
    }
  })
}

/* -------------------------------------------------------------------------- */


/* --------------------------------- auto-saving --------------------------------- */

quill.on('text-change', function (delta) {
  change = change.compose(delta);
  setSavingStatus('الملف غير محفوظ', 'unsaved-file')
});

// Save periodically
setInterval(function () {
  if (change.length() > 0 && chosenPath) {
    setSavingStatus('يجري الحفظ...', 'currently-saving')
    let fileContent = getEditorContent();

    fs.writeFile(chosenPath, fileContent, (err) => {

      if (err) {
        showFailedNote('ثمة خلل.. تعذر حفظ المستند');
        return;
      }
      setSavingStatus('الملف محفوظ', 'saved-file');

    });
    /* 
    Send partial changes
    $.post('/your-endpoint', { 
      partial: JSON.stringify(change) 
    });
    
    Send entire document
    $.post('/your-endpoint', { 
      doc: JSON.stringify(quill.getContents())
    });
    */
    change = new Delta();
  }
}, 5 * 1000);

// Check for unsaved data
window.onbeforeunload = function () {
  if (change.length() > 0) {
    return 'There are unsaved changes. Are you sure you want to leave?';
  }
}
/* -------------------------------------------------------------------------- */
