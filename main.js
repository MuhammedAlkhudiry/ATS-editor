// TODO: replace request-promise!!!
// TODO: change paths for python!!!
// TODO: minify assets.

'use strict';

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
var rq = require('request-promise');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

require('electron-reload')(__dirname);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', function () {

  /* ------------------ setting up Flask server ----------------- */

  // develop
  var subpy = require('child_process').spawn('python', ['python.py']);

  // packaging
  // var subpy = require('child_process').spawn('./dist/python.exe');

  /* ------------------ setting up Flask server ----------------- */

  var mainAddr = 'http://localhost:5000';
  var openWindow = function () {

    // setting main window..
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      },
      frame: false,
    });

    // load main window from Flask.
    // mainWindow.loadURL(mainAddr);

    // for developing front-end
    mainWindow.loadFile('./templates/index.html');
    
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // TODO: dl
    mainWindow.webContents.session.clearCache(function () {
      
    });

    mainWindow.on('closed', function () {
      mainWindow = null;
      subpy.kill();
    });
  };

  /* ------------------------- starting Flask server ------------------------- */

  var startUp = function () {
    rq(mainAddr)
      .then(function (htmlString) {
        console.log('server started!');
        openWindow();
      })
      .catch(function (err) {
        console.log(err);
        startUp();
      });
  };

  // for back-end
  // startUp();

  // for front-end
  openWindow()
  /* ------------------------- starting Flask server ------------------------- */

});

/* ---------------------------- closing functions --------------------------- */

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

/* ---------------------------- closing functions --------------------------- */

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
