let path = require('path');
const remote = require("electron").remote;
const { ipcRenderer } = require('electron')
let win = remote.getCurrentWindow();
let dialog = remote.dialog;
let app = remote.app;
let documentName = "اسم المستند الجديد";

/* ------------------------------ DOM variables ----------------------------- */


/* -------------------------------------------------------------------------- */

const resizeIcon = document.getElementById("resize-icon");

/* -------------------------------- main bar -------------------------------- */

/* ------------------------- controlling main window ------------------------ */


document.getElementById("exit-icon").addEventListener('click', (e) => {
    // TODO include warning here..
    win.close();

})
resizeIcon.addEventListener('click', (e) => {

    // switch between icons square and two squares
    if (win.isMaximized()) {
        win.unmaximize();
        resizeIcon.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/regular/window-maximize.svg';
    } else {
        win.maximize();
        resizeIcon.src = '../static/assets/fontawesome-free-5.9.0-web/svgs/regular/window-restore.svg';
    }

})
document.getElementById("minimize-icon").addEventListener('click', (e) => {
    win.minimize();
})

/* -------------------------------------------------------------------------- */


// When the user scrolls the page
window.addEventListener('scroll', (e) => {

    let toolbar = document.getElementById('toolbar-container');
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    winScroll > 0 ? toolbar.style.boxShadow = '0px 1px 5px #00000020'
        : toolbar.style.boxShadow = 'none';
})

/* -------------------------------------------------------------------------- */
