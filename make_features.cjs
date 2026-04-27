const fs = require('fs');

let html = fs.readFileSync('stitch_landing.html', 'utf-8');

// Replace "Start Performing" button with a link
html = html.replace(
    /<button class="px-10 py-5 rounded-full bg-cyan-400 text-on-primary font-headline-md text-headline-md neon-pulse hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto group">\s*Start Performing\s*<span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt<\/span>\s*<\/button>/,
    `<a href="app.html" class="inline-flex px-10 py-5 rounded-full bg-cyan-400 text-on-primary font-headline-md text-headline-md neon-pulse hover:scale-105 active:scale-95 transition-all items-center gap-4 mx-auto group">
        Start Performing
        <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
    </a>`
);

// Replace "Connect Camera" button with a link
html = html.replace(
    /<button class="bg-cyan-400\/10 text-cyan-400 px-6 py-2 rounded-full border border-cyan-400\/50 font-\['Space_Grotesk'\] font-bold hover:bg-cyan-400 hover:text-on-primary transition-all active:scale-95 duration-150">Connect Camera<\/button>/g,
    `<a href="app.html" class="inline-flex bg-cyan-400/10 text-cyan-400 px-6 py-2 rounded-full border border-cyan-400/50 font-['Space_Grotesk'] font-bold hover:bg-cyan-400 hover:text-on-primary transition-all active:scale-95 duration-150">Connect Camera</a>`
);

// Write to features.html
fs.writeFileSync('features.html', html);

console.log('Created features.html');
