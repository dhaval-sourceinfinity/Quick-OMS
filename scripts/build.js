const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const cssFiles = [
  'tokens.css',
  'base.css',
  'primitives.css',
  'components.css',
  'layout.css',
  'sections.css'
];

function buildCss() {
  const startTime = Date.now();
  try {
    const combinedCss = cssFiles
      .map(f => fs.readFileSync(path.join(rootDir, 'assets/css', f), 'utf8'))
      .join('\n');

    const tempConcatPath = path.join(rootDir, 'assets/css/temp-concat.css');
    fs.writeFileSync(tempConcatPath, combinedCss);

    const outCssPath = path.join(rootDir, 'assets/css/style.min.css');
    execSync(`npx -y esbuild "${tempConcatPath}" --minify --outfile="${outCssPath}"`, { stdio: 'pipe' });

    if (fs.existsSync(tempConcatPath)) {
      fs.unlinkSync(tempConcatPath);
    }

    const origSize = cssFiles.reduce((sum, f) => sum + fs.statSync(path.join(rootDir, 'assets/css', f)).size, 0);
    const minSize = fs.statSync(outCssPath).size;
    const elapsed = Date.now() - startTime;
    console.log(`[${new Date().toLocaleTimeString()}] CSS rebuilt -> style.min.css (${(minSize / 1024).toFixed(1)} KB, ${(origSize / 1024).toFixed(1)} KB orig, ${((1 - minSize / origSize) * 100).toFixed(1)}% saved) in ${elapsed}ms`);
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] CSS build error:`, err.message);
  }
}

function buildJs() {
  const startTime = Date.now();
  try {
    const inJsPath = path.join(rootDir, 'assets/js/main.js');
    const outJsPath = path.join(rootDir, 'assets/js/main.min.js');
    execSync(`npx -y esbuild "${inJsPath}" --minify --outfile="${outJsPath}"`, { stdio: 'pipe' });

    const origSize = fs.statSync(inJsPath).size;
    const minSize = fs.statSync(outJsPath).size;
    const elapsed = Date.now() - startTime;
    console.log(`[${new Date().toLocaleTimeString()}] JS rebuilt  -> main.min.js (${(minSize / 1024).toFixed(1)} KB, ${(origSize / 1024).toFixed(1)} KB orig, ${((1 - minSize / origSize) * 100).toFixed(1)}% saved) in ${elapsed}ms`);
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] JS build error:`, err.message);
  }
}

function buildAll() {
  console.log('Building production assets with esbuild...');
  buildCss();
  buildJs();
  console.log('Build complete!\n');
}

const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');

if (!isWatch) {
  buildAll();
} else {
  buildAll();
  console.log('Watching assets/css and assets/js for changes... (Press Ctrl+C to exit)\n');

  let cssTimeout = null;
  const cssDir = path.join(rootDir, 'assets/css');
  fs.watch(cssDir, (eventType, filename) => {
    if (!filename) return;
    if (cssFiles.includes(filename) || (filename.endsWith('.css') && !filename.includes('.min.') && !filename.includes('temp-'))) {
      clearTimeout(cssTimeout);
      cssTimeout = setTimeout(() => {
        console.log(`[${new Date().toLocaleTimeString()}] Change detected in assets/css/${filename}`);
        buildCss();
      }, 100);
    }
  });

  let jsTimeout = null;
  const jsDir = path.join(rootDir, 'assets/js');
  fs.watch(jsDir, (eventType, filename) => {
    if (!filename) return;
    if (filename === 'main.js') {
      clearTimeout(jsTimeout);
      jsTimeout = setTimeout(() => {
        console.log(`[${new Date().toLocaleTimeString()}] Change detected in assets/js/${filename}`);
        buildJs();
      }, 100);
    }
  });
}
