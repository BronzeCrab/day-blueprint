const electron = require('electron');

const { app, BrowserWindow } = electron;
const Store = require('./store.js');

// First instantiate the class
const store = new Store({
  configName: 'app-data'
});

const boards = store.get('boards');

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
    	webPreferences: {nodeIntegration: true}
    });
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});