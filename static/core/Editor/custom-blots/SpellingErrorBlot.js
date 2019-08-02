const Inline = Quill.import('blots/inline');

 class SpellingErrorBlot extends Inline {
};

SpellingErrorBlot.blotName = 'Misspell';
SpellingErrorBlot.className = 'ql-mis-spell';
SpellingErrorBlot.tagName = 'div';

module.exports = SpellingErrorBlot;