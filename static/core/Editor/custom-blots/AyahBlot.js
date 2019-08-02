const Inline = Quill.import('blots/inline');

class AyahBlot extends Inline {
}

AyahBlot.blotName = 'Ayah';
AyahBlot.className = 'ql-ayah';
AyahBlot.tagName = 'div';

module.exports = AyahBlot;