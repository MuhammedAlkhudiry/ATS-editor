
/* ------------------------- controlling main window ------------------------ */

document.getElementById('exit-icon').addEventListener('click', e => {
    if (change.length() > 0) {
        new Notification('unsaved-file').then(result => {
            // if result.value means 'yes' pressed, else no.
            if (result.value) {
                win.close();

                // make sure the app is closed.
                if (!win.isDestroyed()) win.destroy();
            }
        });
    }
    else {
        win.close();
    }
})
;
resizeIcon.addEventListener('click', e => {
    // switch between icons square and two squares
    if (win.isMaximized()) {
        win.unmaximize();
        resizeIcon.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24"><path d="M4,4H20V20H4V4M6,8V18H18V8H6Z"></path></svg>`;
    }
    else {
        win.maximize();
        resizeIcon.innerHTML =
            `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24"><path d="M4,8H8V4H20V16H16V20H4V8M16,8V14H18V6H10V8H16M6,12V18H14V12H6Z" /></svg>`;
    }
})
;

document.getElementById('min-icon').addEventListener('click', e => {
    win.minimize();
})
;

/* -------------------------------------------------------------------------- */

// When the user scrolls the page
textBox.addEventListener('scroll', e => {

    let Scroll = textBox.scrollTop;
    Scroll > 0
        ? (insertBar.style.boxShadow = '0px 1px 5px #00000020')
        : (insertBar.style.boxShadow = 'none');
})
;

/* -------------------------------------------------------------------------- */

document.addEventListener('dragenter', e => {
    textBox.opacity = '0.5';
})
;

/* -------------------------------------------------------------------------- */
let searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', e => {
    if (searchInput.value) {
        let totalText = quill.getText();
        let re = new RegExp(searchInput.value, 'g');
        let match = re.test(totalText);
        if (match) {
        }
        else {

        }
    }
    else {
    }
});