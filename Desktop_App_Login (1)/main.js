const { app, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url')
let mainWindow
function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 310, height: 330,
        center: true,
        frame: false,
        resizable:false,
        icon: path.join(__dirname, 'images', 'xp-icon-256x256.png'),
        webPreferences: {
            nodeIntegration: true
        },
    })
    // mainWindow.webContents.openDevTools();
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'login.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

