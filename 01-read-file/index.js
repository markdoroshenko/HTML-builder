const path = require('path');
const { readFile } = require('fs/promises');

async function readTextFile() {
  const filePath = path.join(__dirname, 'text.txt');
  try {
    const text = await readFile(filePath, 'utf8');
    console.log('text', text);
  } catch (error) {
    console.error('Error reading the file:', error.message);
  }
}
readTextFile();
