#!/usr/bin/env node

import { componentRegistry, COMPONENT_CONFIGS } from './component-registry';

/**
 * Validates all components in the design system
 * This script can be run to check if all components are properly configured
 */
export function validateAllComponents() {
  console.log('🔍 Validating Design System Components...\n');
  
  const { validationResults, failedComponents, hasErrors } = componentRegistry;
  
  // Log successful components
  const successfulComponents = validationResults.filter(result => result.isValid);
  console.log(`✅ ${successfulComponents.length} components validated successfully:`);
  successfulComponents.forEach(result => {
    console.log(`   - ${result.componentName}`);
  });
  
  // Log failed components
  if (failedComponents.length > 0) {
    console.log(`\n❌ ${failedComponents.length} components failed validation:`);
    failedComponents.forEach(result => {
      console.log(`   - ${result.componentName}: ${result.error}`);
    });
  }
  
  // Summary
  console.log(`\n📊 Summary:`);
  console.log(`   Total components: ${validationResults.length}`);
  console.log(`   Successful: ${successfulComponents.length}`);
  console.log(`   Failed: ${failedComponents.length}`);
  console.log(`   Success rate: ${Math.round((successfulComponents.length / validationResults.length) * 100)}%`);
  
  if (hasErrors) {
    console.log('\n⚠️  Some components failed validation. Check the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All components validated successfully!');
    process.exit(0);
  }
}

/**
 * Validates a specific component by name
 */
export function validateComponent(componentName: string) {
  const config = COMPONENT_CONFIGS[componentName];
  if (!config) {
    console.error(`❌ Component "${componentName}" not found in registry`);
    return false;
  }
  
  const { validationResults } = componentRegistry;
  const result = validationResults.find(r => r.componentName === config.componentName);
  
  if (result?.isValid) {
    console.log(`✅ Component "${componentName}" is valid`);
    return true;
  } else {
    console.log(`❌ Component "${componentName}" failed validation: ${result?.error}`);
    return false;
  }
}

// Run validation when script is executed
validateAllComponents();

