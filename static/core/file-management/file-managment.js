'use strict';

let documentName = "اسم المستند الجديد";
const fs = require('fs')
const Swal = require('sweetalert2')
/* -------------------------------- file name ------------------------------- */
let fileName = document.getElementById('file-name');
let fileNameValidationImg = document.getElementById('file-name-valid-img');
fileName.addEventListener('input', e => {
    if (fileName.value.length > 0) {
        fileName.className = 'valid-file-name';
        fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/check.svg'
    }
    else {
        fileName.className = 'unvalid-file-name';
        fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/times.svg'
    }
})

fileName.addEventListener('focusout', e => {
    fileName.removeAttribute('style');
})
/* -------------------------------------------------------------------------- */

/* -------------------------------- new file -------------------------------- */
document.getElementById('new-file-icon').addEventListener('click', createNewFile)

function createNewFile(e) {

    if (change.length() > 0) {

        Swal.fire({
            title: 'الملف غير محفوظ. هل أنت متأكد؟',
            type: 'question',
            customClass: {
                icon: 'swal2-arabic-question-mark'
            },
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا',
            showCancelButton: true,
            showCloseButton: true

        }).then((result) => {

            if (result.value) {
                const newFileNote = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                newFileNote.fire({
                    type: 'info',
                    title: 'ملف جديد'
                });

                cleanFile();
                showSuccessNote('ملف جديد')
            }
        })

    } else {
        cleanFile()
        showSuccessNote('ملف جديد')
    }
}

/* -------------------------------------------------------------------------- */
