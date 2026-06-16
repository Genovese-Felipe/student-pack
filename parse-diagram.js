const fs = require('fs');
const text = fs.readFileSync('resources/GUIA_PACK.md', 'utf8');
const matches = text.match(/```mermaid([\s\S]*?)```/g);
console.log(matches[6]);
