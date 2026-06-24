const fs = require('fs');

const files = [
  'app/admin/lms/management/page.tsx',
  'app/admin/lms/my-learning/page.tsx',
  'app/admin/attendance/management/page.tsx',
  'app/admin/attendance/my-attendance/page.tsx',
  'app/admin/task/management/page.tsx',
  'app/admin/task/my-tasks/page.tsx',
  'app/admin/assessment/page.tsx',
  'app/admin/submissions/page.tsx',
  'app/admin/performance/page.tsx',
  'app/admin/super-admin/page.tsx',
  'app/admin/files/page.tsx'
];

const banner = `
      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 font-medium flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        TODO: Waiting for backend endpoint
      </div>
`;

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Quick heuristic to inject after <div className="space-y-6 ..."> or similar main container.
    // If not found, inject after the first <div className="...">
    
    // Make sure AlertTriangle is imported
    if (!content.includes('AlertTriangle')) {
      content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { AlertTriangle, $1 } from 'lucide-react';");
    }

    if (!content.includes('TODO: Waiting for backend endpoint')) {
      // Find the return statement of the component
      const returnMatch = content.match(/return\s*\(\s*<[a-zA-Z0-9_.-]+[^>]*>/);
      if (returnMatch) {
        content = content.replace(returnMatch[0], returnMatch[0] + banner);
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
      } else {
        console.log(`Could not find return statement in ${file}`);
      }
    } else {
       console.log(`Already has banner ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
