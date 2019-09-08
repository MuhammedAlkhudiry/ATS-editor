'use strict';

// custom fonts
const FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = [
    'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra', 'Noto-Naskh-Arabic'
];

Quill.register(FontAttributor, true);

// custom font sizes
const SizeAttributor = Quill.import('attributors/style/size');
SizeAttributor.whitelist = ['8px', '9px', '10px', '11px', '12px', '14px', '18px', '24px', '30px', '36px',
    '48px', '60px', '72px'];
Quill.register(SizeAttributor, true);

/* -------------------------------------------------------------------------- */

const Parchment = Quill.import('parchment');
const lineHeightConfig = {
    scope: Parchment.Scope.INLINE,
    whitelist: ['1.0', '1.2', '1.5', '2.0']
};

const lineHeightStyle = new Parchment.StyleAttributor('line-height', 'line-height', lineHeightConfig);
Quill.register(lineHeightStyle);


/* ----------------------------- custom modules ----------------------------- */
Quill.register('modules/Searcher', Searcher);
Quill.register('modules/better-table', quillBetterTable);
Quill.register('modules/blotFormatter', QuillBlotFormatter.default);

/* -------------------------------------------------------------------------- *

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
const toolbarModule = quill.getModule('toolbar');
const keyboardModule = quill.getModule('keyboard');
const quillEditor = document.getElementsByClassName('ql-editor')[0];
quillEditor.classList.add('zoom-100');

quill.insertText(0, 'احمد في المسجد');
// quill.insertText(22, 'أحُمد في المسجد');
// quill.insertText(44, 'أحمد في المسجد');

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