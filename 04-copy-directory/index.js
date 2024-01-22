const path = require('path');
const fs = require('fs').promises;

const originDirPath = path.join(__dirname, 'files');
const copiedDirPath = path.join(__dirname, 'files-copy');

async function updateFilesCopy() {
  try {
    await fs.mkdir(copiedDirPath, { recursive: true });
    const originFiles = await fs.readdir(originDirPath);
    const copiedFiles = await fs.readdir(copiedDirPath);

    const additions = originFiles.filter((file) => !copiedFiles.includes(file));
    const prevAdditions = originFiles.filter((file) =>
      copiedFiles.includes(file),
    );

    await Promise.all(
      additions.concat(prevAdditions).map(async (file) => {
        const originFilePath = path.join(originDirPath, file);
        const copiedFilePath = path.join(copiedDirPath, file);
        const content = await fs.readFile(originFilePath);
        await fs.writeFile(copiedFilePath, content);
        console.log(`Copied ${file} to ${copiedDirPath}`);
      }),
    );

    const removals = copiedFiles.filter((file) => !originFiles.includes(file));
    await Promise.all(
      removals.map(async (file) => {
        const copiedFilePath = path.join(copiedDirPath, file);
        await fs.unlink(copiedFilePath);
        console.log(`Removed ${file} from ${copiedDirPath}`);
      }),
    );
    console.log('Update complete.');
  } catch (error) {
    console.error('Error updating files:', error);
  }
}
updateFilesCopy();
