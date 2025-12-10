const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

const url = require('url');
const path = require('path');
const { contextIsolated } = require('process');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'TinyThrive',
        width: 400,
        height: 430,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            // path to preload script 
            preload: path.join(__dirname, "preload.js"),
            // keep context isolated for security
            contextIsolation: true,
            // disable node.js in the renderer for security
            nodeIntegration: false,
        }
    });

    const startUrl = url.format({
        // connect to the react app
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true,
    });

    mainWindow.setWindowButtonVisibility(false);
    mainWindow.setMenuBarVisibility(false);

    // load app in elec tron window
    mainWindow.loadURL(startUrl);

    // listen for 'close-app' event 
    ipcMain.on('close-app', () => {
        app.quit();
    });

    ipcMain.on('minimise-window', () => {
        BrowserWindow.getFocusedWindow()?.minimize();
    });
}

app.whenReady().then(createMainWindow);