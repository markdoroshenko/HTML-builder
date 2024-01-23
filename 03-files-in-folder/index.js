const fs = require('fs').promises;
const path = require('path');
const currentPath = path.join(__dirname, 'secret-folder');
console.log('currentPath', currentPath);

async function innerFiles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);
      const fileName = path.basename(filePath);
      const fileExt = path.extname(filePath);
      const fileSize = stats.size;
      console.log('--------------------------------');
      console.log(`File Name: ${fileName}`);
      console.log(`File Extension: ${fileExt}`);
      console.log(`File Size: ${fileSize} bytes`);
      console.log('--------------------------------');
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

innerFiles(currentPath);
