'use strict';

/* --------------------------- import custom fonts -------------------------- */

var FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = [
    'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra'
];

Quill.register(FontAttributor, true);

/* -------------------------------------------------------------------------- */
 
const toolbarOptions = [
    [{ 'font': FontAttributor.whitelist }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

    [{ 'align': 'right' }, { 'align': 'center' }, { 'align': '' }, { 'align': 'justify' }],

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

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
const AutoLinks = require('quill-auto-links');
Quill.register('modules/autoLinks', AutoLinks.default);


/* -------------------------------------------------------------------------- */

let quill = new Quill('#editor', {
    // options
    // debug: 'info',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    // toolbar
    modules: {
        toolbar: '#toolbar-container',
        autoLinks: true
    },
});

let autoformat = new Autoformat(quill);
quill.format('direction', 'rtl');
quill.format('align', 'right');


document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});