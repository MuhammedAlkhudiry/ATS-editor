'use strict';

const autoformat = require('../quill/custom-modules/quill-autoformat');

/* --------------------------- import custom fonts -------------------------- */

var FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = [
    'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra'
];

Quill.register(FontAttributor, false);

/* -------------------------------------------------------------------------- */
 
const toolbarOptions = [
    [{ 'font': FontAttributor.whitelist }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

    [{ 'align': 'right' }, { 'align': 'center' }, { 'align': '' }, { 'align': 'justify' }],

    ['bold', 'italic', 'underline', 'strike', 'line-height'],        // toggled buttons

    ['clean'],                                   // remove formatting button

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    ['blockquote', 'code-block'],
    ['link', 'image', 'video']

];


/* ---------------------------  custom module -------------------------- */

// var autoformat = Quill.import('../quill/custom-modules/quill-autoformat');
Quill.register('modules/autoformat', autoformat);

/* -------------------------------------------------------------------------- */

let quill = new Quill('#editor', {
    // options
    debug: 'info',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    // toolbar
    modules: {
        toolbar: toolbarOptions,
        autoformat: true
    },
});

quill.format('direction', 'rtl');
quill.format('align', 'right');

