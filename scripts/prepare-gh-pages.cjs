const fs = require("fs");
const path = require("path");

const distDir = path.join(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");

if (!fs.existsSync(indexPath)) {
  throw new Error(
    "dist/index.html was not found. Run build before prepare-gh-pages.",
  );
}

fs.copyFileSync(indexPath, notFoundPath);
console.log("Created dist/404.html for GitHub Pages SPA fallback.");

// Create .nojekyll to tell GitHub Pages not to process with Jekyll
const nojekyllPath = path.join(distDir, ".nojekyll");
fs.writeFileSync(nojekyllPath, "");
console.log("Created dist/.nojekyll to disable Jekyll processing.");
