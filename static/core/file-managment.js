let documentName = "اسم المستند الجديد";
const fs = require('fs')
const Swal = require('sweetalert2')
/* -------------------------------- file name ------------------------------- */
let fileName = document.getElementById('file-name');
let fileNameValidationImg = document.getElementById('file-name-valid-img');
fileName.addEventListener('input', e => {
    if (fileName.value.length > 0) {
        fileName.style.border = '1.5px #04df5b solid'
        fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/check.svg'
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            type: 'error',
            confirmButtonText: 'Cool'
        })
    }
    else {
        fileName.style.border = '1.5px #eb1d1d solid'
        fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/times.svg'
    }
})

fileName.addEventListener('focusout', e => {

    fileName.removeAttribute('style');
})
/* -------------------------------------------------------------------------- */

/* --------------------------------- saving --------------------------------- */

// document.getElementById('save-icon').addEventListener('click', saveFile);

// function saveFile(e) {
//     // TODO check if file saved before or not.

//     let chosenExt

//     // if chosenExt == null, means the user clicked away (did not choose ext)
//     // then don't show saving window, don't save.
//     if (chosenExt != null) {

//         // when opening save window, open the window in desktop.
//         var toLocalPath = path.resolve(app.getPath("desktop"));
//         var ChosenPath = dialog.showSaveDialog({
//             defaultPath: toLocalPath + "/" + documentName,
//             "filters": [{
//                 "name": chosenExt,
//                 "extensions": [chosenExt]
//             },],
//         });
//         // show save dialog, and let user choose a location, and store the path.
//         let fileContent = textBox.innerHTML;

//         // create a file in the chosen location, then write the file content in it
//         try {
//             fs.writeFileSync(ChosenPath, fileContent);
//         } catch (e) {
//             alert('Failed to save the file !');
//         }

//     })

// }

/* -------------------------------------------------------------------------- */


/* --------------------------------- auto-saving --------------------------------- */
let savingStatusText = document.getElementById('saving-status-text');
let chosenPath;
// Store accumulated changes
var change = new Delta();

quill.on('text-change', function (delta) {
    change = change.compose(delta);
});

// Save periodically
setInterval(function () {
    if (change.length() > 0 && chosenPath) {
        savingStatusText.innerText = 'يجري الحفظ...'
        savingStatusText.classList.add('currently-saving');

        try {
            fs.writeFile(ChosenPath, quill.innerHTML, (err) => {

                savingStatusText.innerText = 'الملف محفوظ'
                savingStatusText.className.replace('currently-saving', 'saved-file');

            });
        } catch (e) {
            alert('Failed to save the file !');
        }
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

/* ------------------------------ opening  file ----------------------------- */
document.getElementById('open-file-icon').addEventListener('click', openFile);

function openFile(e) {
    let options = {
        defaultPath: path.resolve(app.getPath("desktop")),

        filters: [{
            name: 'html',
            extensions: ['htm', 'html']
        },],
        properties: ['openFile']
    }
    let ChosenFilePath
    try {
        ChosenFilePath = dialog.showOpenDialog(options)[0]
    } catch (error) {
        ChosenFilePath = null;
    }
    if (ChosenFilePath != null) {
        fs.readFile(ChosenFilePath, 'utf8', function (err, data) {
            if (err) return console.log(err);
            textBox.innerHTML = data;
        });
    }

}
/* -------------------------------------------------------------------------- */

/* -------------- open file by drag-drop from operating system -------------- */

document.getElementById('grid-container').addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let docFile = "application/msword";
    let docxFile = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    for (let f of e.dataTransfer.files) {
        if (f.type == "text/html") {
            // send to main.js (main process).
            ipcRenderer.send('ondragstart', f.path)
            // receive from main.js the file data.
            ipcRenderer.on('fileData', (event, data) => {
                textBox.innerHTML = data;
            })

        } else if (f.type == docFile || f.type == docxFile) {
            // convert from doc/docx to html then send to main process TODO
            // ipcRenderer.send('ondragstart', f.path)
        } else if (f.type == "image/jpeg" || f.type == "image/png") {
            // add ability to insert imgs, TODO.
            textBox.focus();
        } else {
            // change the alert TODO
            alert("صيفة الملف غير مقبولة")
        }
    }
});

/* -------------------------------------------------------------------------- */

