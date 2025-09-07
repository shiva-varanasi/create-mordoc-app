#!/usr/bin/env node

// Import the createApp function from mordoc
const { createApp } = require('mordoc/dist/cli/create-app');

// Parse command line arguments
const args = process.argv.slice(2);
const projectName = args[0];

// Parse options
const options = {};
for (let i = 1; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--template' && args[i + 1]) {
    options.template = args[++i];
  } else if (arg === '--skip-install') {
    options.skipInstall = true;
  } else if (arg === '--git') {
    options.skipGit = false;
  }
}

// Check for required project name
if (!projectName) {
  console.error('Please specify a project name:');
  console.error('  npx create-mordoc-app my-docs');
  process.exit(1);
}

// Call the createApp function
createApp(projectName, options).catch(err => {
  console.error('Error creating project:', err);
  process.exit(1);
});