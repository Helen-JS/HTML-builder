
const {resolve, extname, basename} = require('path');
const {readdir, stat} = require('fs').promises;

async function* traverseDir(root) {
  const fileNames = await readdir(root,{ withFileTypes: true });
  for (let fileName of fileNames) {
    if(fileName.name.startsWith("."))
      continue;
    const filePath = resolve(root, fileName.name);
    if (fileName.isDirectory()) {
      yield* traverseDir(filePath);
    } else {
      let extent = extname(fileName.name);
      const name = basename(filePath, extent)
      const size = (await stat(filePath)).size / 1024;
      extent = extent.replace('.','');
      yield {name, size, extent};
    }
  }
}

(async () => {for await (const {name, size, extent} of traverseDir('./03-files-in-folder/secret-folder')) console.log(`${name} - ${extent} - ${size}kb`);})();