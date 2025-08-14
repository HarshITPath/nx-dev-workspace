#!/usr/bin/env node
/**
 * Run a command with environment variables selected from a single .env file per app.
 *
 * Usage:
 *   node scripts/run-with-env.cjs --file apps/backend/.env --env development -- node dist/apps/backend/main.js
 *   node scripts/run-with-env.cjs --file apps/frontend-admin/.env --env staging -- nx run frontend-admin:build:staging
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function parseArgs(argv) {
  const result = { file: null, env: null, cmd: [] };
  const sepIndex = argv.indexOf('--');
  const before = sepIndex === -1 ? argv : argv.slice(0, sepIndex);
  const after = sepIndex === -1 ? [] : argv.slice(sepIndex + 1);

  for (let i = 0; i < before.length; i++) {
    const arg = before[i];
    if (arg === '--file') {
      result.file = before[++i];
    } else if (arg === '--env') {
      result.env = before[++i];
    }
  }

  if (!result.file || !result.env) {
    console.error('Usage: run-with-env --file <path/to/.env> --env <development|staging|production> -- <command> [args...]');
    process.exit(1);
  }

  result.cmd = after;
  if (result.cmd.length === 0) {
    console.error('You must provide a command after --');
    process.exit(1);
  }
  return result;
}

function parseEnvSections(content, selectedEnv) {
  const lines = content.split(/\r?\n/);
  const out = {};
  let current = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const sectionMatch = line.match(/^\[(.+?)\]$/);
    if (sectionMatch) {
      current = sectionMatch[1].trim();
      continue;
    }
    if (current !== selectedEnv) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    out[key] = value;
  }
  return out;
}

function run() {
  const argv = process.argv.slice(2);
  const { file, env, cmd } = parseArgs(argv);
  const envPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(envPath)) {
    console.error(`.env file not found: ${envPath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const selected = parseEnvSections(content, env);
  if (Object.keys(selected).length === 0) {
    console.error(`No variables found for section [${env}] in ${envPath}`);
    process.exit(1);
  }

  const childEnv = { ...process.env, NODE_ENV: env };
  for (const [k, v] of Object.entries(selected)) {
    childEnv[k] = v;
  }

  const child = spawn(cmd[0], cmd.slice(1), {
    stdio: 'inherit',
    env: childEnv,
    shell: process.platform === 'win32',
  });

  child.on('exit', (code) => process.exit(code ?? 0));
}

run();


