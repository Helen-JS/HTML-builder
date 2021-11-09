const {resolve, extname, basename} = require('path');
const {existsSync, rmdirSync} = require("fs");
const {readdir, stat , copyFile , mkdir, opendir} = require('fs').promises;

let actualization = false;

async function* traverseDir(base, src, dest) {
    if(!actualization) {
        rmdirSync(base + dest, {recursive: true});
        console.log('Directory: ' + base + dest + ' was successfully deleted.')
    }
    const fileNames = await readdir(base + src,{ withFileTypes: true });
    for (let fileName of fileNames) {
        const filePath = resolve(base + src, fileName.name);
        if (fileName.isDirectory()) {
            yield* traverseDir(filePath);
        } else {
            let destDir = base + dest;
            yield {filePath, destDir};
        }
    }
}
function copyItem(srcfile, destDir) {

    if (!existsSync(destDir)){
        mkdir(destDir);
        actualization = true;
    }
    let name = basename(srcfile);
    console.log('File: ' + name + ' was copied to directory: ' + destDir);
    copyFile(srcfile, resolve(destDir, basename(srcfile)));
}

(async () => {
    for await (const {filePath, destDir} of traverseDir('./04-copy-directory/', 'files', 'file-copy'))
        copyItem(filePath, destDir);
})();
