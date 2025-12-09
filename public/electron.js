const { app, BrowserWindow } = require('electron');

const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'TinyThrive',
        width: 400,
        height: 430,
    });

    const startUrl = url.format({
        // connect to the react app
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true,
    });

    // load app in electron window
    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);