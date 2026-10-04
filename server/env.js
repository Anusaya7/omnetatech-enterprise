import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function unquote(value) {
  if (value.length >= 2) {
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
      return value.slice(1, -1);
    }
  }
  return value;
}

// Load application-root .env for Hostinger and local starts.
// Variables already provided by the host stay in place.
export function loadEnvFile() {
  const filePath = path.join(rootDir, '.env');
  if (!fs.existsSync(filePath)) return;

  let text;
  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn('Could not read .env file:', error.message);
    return;
  }

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    if (process.env[key] !== undefined) continue;
    process.env[key] = unquote(trimmed.slice(eq + 1).trim());
  }
}

loadEnvFile();
