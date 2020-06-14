const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;
const Store = require('./store.js');

// First instantiate the class
const store = new Store({
  configName: 'app-data'
});

let boards = store.get('boards');

let mainWindow;

app.on('ready', () => { 
    mainWindow = new BrowserWindow({
    	webPreferences: {nodeIntegration: true}
    });
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/main.html`);
});


ipcMain.on('getBoards', (event) => {
	mainWindow.webContents.send('sendBoards', boards);
});