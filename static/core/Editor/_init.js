'use strict';

/* --------------------------- import custom fonts -------------------------- */

const FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = [
    'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra', 'Noto-Naskh-Arabic'
];

Quill.register(FontAttributor, true);

/* -------------------------------------------------------------------------- */

/* ----------------------------- custom modules ----------------------------- */
Quill.register('modules/Searcher', Searcher);
Quill.register('modules/better-table', quillBetterTable);
Quill.register('modules/blotFormatter', QuillBlotFormatter.default);

/* -------------------------------------------------------------------------- */

/* ----------------------------- custom blots ----------------------------- */

Quill.register(SearchedStringBlot);
Quill.register(SpellingErrorBlot);
Quill.register(AyahBlot);
Quill.register(hadithBlot);
Quill.register(PoetryBlot);

/* -------------------------------------------------------------------------- */

const quill = new Quill('#editor', {
    // options
    debug: 'warning',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    modules: {
        toolbar: {
            container: '#toolbar-container'
        },
        Searcher: true,
        table: false,
        'better-table': {
            operationMenu: {}
        },
        blotFormatter: {},
        history: {
            delay: 4000,
            maxStack: 500,
        },
    },
    keyboard: {
        bindings: quillBetterTable.keyboardBindings
    },
});


quill.format('direction', 'rtl');
quill.format('align', 'right');

const tableModule = quill.getModule('better-table');
const toolbar = quill.getModule('toolbar');
const quillEditor = document.getElementsByClassName('ql-editor')[0];

quill.insertText(0, 'محمد في المسجد');

// for pagination
// setInterval(() => {
//     let sum = Array.from(textBox.querySelectorAll('p')).map(para => {
//         return para.clientHeight;
//     }).reduce((a, b) => a + b, 0);
//
//     console.log(sum);
// }, 1000);


// todo: for styling tables
quillEditor.addEventListener('mouseup', evt => {
    let selectedCells = EditorHelper.tableSelectedCells;
});