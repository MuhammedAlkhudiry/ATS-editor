/* ------------------------- controlling main window ------------------------ */
const ExitIcons = document.getElementsByClassName('exit-icon');

[...ExitIcons].forEach(icon => icon.addEventListener('click', e => {
        if (change.length() === 0) {
            win.close();
        } else
            new AlertHelper('unsaved-file').then(result => {
                // if result.value means 'yes' pressed, else no.
                if (result.value) {
                    win.close();
                }
            });

        // make sure the app is closed.
        if (!win.isDestroyed()) win.destroy();
    }));

win.on('unmaximize', e => resizeIcon.innerHTML =
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24"><path d="M4,4H20V20H4V4M6,8V18H18V8H6Z"></path></svg>`);
win.on('maximize', e => resizeIcon.innerHTML =
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24"><path d="M4,8H8V4H20V16H16V20H4V8M16,8V14H18V6H10V8H16M6,12V18H14V12H6Z" /></svg>`);

resizeIcon.addEventListener('click', e => (win.isMaximized()) ? win.unmaximize() : win.maximize());

document.getElementById('min-icon').addEventListener('click', e => win.minimize());


/* -------------------------------------------------------------------------- */

// When the user scrolls the page
textBox.addEventListener('scroll', e => textBox.scrollTop > 0 ? (advancedToolbarBar.style.boxShadow = '0px 1px 8px #00000035') :
    (advancedToolbarBar.style.boxShadow = 'none'));

/* -------------------------------------------------------------------------- */

document.addEventListener('dragenter', e => textBox.opacity = '0.5');

/* -------------------------------------------------------------------------- */
