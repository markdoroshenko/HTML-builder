//1. Import all required modules.
const fs = require('fs');
const path = require('path');

async function buildPage() {
  try {
    // Create the 'project-dist' folder.
    const projectDistPath = path.join(__dirname, 'project-dist');
    await fs.promises.mkdir(projectDistPath, { recursive: true });

    // 2. Read and save the template file in a variable.
    const templatePath = path.join(__dirname, 'template.html');
    let templateContent = await fs.promises.readFile(templatePath, 'utf-8');

    // 3. Find all tag names in the template file
    const tagNames = Array.from(templateContent.matchAll(/{{([^{}]+)}}/g)).map(
      (match) => match[1],
    );
    console.log('tagNames', tagNames);

    // 4. Replace template tags with the content of component files
    const componentsDirPath = path.join(__dirname, 'components');
    await Promise.all(
      tagNames.map(async (tag) => {
        let componentPath = path.join(componentsDirPath, tag + '.html');
        let componentContent = await fs.promises.readFile(
          componentPath,
          'utf-8',
        );
        templateContent = templateContent.replace(
          new RegExp(`{{${tag}}}`, 'g'),
          componentContent,
        );
      }),
    );

    // 5. Write the modified template to the 'index.html' file in the 'project-dist' folder
    const indexPath = path.join(projectDistPath, 'index.html');
    await fs.promises.writeFile(indexPath, templateContent);

    // 6. Use the script written in task 05-merge-styles to create the 'style.css' file
    await require('../05-merge-styles/index');

    // 7. Use the script from task 04-copy-directory to move the 'assets' folder into the 'project-dist' folder
    await require('../04-copy-directory/index');

    console.log('Build completed successfully.');
  } catch (error) {
    console.error('Error building page:', error);
  }
}

buildPage();
