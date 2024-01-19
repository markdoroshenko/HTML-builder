const path = require('path');
const { readFileSync } = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const text = readFileSync(filePath, 'utf8');
console.log('text', text);
