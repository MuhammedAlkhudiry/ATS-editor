class hadithBlot extends Inline {
    static create(hadithDetails) {
        let node = super.create();
        node.dataset.authenticity = hadithDetails.authenticity;
        node.dataset.collections = hadithDetails.collections;
        node.dataset.narrator = hadithDetails.narrator;
        node.dataset.hadithNumber = hadithDetails.hadithNumber;
        tippy(node, {
            content: ` رقم الحديث: ${node.dataset.hadithNumber} <br> رواه ${node.dataset.collections} <br> الراوي: ${node.dataset.narrator} <br> صحة الحديث: ${node.dataset.authenticity}`,
        });
        return node;
    }
}

hadithBlot.blotName = 'Hadith';
hadithBlot.className = 'ql-hadith';
hadithBlot.tagName = 'div';
