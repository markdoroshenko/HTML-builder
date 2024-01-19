const path = require('path');
const fs = require('fs');
const readLine = require('readline');
const filePath = path.join(__dirname, 'text.txt');

//Check is file by filePath exist, if not create it.
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '', { flag: 'w' });
  console.log('File created:', filePath);
}

//Creating the object that consists of input and output using process objs stdin && stdout props.
//(the default input, output streams)
//the object an instance of readline.Interface
const obj = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Creating function that appends specified data to file, and provide user with corresponding  massage.
//Flag:'a': Stands for "append." If the file exists, the data will be appended to the end of the file.
// If the file does not exist, a new file will be created.
// Flag: 'w': Stands for "write." If the file exists, it will be truncated (emptied) and then the new data will be written to it.
// If the file does not exist, a new file will be created.
const addText = (text) => {
  fs.writeFileSync(filePath, `${text}\n`, { flag: 'a' });
  console.log(
    'Text appended to the file. Enter new text (or type "exit" to terminate',
  );
};
console.log('Enter text (or type "exit" to terminate');

// Event listener for the 'line' event of the readline Interface.
// It handles user input line by line, checking if the input is 'exit' to terminate the process.
// If the input is not 'exit', it calls the addText function to append the input to the file.
obj.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Farewell! Terminating process.');
    obj.close();
  } else {
    addText(input);
  }
});

// obj.on('close', () => {
//   process.exit();
// });
//
// fs.unlink(filePath, (err) => {
//   if (err) {
//     console.error('Error deleting file:', err);
//   } else {
//     console.log('File deleted successfully.');
//   }
// });
