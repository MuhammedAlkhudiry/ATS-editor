// Arabic punctuation handler
quill.on('text-change', function (delta, oldDelta, source) {
    if (delta.ops.length !== 2 && !delta.ops[0].insert) return;
    // if no text inserted, return.
    if (delta.ops.length === 2)
        if (!delta.ops[1].insert && !delta.ops[0].insert) return;

    TypingHandler.ops = [];
    TypingHandler.setPreviousTextLen(delta);
    // if comma is entered
    if (TypingHandler.isInsertedCharEquals(delta, ',')) {
        TypingHandler.setOps(null, TypingHandler.previousTextLen, '،', 1);
    }

    //if semi-comma is entered
    else if (TypingHandler.isInsertedCharEquals(delta, ';')) {
        TypingHandler.setOps(null, TypingHandler.previousTextLen, '؛', 1);
    }

    // if صلى الله عليه وسلم is entered
    //    todo: بقية العبارات
    else if (TypingHandler.isLastCharsEquals(oldDelta, 18, 'صلى الله عليه وسلم')) {
        if (TypingHandler.previousTextLen > 18)
            TypingHandler.setOps(null, TypingHandler.previousTextLen - 18, 'ﷺ', 18);
        else
            TypingHandler.setOps(null, null, 'ﷺ', 18);
    }

    // if number is entered, replace it with arabic numbers
    else if (TypingHandler.isInsertedCharNumber(delta)) {
        // todo: if in settings
        let insertedNumber = delta.ops[1].insert || delta.ops[0].insert;

        TypingHandler.setOps(null, TypingHandler.previousTextLen, ArabicHelper.NUMBERS[insertedNumber], 1);
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
            EditorHelper.format('check-spell', quill.getText());
        }
    }
});

// handling direction
quill.on('text-change', function (delta, oldDelta, source) {

    // is user selected all line then write first char
    if (delta.ops.length === 2)
        if (!delta.ops[1].delete) return;
        else if (delta.ops[1].delete !== oldDelta.ops[0].insert.trim().length) return;

    if (delta.ops[0].insert) {
        if (delta.ops[0].insert.match(/[\u0600-\u06FF]/)) {
            let currentFormat = quill.getFormat();
            if (currentFormat.align !== 'right' && currentFormat.direction !== 'rtl') {
                quill.format('direction', 'rtl');
                quill.format('align', 'right');
            }
        }
        else if (delta.ops[0].insert.match(/[A-Za-z]/)) {
            let currentFormat = quill.getFormat();
            if (currentFormat.align !== 'left' && currentFormat.direction !== 'ltr') {
                quill.format('direction', false);
                quill.format('align', false);
            }
        }
    }
});
// new PyRequest(quill.getText(), 'check-spell').get();
