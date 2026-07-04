import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/components/aulas/shared.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Find the video tab block inside ModuleConsolidation tabs
const videoBlockRegex = /video\s*&&\s*\{\s*id:\s*"video"[\s\S]*?\},\s*/;
if (videoBlockRegex.test(content)) {
  content = content.replace(videoBlockRegex, '');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log("Successfully removed video tab from ModuleConsolidation in shared.tsx");
} else {
  console.log("Video tab block not found in shared.tsx");
}
