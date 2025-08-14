#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const environments = ['development', 'staging', 'production'];
const projects = [
  { name: 'frontend-admin', path: 'apps/frontend-admin' },
  { name: 'frontend-customer', path: 'apps/frontend-customer' },
  { name: 'backend', path: 'apps/backend' }
];

console.log('🔍 Environment Configuration Check\n');

// Check root environment files
console.log('📁 Root Environment Files:');
environments.forEach(env => {
  const filePath = `.env.${env}`;
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${filePath}`);
});

console.log('\n📁 Project Environment Files:');
projects.forEach(project => {
  console.log(`\n  ${project.name}:`);
  environments.forEach(env => {
    const filePath = path.join(project.path, `.env.${env}`);
    const exists = fs.existsSync(filePath);
    console.log(`    ${exists ? '✅' : '❌'} .env.${env}`);
  });
});

// Check for .env.local files (should be gitignored)
console.log('\n🔒 Local Environment Files (should be gitignored):');
projects.forEach(project => {
  const filePath = path.join(project.path, '.env.local');
  const exists = fs.existsSync(filePath);
  console.log(`  ${project.name}: ${exists ? '✅ Found' : '❌ Not found'} .env.local`);
});

console.log('\n✨ Environment check complete!');