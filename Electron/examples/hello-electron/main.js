const { app, BrowserWindow,ipcMain } = require("electron");
const path = require('node:path')
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
        // devTools:true,
        preload:path.join(__dirname,'preload.js')
    }
  });
  mainWindow.loadFile("index.html");
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.handle('ping',()=>{
    console.log('ipcMain.handle')
    return 'pong'
  })
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
