'use strict';

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const axios = require('axios');
const spawn = require('child_process').spawn;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
// todo: dl
require('electron-reload')(__dirname);
const subpy = spawn('python', ['./engine/app.py']);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {

    /* ------------------ setting up Flask server ----------------- */

    // packaging
    // const subpy = require('child_process').spawn('./dist/python.exe');

    /* ------------------ setting up Flask server ----------------- */

    const mainAddr = 'http://localhost:5000';
    const openWindow = () => {

        // setting main window..
        win = new BrowserWindow({
            width: 1000,
            height: 1000,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true
            },
            frame: false,
            show: false
        });


        win.once('ready-to-show', () => win.show());

        // load main window from Flask.
        // win.loadURL(mainAddr).then(() => {
        //     setTimeout(() => {
        //         win.setBounds({width: 1000, height: 800});
        //         win.center();
        //     }, 0);
        // });

        // for developing front-end
        win.loadFile('./templates/index.html').then(() => {
            // setTimeout(() => {
            //     win.setBounds({width: 1000, height: 800});
            //     win.center();
            // }, 2000);
        });

        // TODO: dl
        // Open the DevTools.
        win.webContents.openDevTools();
        win.webContents.session.clearCache();

        win.on('closed', () => {
            win = null;
            subpy.kill();
        });
        win.on('session-end', () => {
            win = null;
            subpy.kill();
        });
    };


    /* ------------------------- starting Flask server ------------------------- */

    const startServer = () => {
        axios.get(mainAddr)
            .then((htmlString) => {
                console.log('server started!');
                openWindow();
            })
            .catch((err) => {
                // console.log(err);
                // startServer();
            });
    };
    // startServer();

    // for front-end
    openWindow();
    /* ------------------------- starting Flask server ------------------------- */

});

/* ---------------------------- closing functions --------------------------- */

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) openWindow();
});


/* ---------------------------- closing functions --------------------------- */

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
