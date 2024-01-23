const path = require('path');
const fs = require('fs').promises;
const readLine = require('readline');
const filePath = path.join(__dirname, 'text.txt');

// Check if the file by filePath exists, if not create it asynchronously.
async function createFileIfNotExists(filePath) {
  try {
    await fs.access(filePath); // Try to access the file
  } catch (error) {
    await fs.writeFile(filePath, '', { flag: 'w' });
    console.log('File created:', filePath);
  }
}

// Creating the object that consists of input and output using process objects stdin && stdout props.
const obj = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creating an asynchronous function that appends specified data to the file and provides the user with a corresponding message.
const addText = async (text) => {
  try {
    await fs.appendFile(filePath, `${text}\n`, { flag: 'a' });
    console.log(
      'Text appended to the file. Enter new text (or type "exit" to terminate)',
    );
  } catch (error) {
    console.error('Error appending text to the file:', error.message);
  }
};

console.log('Enter text (or type "exit" to terminate)');

// Event listener for the 'line' event of the readline Interface.
obj.on('line', async (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Farewell! Terminating process.');
    obj.close();
  } else {
    await addText(input); // Use 'await' as addText is now an asynchronous function
  }
});

// Async function to handle the termination of the process
async function terminateProcess() {
  console.log('Terminating process.');
  obj.close();
}

// Event listener for the 'close' event of the readline Interface.
obj.on('close', terminateProcess);

// Call the asynchronous function to create the file if it doesn't exist.
createFileIfNotExists(filePath).catch((error) => {
  console.error('Error creating or accessing file:', error.message);
});
