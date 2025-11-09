import { createComponentRegistry, ComponentDemoConfig } from './component-validator';
import { ExampleCard } from '@/components/draft/ExampleCard';
import { defaultProps } from '@/components/draft/ExampleCard';

// Component configurations with proper props
export const COMPONENT_CONFIGS: Record<string, ComponentDemoConfig> = {
  'example-card': {
    componentName: 'ExampleCard',
    component: ExampleCard,
    defaultProps: defaultProps,
    fallbackMessage: 'ExampleCard failed to render.',
  },
};

// Create the validated registry
export const componentRegistry = createComponentRegistry(COMPONENT_CONFIGS);

// Export validation results for debugging
export const { validationResults, failedComponents, hasErrors } = componentRegistry;

// Log validation results in development
if (process.env.NODE_ENV === 'development') {
  if (hasErrors) {
    console.warn('Design System Component Validation Failed:', failedComponents);
  } else {
    console.log('✅ All Design System Components Validated Successfully');
  }
}

