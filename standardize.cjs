const fs = require('fs');

const file = './src/components/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace backgrounds
content = content.replace(/bg-\[#09090B\]/g, 'bg-[var(--color-bg-primary)]');
content = content.replace(/bg-\[#050505\]/g, 'bg-[var(--color-bg-primary)]');
content = content.replace(/bg-\[#111113\]/g, 'bg-[var(--color-bg-surface)]');

// Replace borders
content = content.replace(/border-\[#27272A\]/g, 'border-[var(--color-border-primary)]');

// Replace texts
content = content.replace(/text-\[#A1A1AA\]/g, 'text-[var(--color-text-secondary)]');
content = content.replace(/text-\[#E4E4E7\]/g, 'text-[var(--color-text-primary)]');
content = content.replace(/text-\[#FAFAFA\]/g, 'text-[var(--color-text-primary)]');
content = content.replace(/text-\[#71717A\]/g, 'text-[var(--color-text-muted)]');

fs.writeFileSync(file, content, 'utf8');
console.log('Updated LandingPage.tsx');
