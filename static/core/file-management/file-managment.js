'use strict';

let documentName = "اسم المستند الجديد";
const fs = require('fs')
const Swal = require('sweetalert2')
/* -------------------------------- file name ------------------------------- */
let fileName = document.getElementById('file-name');
let fileNameValidationImg = document.getElementById('file-name-valid-img');
fileName.addEventListener('input', e => {
    if (fileName.value.length > 0) {
        fileName.style.border = '1.5px #03c751 solid';
        fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/check.svg'
    }
    else {
        fileName.style.border = '1.5px #eb1d1d solid';
        fileNameValidationImg.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/solid/times.svg'
    }
    
})

fileName.addEventListener('focusout', e => {
    fileName.removeAttribute('style');
})
/* -------------------------------------------------------------------------- */

