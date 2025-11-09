/**
 * Validation utility to ensure all components have demos
 * Run this during development to catch missing demos early
 */

import { COMPONENT_CATEGORIES } from './registry';

export interface ValidationResult {
  valid: boolean;
  missing: string[];
  total: number;
  implemented: number;
}

/**
 * Get all component slugs that should have demos
 */
export function getAllComponentSlugs(): string[] {
  const allComponents = [
    ...COMPONENT_CATEGORIES.uiPrimitives,
    ...COMPONENT_CATEGORIES.customComponents,
    ...COMPONENT_CATEGORIES.draftComponents,
  ];

  return allComponents.map(component => {
    // Extract slug from path (e.g., "/proto/components/button" -> "button")
    const slug = component.path.split('/').pop();
    return slug || '';
  }).filter(Boolean);
}

/**
 * Validate that all components have demos
 * This should match the keys in COMPONENT_DEMOS
 */
export function validateDemos(implementedDemos: string[]): ValidationResult {
  const allSlugs = getAllComponentSlugs();
  const missing = allSlugs.filter(slug => !implementedDemos.includes(slug));

  return {
    valid: missing.length === 0,
    missing,
    total: allSlugs.length,
    implemented: implementedDemos.length,
  };
}

/**
 * Get a friendly report of validation results
 */
export function getValidationReport(result: ValidationResult): string {
  if (result.valid) {
    return `✅ All ${result.total} components have demos implemented!`;
  }

  return `
❌ Missing demos for ${result.missing.length} component(s):
${result.missing.map(slug => `  - ${slug}`).join('\n')}

Progress: ${result.implemented}/${result.total} demos implemented (${Math.round((result.implemented / result.total) * 100)}%)

To fix: Add these slugs to COMPONENT_DEMOS in app/proto/components/[slug]/page.tsx
  `.trim();
}

