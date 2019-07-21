let electronLocalshortcut = require('electron-localshortcut');


/* -------------------------------- shortcuts ------------------------------- */

/* ----------------------------- new, save, open ---------------------------- */

electronLocalshortcut.register(win, 'Ctrl+N', () => {
  createNewFile();
});

electronLocalshortcut.register(win, 'Ctrl+S', () => {
  saveFile();
});

electronLocalshortcut.register(win, 'Ctrl+O', () => {
  openFile()
});
/* -------------------------------------------------------------------------- */

electronLocalshortcut.register(win, 'Ctrl+F', () => {
  searchFile();
});

electronLocalshortcut.register(win, 'Ctrl+Enter', () => {
  newPage()
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
  }
});

electronLocalshortcut.register(win, 'Ctrl+L', () => {
  quill.format('align', 'left');
});

// electronLocalshortcut.register(win, 'Ctrl+Space', () => {
//   editSelectedText("removeFormat");
// });

electronLocalshortcut.register(win, 'Ctrl+Q', () => {
  quill.format('clean');
});
  /* -------------------------------------------------------------------------- */
