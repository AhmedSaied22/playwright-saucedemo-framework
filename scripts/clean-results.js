const fs = require('fs');
const path = require('path');

const folders = ['allure-results', 'allure-report', 'playwright-report', 'test-results'];

for (const folder of folders) {
  const target = path.join(process.cwd(), folder);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`Deleted: ${folder}`);
  }
}