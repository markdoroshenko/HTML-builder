//1. Import all required modules.
const fs = require('fs');
const path = require('path');

//define required dirs && files paths.
const stylesDirPath = path.join(__dirname, 'styles');
const projectDistPath = path.join(__dirname, 'project-dist');
const bundleCssPath = path.join(projectDistPath, 'bundle.css');

//2. Read the contents of the `styles` folder.
fs.readdir(stylesDirPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  //3. Check if an object in the folder is a file and has the correct file extension.
  const cssFilesArr = files.filter((file) => path.extname(file) === '.css');
  console.log('cssFilesArr', cssFilesArr);

  //4. Read the style file.
  //5. Write the read data to an array.
  const stylesArray = [];
  cssFilesArr.forEach((file) => {
    const filePath = path.join(stylesDirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    stylesArray.push(content);
  });

  // 6. Write the array of styles to the `bundle.css` file.
  const bundleCssContent = stylesArray.join('\n');
  fs.writeFileSync(bundleCssPath, bundleCssContent);
  console.log('Bundle.css file created successfully:', bundleCssPath);
});
