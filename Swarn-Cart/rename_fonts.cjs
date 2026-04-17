const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  content = content.replace(/@import url\('.*?'\);/, "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');");
  content = content.replace(/'Outfit',\s*sans-serif/g, "'Poppins', sans-serif");
  content = content.replace(/'Syne',\s*sans-serif/g, "'Poppins', sans-serif");
  content = content.replace(/'Outfit',sans-serif/g, "'Poppins',sans-serif");
  content = content.replace(/'Syne',sans-serif/g, "'Poppins',sans-serif");
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory('./src');
