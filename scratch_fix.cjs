const fs = require('fs');
let content = fs.readFileSync('c:/Users/KondapalliTrinath/Downloads/director.ai/src/data/contentEngine.ts', 'utf8');
content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('c:/Users/KondapalliTrinath/Downloads/director.ai/src/data/contentEngine.ts', content);
