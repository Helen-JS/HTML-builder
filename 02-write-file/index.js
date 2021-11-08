const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  'Всем привет!',
  (err) => {
    if (err) throw err;
    console.log('Файл был создан');
  }
);

fs.appendFile(
  path.join(__dirname, 'text.txt'),
  'Удачной проверки!',
  err => {
    if (err) throw err;
    console.log('Файл был изменен');
  }
);