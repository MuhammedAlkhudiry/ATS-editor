'use strict';

const createCustomAttributes = () => {
    const Parchment = Quill.import('parchment');
    const FontAttributor = Quill.import('formats/font');
    const SizeAttributor = Quill.import('attributors/style/size');

    // custom fonts
    FontAttributor.whitelist = [
        'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra',
        'Noto-Naskh-Arabic'
    ];

    // custom font sizes
    SizeAttributor.whitelist =
        ['8px', '9px', '10px', '11px', '12px', '14px', '18px', '24px', '30px', '36px',
            '48px', '60px', '72px'];

    // line-height
    const LineHeightStyle = new Parchment.StyleAttributor('line-height', 'line-height', {
        scope: Parchment.Scope.INLINE,
        whitelist: ['1.0', '1.2', '1.5', '2.0']
    });

    return [FontAttributor, SizeAttributor, LineHeightStyle];

};

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
Quill.register(PageBreakerBlot);
Quill.register(DividerBlot);

/* -------------------------------------------------------------------------- */

/* ----------------------------- custom attributes ----------------------------- */

const [FontAttributor, SizeAttributor, LineHeightStyle] = createCustomAttributes();

Quill.register(FontAttributor);
Quill.register(SizeAttributor);
Quill.register(LineHeightStyle);

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

// quill.insertText(0, 'صلى الله عليه وسلم');
// quill.insertText(22, 'أحُمد في المسجد');
// quill.insertText(44, 'أحمد في المسجد');
// tableModule.insertTable(3, 3);


// for pagination
// setInterval(() => {
//     let sum = Array.from(textBox.querySelectorAll('p')).map(para => {
//         return para.clientHeight;
//     }).reduce((a, b) => a + b, 0);
//
//     console.log(sum);
// }, 1000);