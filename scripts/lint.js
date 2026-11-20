// Minimal lint: every JS file must parse.
import { execFileSync } from 'node:child_process';
const files = ['server.js', 'public/list.js', 'scripts/lint.js', 'scripts/smoke.js', 'test/list.test.js'];
for (const f of files) execFileSync(process.execPath, ['--check', f], { stdio: 'inherit' });
console.log('lint ok');
