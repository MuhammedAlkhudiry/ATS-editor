const copyFormatBtn = document.querySelector('.ql-copy-format');
const undoBtn = document.querySelector('.ql-undo');
const redoBtn = document.querySelector('.ql-redo');
const pageBreakerBtn = document.querySelector('.ql-page-breaker-btn');
const dividerBtn = document.querySelector('.ql-divider-btn');

/* ----------------------------- custom buttons ----------------------------- */


undoBtn.addEventListener('click', e => quill.history.undo());
redoBtn.addEventListener('click', e => quill.history.redo());

pageBreakerBtn.addEventListener('click', e => {
    quill.insertEmbed(quill.getSelection(true).index, 'PageBreaker', true, Quill.sources.USER);
    EditorHelper.insertEmptyLineIn();

});
dividerBtn.addEventListener('click', e => {
    quill.insertEmbed(quill.getSelection(true).index, 'Divider', true, Quill.sources.USER);
    EditorHelper.insertEmptyLineIn();
});


copyFormatBtn.addEventListener('click', e => {
    const range = quill.getSelection();
    if (range.length === 0) return;
    EditorHelper.isFormatCopied = true;
    EditorHelper.copiedFormat = quill.getFormat(range.index, range.length);
    copyFormatBtn.classList.add('ql-active');
    textBox.style.cursor = `pointer`;
});

quill.on('selection-change', () => {
    const range = quill.getSelection();

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
