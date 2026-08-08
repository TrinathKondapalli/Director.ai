import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../src/data');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// -------------------------------------------------------------
// 1. PARSE UGC DATASETS
// -------------------------------------------------------------
function parseUgcDatasets() {
  const ugcTopics = [];
  const files = fs.readdirSync(publicDir)
    .filter(f => f.startsWith('ugc_dataset_batch') && f.endsWith('.md'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''), 10);
      const numB = parseInt(b.replace(/\D/g, ''), 10);
      return numA - numB;
    });

  files.forEach(file => {
    const filePath = path.join(publicDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Split by "# UGC "
    const blocks = content.split(/^# UGC /m).filter(b => b.trim().length > 0 && !b.startsWith('# DIRECTOR.AI'));

    blocks.forEach(block => {
      const lines = block.split('\n');
      const headerLine = lines[0].trim();
      const idMatch = headerLine.match(/^(\d+)/);
      const numStr = idMatch ? idMatch[1].padStart(3, '0') : String(ugcTopics.length + 1).padStart(3, '0');
      const id = `UGC-${numStr}`;

      const getItem = (sectionTitle) => {
        const regex = new RegExp(`## ${sectionTitle}\\s*\\n([^#]+)`, 'i');
        const match = block.match(regex);
        if (match) {
          return match[1].split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('---')).join(' ');
        }
        return '';
      };

      const industryMatch = block.match(/Industry:\s*(.+)/i);
      const categoryMatch = block.match(/Product Category:\s*(.+)/i);

      const topic = {
        id,
        industry: industryMatch ? industryMatch[1].trim() : 'AI Tools',
        productCategory: categoryMatch ? categoryMatch[1].trim() : 'Software',
        brandName: getItem("Product / Brand Name"),
        targetAudience: getItem("Target Audience"),
        corePainPoint: getItem("Core Pain Point"),
        solution: getItem("Solution / How It's Used"),
        visualHookAngle: getItem("Visual Hook Angle"),
        why: getItem('The "Why"'),
        tone: getItem("Tone / Vibe")
      };

      if (topic.brandName && topic.corePainPoint) {
        ugcTopics.push(topic);
      }
    });
  });

  console.log(`Parsed ${ugcTopics.length} UGC topics.`);
  fs.writeFileSync(path.join(outputDir, 'ugcTopics.json'), JSON.stringify(ugcTopics, null, 2));
}

// -------------------------------------------------------------
// 2. PARSE DESIGN PRINCIPLES DATASET
// -------------------------------------------------------------
function parseDesignDataset() {
  const designTopics = [];
  const filePath = path.join(publicDir, 'design-principles-dataset.md');
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const blocks = content.split(/^# Design Principle /m).filter(b => b.trim().length > 0 && !b.startsWith('# DIRECTOR.AI'));

  blocks.forEach(block => {
    const lines = block.split('\n');
    const headerLine = lines[0].trim();
    const idMatch = headerLine.match(/^(\d+)/);
    const numStr = idMatch ? idMatch[1].padStart(3, '0') : String(designTopics.length + 1).padStart(3, '0');
    const id = `DP-${numStr}`;

    const catMatch = block.match(/\*\*Category:\*\*\s*(.+)/i);
    const diffMatch = block.match(/\*\*Difficulty:\*\*\s*(.+)/i);

    const getItem = (sectionTitle) => {
      const regex = new RegExp(`## ${sectionTitle}\\s*\\n([^#]+)`, 'i');
      const match = block.match(regex);
      if (match) {
        return match[1].split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('---')).join(' ');
      }
      return '';
    };

    const getDoDont = (type) => {
      const regex = new RegExp(`### ${type}\\s*\\n([^#]+)`, 'i');
      const match = block.match(regex);
      return match ? match[1].trim() : '';
    };

    const principle = {
      id,
      category: catMatch ? catMatch[1].trim() : 'UX Psychology',
      difficulty: diffMatch ? diffMatch[1].trim() : 'Intermediate',
      principleName: getItem("Topic / Principle Name"),
      coreDefinition: getItem("Core Definition"),
      whyThisMatters: getItem("Why This Matters"),
      practicalApplication: getItem("Practical Application"),
      visualDo: getDoDont("✅ DO"),
      visualDont: getDoDont("❌ DON'T"),
      targetAudience: getItem("Target Audience"),
      commonMistake: getItem("Common Mistake"),
      expertTip: getItem("Expert Tip"),
      realWorldExample: getItem("Real World Example")
    };

    if (principle.principleName && principle.coreDefinition) {
      designTopics.push(principle);
    }
  });

  console.log(`Parsed ${designTopics.length} Design Principles.`);
  fs.writeFileSync(path.join(outputDir, 'designTopics.json'), JSON.stringify(designTopics, null, 2));
}

parseUgcDatasets();
parseDesignDataset();
