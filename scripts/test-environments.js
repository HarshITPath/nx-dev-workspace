#!/usr/bin/env node

const { spawn } = require('child_process');
const environments = ['development', 'staging', 'production'];

async function testEnvironment(env) {
  console.log(`\n🧪 Testing ${env} environment...`);
  
  return new Promise((resolve) => {
    const backend = spawn('npm', ['run', `dev:backend:${env}`], {
      stdio: 'pipe'
    });
    
    let output = '';
    backend.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    backend.stderr.on('data', (data) => {
      output += data.toString();
    });
    
    // Kill after 5 seconds and check output
    setTimeout(() => {
      backend.kill();
      
      console.log(`Environment: ${env}`);
      console.log(`Output contains environment: ${output.includes(env) ? '✅' : '❌'}`);
      console.log(`Server started: ${output.includes('Server is running') ? '✅' : '❌'}`);
      
      resolve();
    }, 5000);
  });
}

async function runTests() {
  console.log('🚀 Testing all environments...');
  
  for (const env of environments) {
    await testEnvironment(env);
  }
  
  console.log('\n✨ All environment tests complete!');
}

runTests().catch(console.error);