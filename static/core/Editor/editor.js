'use strict';

const Delta = Quill.import('delta');

/* --------------------------- import custom fonts -------------------------- */

const FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = [
    'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra',
];

Quill.register(FontAttributor, true);

/* -------------------------------------------------------------------------- */
/* ----------------------------- custom modules ----------------------------- */
const Searcher = require('./../static/core/Editor/custom-modules/Searcher');

Quill.register('modules/Searcher', Searcher);

/* -------------------------------------------------------------------------- */

/* ----------------------------- custom styling ----------------------------- */

const SearchedStringBlot = require('./../static/core/Editor/custom-blots/SearchBlot');
const SpellingErrorBlot = require('./../static/core/Editor/custom-blots/SpellingErrorBlot');
const AyahBlot = require('./../static/core/Editor/custom-blots/AyahBlot');

Quill.register(SearchedStringBlot);
Quill.register(SpellingErrorBlot);
Quill.register(AyahBlot);

/* -------------------------------------------------------------------------- */

const quill = new Quill('#editor', {
    // options
    debug: 'warning',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    // toolbar
    modules: {
        toolbar: '#toolbar-container',
        Searcher: true,
    },
});

quill.format('direction', 'rtl');
quill.format('align', 'right');


quill.insertText(0, 'لا نعم لا نعم');
// quill.insertText(0, '﴿ لا نعم لا نعم ﴾', 'Ayah', true);

// quill.formatText(0, 11, 'Misspell', true);