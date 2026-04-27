import fs from 'fs';

const stitchHtml = fs.readFileSync('stitch_landing.html', 'utf-8');
const originalHtml = fs.readFileSync('index.html', 'utf-8');

// Extract Stitch head
const stitchHeadMatch = stitchHtml.match(/<head>([\s\S]*?)<\/head>/);
let stitchHead = stitchHeadMatch[1];
stitchHead = stitchHead.replace(/<meta charset="utf-8"\/>/, '');
stitchHead = stitchHead.replace(/<meta content="width=device-width, initial-scale=1.0" name="viewport"\/>/, '');

const stitchBodyMatch = stitchHtml.match(/<body class="([^"]+)">/);
const stitchBodyClass = stitchBodyMatch[1];

const stitchHeaderMatch = stitchHtml.match(/<header[\s\S]*?<\/header>/);
const stitchHeader = stitchHeaderMatch[0];

const howItWorksIndex = stitchHtml.indexOf('<section class="py-32');
const endOfMainIndex = stitchHtml.indexOf('</main>');
const stitchMainRest = stitchHtml.substring(howItWorksIndex, endOfMainIndex);

const stitchFooterNavMatch = stitchHtml.match(/<\/main>[\s\S]*?(<nav class="md:hidden[\s\S]*?<\/footer>)/);
const stitchFooterNav = stitchFooterNavMatch ? stitchFooterNavMatch[1] : '';

// Process originalHtml
let newHtml = originalHtml.replace(/<html lang="en">/, '<html lang="en" class="dark">');

newHtml = newHtml.replace(/<link rel="stylesheet" href="\/src\/landing\.css">/, 
    stitchHead + '\n    <link rel="stylesheet" href="/src/landing.css">'
);

newHtml = newHtml.replace(/<body>/, `<body class="${stitchBodyClass}">`);

newHtml = newHtml.replace(/<nav class="navbar" id="navbar">[\s\S]*?<\/nav>/, stitchHeader);

// We want to wrap `<div class="sticky-container"> ... </div>` inside `<main>` and append the rest.
// Since the last thing in the body is the script tag, we can split by `<script type="module" src="/src/landing.js"></script>`
// Or we know the sticky-container ends before the script tag.
const parts = newHtml.split('<script type="module" src="/src/landing.js"></script>');

let beforeScript = parts[0];
// Add <main> before <div class="sticky-container">
beforeScript = beforeScript.replace('<div class="sticky-container">', '<main>\n    <div class="sticky-container">');
// Append the rest of the main content and close main before the script
beforeScript = beforeScript + `\n${stitchMainRest}\n</main>\n${stitchFooterNav}\n`;

newHtml = beforeScript + '<script type="module" src="/src/landing.js"></script>' + parts[1];

fs.writeFileSync('index.html', newHtml);
console.log('Merged successfully!');
