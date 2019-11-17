/* ----------------------------- new, save, open ---------------------------- */

electronLocalshortcut.register(win, 'Ctrl+N', () => {
    fileManager.createNewFile();
});

electronLocalshortcut.register(win, 'Ctrl+S', () => {
    fileManager.saveAsHTML();
});

electronLocalshortcut.register(win, 'Ctrl+O', () => {
    fileManager.openFile();
});
/* -------------------------------------------------------------------------- */

electronLocalshortcut.register(win, 'Ctrl+F', () => {
    document.getElementById('search-replace').click();
    quill.blur();
    setTimeout(() => {
        document.getElementById('search-input').focus();
    }, 200);

});

electronLocalshortcut.register(win, 'Ctrl+J', () => {
    quill.format('align', 'justify');
});
electronLocalshortcut.register(win, 'Ctrl+E', () => {
    quill.format('align', 'center');
});

electronLocalshortcut.register(win, 'Ctrl+R', () => {
    // because Ctrl+R is to reload the browser, so we need to disable it.
    onkeydown = e => {
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            quill.format('align', 'right');
        }
    };
});

electronLocalshortcut.register(win, 'Ctrl+L', () => {
    quill.format('align', 'left');
});

electronLocalshortcut.register(win, 'Ctrl+Space', () => {
  quill.format('clean');
});

electronLocalshortcut.register(win, 'Ctrl+Q', () => {
    quill.format('clean');
});
/* -------------------------------------------------------------------------- */
