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
/* ----------------------------- custom handlers ----------------------------- */

// this is for fixing direction, since It's not working for some reason.
const directionHandler = () => {
    let currentFormat = quill.getFormat();
    if (currentFormat.align !== 'right' && currentFormat.direction !== 'rtl') {
        quill.format('direction', 'rtl');
        quill.format('align', 'right');
    }
    else if (currentFormat.align !== 'left' && currentFormat.direction !== 'ltr') {
        quill.format('direction', false);
        quill.format('align', false);
    }
};

/* -------------------------------------------------------------------------- */

const quill = new Quill('#editor', {
    // options
    debug: 'warning',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    modules: {
        toolbar: {
            container: '#toolbar-container',
            handlers: {
                'direction': directionHandler
            }
        },
        Searcher: true,
        table: false,
        'better-table': {
            operationMenu: {
                items: {
                    unmergeCells: {
                        text: 'Another unmerge cells name'
                    }
                }
            }
        },
        blotFormatter: {},
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
        },
        clipboard: true,
    },
    keyboard: {
        bindings: quillBetterTable.keyboardBindings
    },
});

/* ----------------------------- custom buttons ----------------------------- */

// this is for fixing direction, since It's not working for some reason.
document.querySelector('.ql-undo').addEventListener('click', e => quill.history.undo());
document.querySelector('.ql-redo').addEventListener('click', e => quill.history.redo());
document.querySelector('.ql-copy-format').addEventListener('click', e => {
});

/* -------------------------------------------------------------------------- */


quill.format('direction', 'rtl');
quill.format('align', 'right');

const tableModule = quill.getModule('better-table');

quill.insertText(0, 'محمد في المسجد');

// for pagination
// setInterval(() => {
//     let sum = Array.from(textBox.querySelectorAll('p')).map(para => {
//         return para.clientHeight;
//     }).reduce((a, b) => a + b, 0);
//
//     console.log(sum);
// }, 1000);
