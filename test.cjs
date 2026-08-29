const { loadConfigFromFile } = require('vite');
loadConfigFromFile({}, 'E:/Work/absolute-global/vite.config.js').then(result => {
  console.log('Config loaded:', result);
}).catch(err => {
  console.error('Error loading config:', err);
});