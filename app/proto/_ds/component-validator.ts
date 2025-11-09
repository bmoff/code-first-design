/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface ComponentValidationResult {
  componentName: string;
  isValid: boolean;
  error?: string;
  canRender: boolean;
}

export interface ComponentDemoConfig {
  componentName: string;
  component: React.ComponentType<any>;
  defaultProps?: Record<string, any>;
  fallbackMessage?: string;
  isComplex?: boolean; // For layout components that need special handling
}

/**
 * Validates that a component can be imported and rendered
 */
export function validateComponent(config: ComponentDemoConfig): ComponentValidationResult {
  try {
    const { component: Component, defaultProps = {} } = config;
    
    // Test if component can be instantiated
    React.createElement(Component, defaultProps);
    
    return {
      componentName: config.componentName,
      isValid: true,
      canRender: true,
    };
  } catch (error) {
    return {
      componentName: config.componentName,
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      canRender: false,
    };
  }
}

/**
 * Creates a safe demo renderer with fallback
 */
export function createSafeDemoRenderer(
  config: ComponentDemoConfig,
  customRenderer?: (props: Record<string, any>) => React.ReactElement
): () => React.ReactElement {
  const SafeDemoRenderer = () => {
    const validation = validateComponent(config);
    
    if (!validation.canRender) {
      return React.createElement('div', { className: 'max-w-4xl mx-auto' },
        React.createElement('div', { className: 'text-sm text-muted-foreground text-center mb-4' },
          `${config.componentName} component`
        ),
        React.createElement('div', { className: 'border rounded-lg p-4 bg-destructive/10 min-h-[300px]' },
          React.createElement('div', { className: 'text-sm text-destructive text-center mb-2' },
            '⚠️ Component failed to load'
          ),
          React.createElement('div', { className: 'text-xs text-muted-foreground text-center' },
            validation.error || 'Unknown error occurred'
          ),
          config.fallbackMessage && React.createElement('div', { className: 'text-xs text-muted-foreground text-center mt-2' },
            config.fallbackMessage
          )
        )
      );
    }

    if (customRenderer) {
      return customRenderer(config.defaultProps || {});
    }

    // Default renderer
    const { component: Component, defaultProps = {} } = config;
    return React.createElement('div', { className: 'max-w-4xl mx-auto' },
      React.createElement('div', { className: 'text-sm text-muted-foreground text-center mb-4' },
        `${config.componentName} component`
      ),
      React.createElement('div', { className: 'border rounded-lg overflow-hidden' },
        React.createElement(Component, defaultProps)
      )
    );
  };
  
  SafeDemoRenderer.displayName = `SafeDemoRenderer(${config.componentName})`;
  return SafeDemoRenderer;
}

/**
 * Batch validate multiple components
 */
export function validateComponents(configs: ComponentDemoConfig[]): ComponentValidationResult[] {
  return configs.map(validateComponent);
}

/**
 * Create a comprehensive component registry with validation
 */
export function createComponentRegistry(components: Record<string, ComponentDemoConfig>) {
  const validationResults = validateComponents(Object.values(components));
  const failedComponents = validationResults.filter(result => !result.isValid);
  
  if (failedComponents.length > 0) {
    console.warn('Failed component validations:', failedComponents);
  }

  return {
    components,
    validationResults,
    failedComponents,
    hasErrors: failedComponents.length > 0,
  };
}

