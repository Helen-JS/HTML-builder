const {createReadStream} = require('fs');
const {resolve} = require('path');

let fileStream = createReadStream(resolve(__dirname, 'text.txt'));

fileStream.on('open', () =>{
    fileStream.pipe(process.stdout)
})