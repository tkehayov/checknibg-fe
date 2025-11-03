const fs = require("fs");
const path = require("path");

const indexPath =
  process.argv[2] || path.join(process.cwd(), "build", "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("index.html not found:", indexPath);
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");

// match <link ... href="/static/css/main.<hash>.css" ...> (handles single/double quotes, attrs order)
const cssLinkRegex =
  /<link\b[^>]*href=(["'])\/static\/css\/(main\.[^"']+\.css)\1[^>]*\/?>/gi;

const replaced = html.replace(cssLinkRegex, (_, q, cssFile) => {
  return [
    `<link rel="preload" href="/static/css/${cssFile}" as="style" />`,
    `<link`,
    `  rel="stylesheet"`,
    `  href="/static/css/${cssFile}"`,
    `  media="print"`,
    `  onload="this.media='all'"`,
    `/>`,
    `<noscript><link rel="stylesheet" href="/static/css/${cssFile}" /></noscript>`,
  ].join("\n");
});

if (replaced === html) {
  console.log("No matching /static/css/main.*.css link found in", indexPath);
  process.exit(0);
}

fs.writeFileSync(indexPath, replaced, "utf8");
console.log("Replaced CSS link(s) in", indexPath);
