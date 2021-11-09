const {resolve, basename} = require('path');
const {stat} = require("fs");
const {readdir, copyFile, rmdir, mkdir} = require('fs').promises;
let existence = true;
let firstRun = true;

async function* traverseDir(base, src, dest) {
    let destinationDirectory = base + dest;
    if (existence && firstRun) {
         stat(resolve(destinationDirectory), err => {
            if (!err) {
                rmdir(resolve(destinationDirectory), {recursive: true});
            }
            existence = false;
            firstRun = false;
        });
    }
    const fileNames = await readdir(base + src, {withFileTypes: true});
    for (let fileName of fileNames) {
        const filePath = resolve(base + src, fileName.name);
        if (fileName.isDirectory()) {
            yield* traverseDir(filePath);
        } else {
            let destDir = destinationDirectory;
            yield {filePath, destDir};
        }
    }
}

async function copyItem(srcfile, destDir) {
    if (!existence) {
        await mkdir(resolve(destDir), {recursive: true});
        existence = true;
    }
    let name = basename(srcfile);
    console.log('File: ' + name + ' was copied to directory: ' + destDir);
    copyFile(srcfile, resolve(destDir, basename(srcfile)));
}

(async () => {
    for await (const {filePath, destDir} of traverseDir('./04-copy-directory/', 'files', 'file-copy'))
        await copyItem(filePath, destDir);
})();
