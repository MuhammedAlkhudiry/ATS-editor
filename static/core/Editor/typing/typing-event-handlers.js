// handling typing after insert custom blots (Ayah, hadith...)
quill.on('text-change', function (delta, oldDelta, source) {

    if (delta.ops.length > 4 || source !== 'user') return; // if paste or change from API return.

    let insertedOp;
    if ((insertedOp =
        EditorHelper.getInsertedText(delta)).isEmpty() || EditorHelper.isLTR(quill.getFormat())) return;

    let change = {
        retain: delta.ops[0].retain
    };

    if (insertedOp.attributes && insertedOp.length < 5) {
        if ('Ayah' in insertedOp.attributes) {
            change = {...change, Ayah: false};
        } else if ('Hadith' in insertedOp.attributes) {
            change = {...change, Hadith: false};
        } else if ('Misspell' in insertedOp.attributes) {
            change = {...change, Misspell: false};
        }
        let ops = [
            change.retain,
            change[1],
        ];
        quill.updateContents({
            ops: ops
        });
    }
});


// quill.on('text-change', function (delta, oldDelta, source) {
//     if (delta.ops.length !== 2) return;
//
//     if (delta.ops[1].insert) {
//         if (TypingHandler.isInsertedCharEquals(delta, ' ')) {
//             EditorHelper.format('check-spell', quill.getText());
//         }
//     }
// });

// handling direction
quill.on('text-change', function (delta, oldDelta, source) {
    if (delta.ops.length > 4 || source !== 'user') return; // if paste or change from API return.

    let insertedOp;
    if ((insertedOp = EditorHelper.getInsertedText(delta)).isEmpty()) return;

    const insertedText = insertedOp[0].insert;

    if (insertedText.match(/[\u0600-\u06FF]/)) {

        if (EditorHelper.isLTR(quill.getFormat())) {
            EditorHelper.setToRTL();
        }

    } else if (insertedText.match(/[A-Za-z]/)) {

        if (EditorHelper.isRTL(quill.getFormat())) {
            EditorHelper.setToLTR();
        }
    }
});
// new PyRequest(quill.getText(), 'check-spell').get();

