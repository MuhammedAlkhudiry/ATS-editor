// Arabic punctuation handler
quill.on('text-change', function (delta, oldDelta, source) {

    if (delta.ops.length !== 2) return;

    TypingHandler.ops = [];
    TypingHandler.setPreviousTextLen(delta);
    if (TypingHandler.isInsertedCharEquals(delta, ',')) {
        TypingHandler.setOps(null, TypingHandler.previousTextLen, '،', 1);
    }
    else if (TypingHandler.isInsertedCharEquals(delta, ';')) {
        TypingHandler.setOps(null, TypingHandler.previousTextLen, '؛', 1);
    }
    else if (TypingHandler.isLastCharsEquals(oldDelta, 18, 'صلى الله عليه وسلم')) {
        if (TypingHandler.previousTextLen > 18)
            TypingHandler.setOps(null, TypingHandler.previousTextLen - 18, 'ﷺ', 18);
        else
            TypingHandler.setOps(null, null, 'ﷺ', 18);

    }

    quill.updateContents({
        ops: TypingHandler.ops
    });
});

// handling typing after insert custom blots (Ayah, hadith...)
quill.on('text-change', function (delta, oldDelta, source) {

    if (delta.ops.length !== 2) return;

    TypingHandler.setPreviousTextLen(delta);
    TypingHandler.ops = [];

    if (delta.ops[1].insert && delta.ops[1].attributes) {
        if (delta.ops[1].insert.length < 5) {
            if ('Ayah' in delta.ops[1].attributes) {
                TypingHandler.setOps({Ayah: false}, TypingHandler.previousTextLen);
            }
            else if ('Hadith' in delta.ops[1].attributes) {
                TypingHandler.setOps({Hadith: false}, TypingHandler.previousTextLen);
            }
            else if ('Misspell' in delta.ops[1].attributes) {
                TypingHandler.setOps({Misspell: false}, TypingHandler.previousTextLen);
            }
            quill.updateContents({
                ops: TypingHandler.ops
            });
        }
    }
});

quill.on('text-change', function (delta, oldDelta, source) {
    if (delta.ops.length !== 2) return;

    if (delta.ops[1].insert) {
        if (TypingHandler.isInsertedCharEquals(delta, ' ')) {
            // new PyRequest(quill.getText(), 'check-spell').get();
        }
    }
});
