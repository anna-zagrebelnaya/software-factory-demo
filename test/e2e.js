// Browser test: add, delete, empty state, and persistence across reload.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { start } from '../server.js';

const server = await start(0);
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`http://localhost:${server.address().port}`);

  assert.equal(await page.locator('#empty').isVisible(), true, 'empty message on first visit');

  await page.fill('#text', 'Buy milk');
  await page.press('#text', 'Enter');
  assert.equal(await page.locator('li').count(), 1);
  assert.equal(await page.locator('#empty').isVisible(), false, 'empty message hides with an item');

  await page.reload();
  assert.equal(await page.locator('li').count(), 1, 'item survives reload');

  await page.click('text=Delete');
  assert.equal(await page.locator('li').count(), 0);
  assert.equal(await page.locator('#empty').isVisible(), true, 'empty message returns');

  assert.deepEqual(errors, [], 'no console errors');
  console.log('e2e ok');
} finally {
  await browser.close();
  server.close();
}
