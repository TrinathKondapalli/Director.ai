const fs = require('fs');
const filePath = 'src/data/tzinrConceptsData.ts';
let f = fs.readFileSync(filePath, 'utf8');
f = f.replace(/insight: "Good design removes questions before users ask them.",\s*/g, '');
f = f.replace(/message: "Good design removes questions before users ask them.",\s*/g, '');
fs.writeFileSync(filePath, f);
console.log('Fixed tzinrConceptsData.ts');
