'use strict';

const Delta = Quill.import('delta');

/* --------------------------- import custom fonts -------------------------- */

var FontAttributor = Quill.import('formats/font');
FontAttributor.whitelist = [
    'dubai', 'alhurra', 'ArefRuqaa', 'Arial', 'Cairo', 'shiraz', 'ubuntu', 'zahra'
];

Quill.register(FontAttributor, true);

/* -------------------------------------------------------------------------- */

/* ---------------------------  custom module -------------------------- */
const AutoLinks = require('quill-auto-links');
Quill.register('modules/autoLinks', AutoLinks.default);


/* -------------------------------------------------------------------------- */

/* ----------------------------- custom modules ----------------------------- */

class Searcher {

    constructor(quill) {
        this.quill = quill;
        this.container = document.getElementById('search-container');
        document.getElementById('search').addEventListener('click', this.search);
        document.getElementById('replace').addEventListener('click', this.replace);
        document.getElementById('replace-all').addEventListener('click', this.replaceAll);
        // quill.on('text-change', this.update.bind(this));
        
    }
    
    
    search() {
        let SearchedString = document.getElementById('search-input').value;
        if (SearchedString) {
            document.getElementById('search-input').classList.add('is-success')
            document.getElementById('search-input').classList.remove('is-danger')


            let totalText = quill.getText();
            let re = new RegExp(SearchedString, "g");
            let match = re.test(totalText);
            if (match) {
                let indices = Searcher.occurrencesIndices = totalText.getIndicesOf(SearchedString);
                let length = Searcher.SearchedStringLength = SearchedString.length;
                
                indices.forEach(index => quill.formatText(index, length, 'SearchedString', true));
                
            } else {
                document.getElementById('search-input').classList.add('is-danger')
                document.getElementById('search-input').classList.remove('is-success')

            }

        } else {

            if (!indices.isEmpty()) {
                indices.forEach(index => quill.formatText(index, length, 'SearchedString', false));                
            }
            Searcher.occurrencesIndices = null;
            Searcher.currentIndex = 0;
        }
    }
    replace() {
        let oldString = document.getElementById('search-input').value; 
        let newString = document.getElementById('replace-input').value; 
        
        quill.deleteText(Searcher.occurrencesIndices[Searcher.currentIndex], oldString.length);
        quill.insertText(Searcher.occurrencesIndices[Searcher.currentIndex], newString);

        Searcher.currentIndex++;

    }

    replaceAll() {
        let oldStringLen = document.getElementById('search-input').value.length; 
        let newString = document.getElementById('replace-input').value;

        Searcher.occurrencesIndices.forEach(index => {
            quill.deleteText(index, oldStringLen);
            quill.insertText(index, newString);
        })
    }
}


Searcher.occurrencesIndices = [];
Searcher.currentIndex = 0;
Searcher.SearchedStringLength = null;


Quill.register('modules/Searcher', Searcher);

/* -------------------------------------------------------------------------- */

/* ----------------------------- custom styling ----------------------------- */

let Inline = Quill.import('blots/inline');

class SearchedStringBlot extends Inline {

    static create(value) {
        let node = super.create(value)
        node.contentEditable = 'false';
        return node
    }

    // necessary for styling using tagName = span;
    // formats() {
    //     return SearchedStringBlot.tagName
    // }

}

SearchedStringBlot.blotName = 'SearchedString';
SearchedStringBlot.className = 'ql-searched-string';
SearchedStringBlot.tagName = 'div';

Quill.register(SearchedStringBlot);

// class SpellingErrorBlot extends Inline { }
// ItalicBlot.blotName = 'italic';
// ItalicBlot.tagName = 'em';

// Quill.register(ItalicBlot);

/* -------------------------------------------------------------------------- */

let quill = new Quill('#editor', {
    // options
    debug: 'warning',
    placeholder: 'ما يلفظ من قول إلا لديه رقيب عتيد..',
    theme: 'snow',
    // toolbar
    modules: {
        toolbar: '#toolbar-container',
        autoLinks: true,
        Searcher: true
    },
});

quill.format('direction', 'rtl');
quill.format('align', 'right');


quill.insertText(0, 'لا إله إلا اللهلا إله إلا اللهلا إله إلا الله');
quill.insertText(0, 'لا إله إلا اللهلا إله إلا اللهلا إله إلا الله');
// quill.formatText(0, 4, 'SearchedString', true);