
const {path} = require('path');
const {readdir, stat} = require('fs').promises;

async function* traverseDir(root) {
  console.log('Root: ' + root);
  const fileNames = await readdir(root);
  for (let fileName of fileNames) {
    let filePath = path(root, fileName);
    if ((await stat(filePath)).isDirectory()) {
      yield* traverseDir(filePath);
    } else {
      const size = (await stat(fileName)).size;
      const extent = filePath.extname;
      yield {...fileName, size, extent};
    }
  }
}

(async () => {for await (const {name, size, extent} of traverseDir('/')) console.log(name, size, extent);})();