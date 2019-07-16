'use strict';

const toolbarOptions = [
    [{ 'font': [] }],
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

let quill = new Quill('#editor', {
    // options
    debug: 'info',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    // toolbar
    modules: {
        toolbar: toolbarOptions
    },
});

quill.format('direction', 'rtl');
// quill.format('align', 'right');
