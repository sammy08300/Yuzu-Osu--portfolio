const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Run the build process
console.log('🚀 Building CSS with Tailwind...');
execSync('npx tailwindcss -i ./src/css/styles.css -o ./dist/styles.css --minify', { stdio: 'inherit' });

// Copy HTML file to dist
console.log('📝 Copying HTML file...');
fs.copyFileSync('index.html', path.join('dist', 'index.html'));

// Copy assets to dist
console.log('🖼️ Copying assets...');
const srcAssetsDir = path.join('src', 'assets');
const distAssetsDir = path.join('dist', 'assets');

if (fs.existsSync(srcAssetsDir)) {
  if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir, { recursive: true });
  }
  
  // Copy assets directory recursively
  copyDirectoryRecursive(srcAssetsDir, distAssetsDir);
}

// Copy JS files
console.log('📜 Copying JS files...');
const srcJsDir = path.join('src', 'js');
const distJsDir = path.join('dist', 'js');

if (fs.existsSync(srcJsDir)) {
  if (!fs.existsSync(distJsDir)) {
    fs.mkdirSync(distJsDir, { recursive: true });
  }
  
  // Copy js directory recursively
  copyDirectoryRecursive(srcJsDir, distJsDir);
}

// Copy public directory to dist if it exists and has content
const publicDir = 'public';
if (fs.existsSync(publicDir) && fs.readdirSync(publicDir).length > 0) {
  console.log('📂 Copying public files...');
  copyDirectoryRecursive(publicDir, 'dist');
}

console.log('✅ Build completed successfully!');

// Function to recursively copy a directory
function copyDirectoryRecursive(source, destination) {
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
} 