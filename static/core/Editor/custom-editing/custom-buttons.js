const copyFormatBtn = document.querySelector('.ql-copy-format');
const undoBtn = document.querySelector('.ql-undo');
const redoBtn = document.querySelector('.ql-redo');
const objectBackgroundColor = document.querySelector('.ql-object-background-color');

/* ----------------------------- custom buttons ----------------------------- */

undoBtn.addEventListener('click', e => quill.history.undo());
redoBtn.addEventListener('click', e => quill.history.redo());

copyFormatBtn.addEventListener('click', e => {
    let range = quill.getSelection();
    // no selection
    if (range.length === 0) return;
    EditorHelper.isFormatCopied = true;
    EditorHelper.copiedFormat = quill.getFormat(range.index, range.length);
    copyFormatBtn.classList.add('ql-active');
});

quill.on('selection-change', () => {
    let range = quill.getSelection();
    // no selection
    if (range)
        if (range.length && EditorHelper.isFormatCopied) {
            quill.formatText(range.index, range.length, EditorHelper.copiedFormat);
            EditorHelper.isFormatCopied = false;
            EditorHelper.copiedFormat = null;
            copyFormatBtn.classList.remove('ql-active');
            textBox.style.cursor = `auto`;
        }
});

/* -------------------------------------------------------------------------- */
