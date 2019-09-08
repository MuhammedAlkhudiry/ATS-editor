/* ----------------------------- custom handlers ----------------------------- */

// this is for fixing direction, since It's not working for some reason.
toolbarModule.addHandler('direction', () => {
    let currentFormat = quill.getFormat();
    if (currentFormat.align !== 'right' && currentFormat.direction !== 'rtl') {
        quill.format('direction', 'rtl');
        quill.format('align', 'right');
    } else if (currentFormat.align !== 'left' && currentFormat.direction !== 'ltr') {
        quill.format('direction', false);
        quill.format('align', false);
    }
});

/* -------------------------------------------------------------------------- */
