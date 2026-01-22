const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // puedes agregar funciones para comunicar con main si quieres
});
