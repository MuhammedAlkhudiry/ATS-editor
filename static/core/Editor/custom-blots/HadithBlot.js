const Inline = Quill.import('blots/inline');

class hadithBlot extends Inline {
}

hadithBlot.blotName = 'Hadith';
hadithBlot.className = 'ql-hadith';
hadithBlot.tagName = 'div';

module.exports = hadithBlot;