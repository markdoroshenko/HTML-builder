const fs = require('fs').promises;
const path = require('path');

// Define required dirs && files paths.
const stylesDirPath = path.join(__dirname, 'styles');
const projectDistPath = path.join(__dirname, 'project-dist');
const bundleCssPath = path.join(projectDistPath, 'bundle.css');

async function createBundleCssFile() {
  try {
    // 2. Read the contents of the `styles` folder asynchronously.
    const files = await fs.readdir(stylesDirPath);

    // 3. Check if an object in the folder is a file and has the correct file extension.
    const cssFilesArr = files.filter((file) => path.extname(file) === '.css');
    console.log('cssFilesArr', cssFilesArr);

    // 4. Read and write the style files asynchronously.
    const stylesArray = await Promise.all(
      cssFilesArr.map(async (file) => {
        const filePath = path.join(stylesDirPath, file);
        return await fs.readFile(filePath, 'utf-8');
      }),
    );

    // 6. Write the array of styles to the `bundle.css` file asynchronously.
    const bundleCssContent = stylesArray.join('\n');
    await fs.writeFile(bundleCssPath, bundleCssContent);
    console.log('Bundle.css file created successfully:', bundleCssPath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
createBundleCssFile();
