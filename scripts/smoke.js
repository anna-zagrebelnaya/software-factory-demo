// Starts the app on a free port and checks it responds.
import { start } from '../server.js';
const s = await start(0);
const base = `http://localhost:${s.address().port}`;
const html = await (await fetch(base)).text();
const js = await fetch(`${base}/list.js`);
s.close();
if (!html.includes('<title>My list</title>') || js.status !== 200 || !html.includes('id="empty"')) {
  console.error('smoke failed');
  process.exit(1);
}
console.log('smoke ok');
