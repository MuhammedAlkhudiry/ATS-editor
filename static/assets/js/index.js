let path = require("path");
const remote = require("electron").remote;
const { ipcRenderer } = require("electron");
let win = remote.getCurrentWindow();
let dialog = remote.dialog;
let app = remote.app;
let textBox = document.getElementById("text-box");
/* ------------------------------ DOM variables ----------------------------- */

/* -------------------------------------------------------------------------- */

const resizeIcon = document.getElementById("resize-icon");

/* -------------------------------- main bar -------------------------------- */

/* ------------------------- controlling main window ------------------------ */

document.getElementById("exit-icon").addEventListener("click", e => {
    if (change.length() > 0) {
        showUnsavedFileNote().then(result => {
            // if result.value means 'yes' pressed, else no.
            if (result.value) {
                win.close();

                // make sure the app is closed.
                if (!win.isDestroyed()) win.destroy();
            }
        });
    } else {
        win.close();
    }
});
resizeIcon.addEventListener("click", e => {
    // switch between icons square and two squares
    if (win.isMaximized()) {
        win.unmaximize();
        resizeIcon.firstElementChild.src =
            "../static/assets/fontawesome-free-5.9.0-web/svgs/regular/window-maximize.svg";
    } else {
        win.maximize();
        resizeIcon.firstElementChild.src =
            "../static/assets/fontawesome-free-5.9.0-web/svgs/regular/window-restore.svg";
    }
});
document.getElementById("min-icon").addEventListener("click", e => {
    win.minimize();
});

/* -------------------------------------------------------------------------- */

// When the user scrolls the page
textBox.addEventListener("scroll", e => {
    let toolbar = document.getElementById("toolbar-container");

    let Scroll = textBox.scrollTop;
    Scroll > 0
        ? (toolbar.style.boxShadow = "0px 1px 5px #00000020")
        : (toolbar.style.boxShadow = "none");
});

/* -------------------------------------------------------------------------- */

document.addEventListener("dragenter", e => {
    document.documentElement.opacity = "0.5";
});

/* -------------------------------------------------------------------------- */
let searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", e => {
    if (searchInput.value) {
        let totalText = quill.getText();
        let re = new RegExp(searchInput.value, "g");
        let match = re.test(totalText);
        if (match) {
            searchInput.className = "input is-success";
        } else {
            searchInput.className = "input is-danger";

        }
    } else {
        searchInput.className = "input is-primary";
    }
});
