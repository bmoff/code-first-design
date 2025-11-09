/**
 * Design System Registry
 * 
 * Manually maintained list of components, prototypes, and pages
 * for the prototype/design system showcase.
 */

export const COMPONENT_CATEGORIES = {
  uiPrimitives: [
    // Add shadcn/ui primitives here as needed
    // Example: { name: "Button", path: "/proto/components/button", file: "components/ui/button.tsx" },
  ],
  
  customComponents: [
    // Production-ready custom components go here
  ],
  
  draftComponents: [
    { 
      name: "Example Card", 
      path: "/proto/components/example-card", 
      file: "components/draft/ExampleCard.tsx" 
    },
  ],
  
  prototypes: [
    // Full prototype flows go here
    // Example: { name: "My Prototype", path: "/proto/prototypes/my-prototype", description: "Description of prototype" },
  ],
  
  pages: [
    // Individual page mocks go here
  ],
} as const;

export type ComponentCategory = keyof typeof COMPONENT_CATEGORIES;
export type ComponentItem = typeof COMPONENT_CATEGORIES[ComponentCategory][number];

