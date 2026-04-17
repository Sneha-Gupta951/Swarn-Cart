const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const og = content;
  
  // Hex color replacements (case-insensitive)
  content = content.replace(/#F59E0B/gi, '#D4AF37');
  content = content.replace(/#FCD34D/gi, '#EDCD82');
  content = content.replace(/#B45309/gi, '#A68A28');

  // RGBA replacements
  content = content.replace(/245,\s*158,\s*11/g, '212,175,55');
  content = content.replace(/180,\s*83,\s*9/g, '166,138,40'); // rgba(180,83,9,0.2) based on light mode border-gold

  if (content !== og) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      traverse(p);
    } else if (p.endsWith('.css') || p.endsWith('.js') || p.endsWith('.jsx')) {
      processFile(p);
    }
  }
}

traverse('./src');
