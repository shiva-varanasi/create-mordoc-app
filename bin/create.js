#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const start = Date.now();
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify a project name:');
  console.error('  npx create-mordoc-app my-docs');
  process.exit(1);
}

const projectDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(projectDir)) {
  console.error(`Error: directory "${projectName}" already exists.`);
  process.exit(1);
}

// Fetch latest mordoc version from npm
let mordocVersion;
try {
  mordocVersion = execSync('npm view mordoc version', { encoding: 'utf8' }).trim();
} catch (e) {
  console.error('Error: could not fetch mordoc version from npm. Are you online?');
  process.exit(1);
}

// Copy template into project directory
const templateDir = path.join(__dirname, '..', 'template');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(templateDir, projectDir);

// Substitute {{projectName}} in config/site.json
const siteJsonPath = path.join(projectDir, 'config', 'site.json');
const siteJson = fs.readFileSync(siteJsonPath, 'utf8');
fs.writeFileSync(siteJsonPath, siteJson.replace(/\{\{projectName\}\}/g, projectName));

// Generate .gitignore
fs.writeFileSync(
  path.join(projectDir, '.gitignore'),
  'node_modules/\ndist/\n'
);

// Generate package.json
const pkg = {
  name: projectName,
  version: '0.0.1',
  private: true,
  scripts: {
    dev: 'mordoc dev',
    build: 'mordoc build',
  },
  devDependencies: {
    mordoc: `^${mordocVersion}`,
  },
};
fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(pkg, null, 2) + '\n'
);

// Run npm install
console.log(`\nScaffolding "${projectName}"...`);
const result = spawnSync('npm', ['install'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true,
});

if (result.status !== 0) {
  console.error('\nError: npm install failed.');
  process.exit(1);
}

const duration = ((Date.now() - start) / 1000).toFixed(1);

console.log(`\n✨ Success! Created ${projectName} in ${duration}s\n`);
console.log('Your documentation project is ready!\n');
console.log('Get started with:\n');
console.log(`  cd ${projectName}\n`);
console.log('Next steps:\n');
console.log('  1. Edit your content in content directory');
console.log('  2. Customize the configuration for your documentation website in config directory');
console.log('  4. Run npm run dev to preview locally');
console.log('  5. Run npm run build to generate your site\n');
console.log('Full documentation at https://mordoc.dev\n');
console.log('Happy documenting! 📚\n');