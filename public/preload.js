const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
        closeApp: () => ipcRenderer.send("close-app"),
        minimise: () => ipcRenderer.send('minimise-window')
});