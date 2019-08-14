// Arabic punctuation handler
quill.on('text-change', function (delta, oldDelta, source) {

    if (delta.ops.length === 2) {
        const endRetain = delta.ops[0].retain;
        let ops = [];
        if (delta.ops[1].insert === ',') {
            ops = [
                {retain: endRetain},
                {insert: '،'},
                {delete: 1},
            ];
        }
        else if (delta.ops[1].insert === ';') {
            ops = [
                {retain: endRetain},
                {insert: '؛'},
                {delete: 1},
            ];
        }

        quill.updateContents({
            ops: ops
        });
    }
});

// handling typing after insert custom blots (Ayah, hadith...)
quill.on('text-change', function (delta, oldDelta, source) {

    if (delta.ops.length === 2) {
        const endRetain = delta.ops[0].retain;
        let ops = [];
        if (delta.ops[1].insert && delta.ops[1].attributes) {
            if (delta.ops[1].insert.length < 5) {
                if ('Ayah' in delta.ops[1].attributes) {
                    ops = [
                        {retain: endRetain},
                        {retain: 1, attributes: {Ayah: false}},
                    ];

                }
                else if ('Hadith' in delta.ops[1].attributes) {
                    ops = [
                        {retain: endRetain},
                        {retain: 1, attributes: {Hadith: false}},
                    ];
                }
                else if ('Misspell' in delta.ops[1].attributes) {
                    ops = [
                        {retain: endRetain},
                        {retain: 1, attributes: {Misspell: false}},
                    ];
                }
                quill.updateContents({
                    ops: ops
                });
            }
        }
    }
});
quill.on('text-change', function (delta, oldDelta, source) {

    if (delta.ops.length === 2) {
        const endRetain = delta.ops[0].retain;
        if (delta.ops[1].insert) {
            if (delta.ops[1].insert === ' ') {
                new PyRequest(quill.getText(), 'check-spell').get();
            }
        }
    }
});