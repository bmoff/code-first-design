#!/usr/bin/env node
/**
 * Validate that all components in the registry have demo implementations
 * Run with: npm run validate:demos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the registry
const registryPath = path.join(__dirname, '../app/proto/_ds/registry.ts');
const showcasePath = path.join(__dirname, '../app/proto/components/[slug]/page.tsx');

console.log('🔍 Validating component demos...\n');

try {
  const registryContent = fs.readFileSync(registryPath, 'utf8');
  const showcaseContent = fs.readFileSync(showcasePath, 'utf8');

  // Extract all component paths from registry
  const pathRegex = /path:\s*["']\/proto\/components\/([^"']+)["']/g;
  const registryPaths = [];
  let match;
  
  while ((match = pathRegex.exec(registryContent)) !== null) {
    registryPaths.push(match[1]);
  }

  // Extract all demo keys from COMPONENT_DEMOS
  const demoRegex = /['"]([a-z-]+)['"]\s*:\s*(?:\(\)\s*=>|createSafeDemoRenderer)/g;
  const demoPaths = [];
  
  // Find the COMPONENT_DEMOS object
  const demosStart = showcaseContent.indexOf('const COMPONENT_DEMOS');
  const demosEnd = showcaseContent.indexOf('\n};', demosStart);
  const demosSection = showcaseContent.substring(demosStart, demosEnd);
  
  while ((match = demoRegex.exec(demosSection)) !== null) {
    demoPaths.push(match[1]);
  }

  // Find missing demos
  const missing = registryPaths.filter(path => !demoPaths.includes(path));

  if (missing.length === 0) {
    console.log(`✅ All ${registryPaths.length} components have demos implemented!`);
    console.log(`\n📊 Coverage: 100%`);
    process.exit(0);
  } else {
    console.log(`❌ Missing demos for ${missing.length} component(s):\n`);
    missing.forEach(slug => {
      console.log(`  - ${slug}`);
    });
    console.log(`\n📊 Coverage: ${demoPaths.length}/${registryPaths.length} (${Math.round((demoPaths.length / registryPaths.length) * 100)}%)`);
    console.log(`\n💡 Add these slugs to COMPONENT_DEMOS in:`);
    console.log(`   app/proto/components/[slug]/page.tsx\n`);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error validating demos:', error.message);
  process.exit(1);
}

