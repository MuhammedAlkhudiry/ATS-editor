class hadithBlot extends Inline {
    static create(hadithDetails) {
        let node = super.create();
        node.dataset.authenticity = hadithDetails.authenticity;
        node.dataset.collections = hadithDetails.collections;
        node.dataset.narrator = hadithDetails.narrator;
        node.dataset.hadithNumber = hadithDetails.hadithNumber;
        return node;
    }
}

hadithBlot.blotName = 'Hadith';
hadithBlot.className = 'ql-hadith';
hadithBlot.tagName = 'div';
