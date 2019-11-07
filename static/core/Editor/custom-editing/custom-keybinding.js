// for undo, redo.
quillEditor.addEventListener('keydown', e => {
    if (e.key === 'Z' && e.ctrlKey === true) {
        e.preventDefault();
        e.stopPropagation();
        undoBtn.click();
    } else if (e.key === 'Y' && e.ctrlKey === true) {
        e.preventDefault();
        e.stopPropagation();
        redoBtn.click();
    }

});

// always scroll to caret position
quillEditor.addEventListener('keydown', e => {
    EditorHelper.scrollToCaret();
});

// auto-complete menu

keyboardModule.addBinding({
    key: ' ',
    collapsed: true,
    format: {list: false},  // ...on an line that's not already a list
    prefix: /[\u0660-\u0669]/,            // ...following a arabic number
    offset: 1,                // ...at the 1st position of the line,
    handler: (range, context) => {
        // the space character is consumed by this handler
        // so we only need to delete the hyphen
        quill.deleteText(range.index - 1, 1);
        // apply bullet formatting to the line
        quill.formatLine(range.index, 1, 'list', 'ordered');
        // restore selection
        quill.setSelection(range.index - 1);
    }
});

keyboardModule.addBinding({
    key: ' ',
    collapsed: true,
    prefix: /صلى الله عليه وسلم/,            // ...following a arabic number
    handler: (range, context) => {
        let change = [
            {insert: 'ﷺ '},
            {delete: 'صلى الله عليه وسلم'.length},
        ];

        if (range.index !== 'صلى الله عليه وسلم'.length) change.unshift({retain: range.index - 18});

        quill.updateContents({
            ops: change
        });
    }
});

keyboardModule.addBinding({
    key: ',',
    collapsed: true,
    shiftKey: null,
    format: {align: 'right', direction: 'rtl'},
    handler: (range) => {
        quill.insertText(range.index, ArabicHelper.COMMA);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});

keyboardModule.addBinding({
    key: ';',
    collapsed: true,
    shiftKey: null,
    format: {align: 'right', direction: 'rtl'},
    handler: (range) => {
        quill.insertText(range.index, ArabicHelper.SEMI_COMMA);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});


keyboardModule.addBinding({
    key: '1',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '2',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '3',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '4',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '5',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '6',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '7',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '8',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});
keyboardModule.addBinding({
    key: '9',
    collapsed: true,
    format: {align: 'right', direction: 'rtl'},
    handler: (range, context) => {
        const pressedNumber = context.event.key;
        quill.insertText(range.index, ArabicHelper.NUMBERS[pressedNumber]);
        // restore selection
        quill.setSelection(range.index + 1);
    }
});