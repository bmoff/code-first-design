'use client';

import { Code } from 'lucide-react';
import { ExampleCard } from '@/components/draft/ExampleCard';
import { defaultProps } from '@/components/draft/ExampleCard';
import { COMPONENT_CONFIGS } from '@/app/proto/_ds/component-registry';
import { createSafeDemoRenderer } from '@/app/proto/_ds/component-validator';
import { COMPONENT_CATEGORIES } from '../../_ds/registry';
import { validateDemos, getValidationReport } from '../../_ds/validate-demos';
import { ProtoHeader } from '../../_components/ProtoHeader';
import { notFound } from 'next/navigation';
import { use } from 'react';

// Component demo renderers
const COMPONENT_DEMOS: Record<string, () => React.ReactElement> = {
  'example-card': () => <ExampleCard {...defaultProps} />,
};

// Validate demos in development
if (process.env.NODE_ENV === 'development') {
  const validationResult = validateDemos(Object.keys(COMPONENT_DEMOS));
  if (!validationResult.valid) {
    console.warn(getValidationReport(validationResult));
  }
}

export default function ComponentShowcase({ params }: { params: Promise<{ slug: string }> }) {
  // Await params (Next.js 15 requirement)
  const { slug } = use(params);

  // Find the component in the registry
  const allComponents = [
    ...COMPONENT_CATEGORIES.uiPrimitives,
    ...COMPONENT_CATEGORIES.customComponents,
    ...COMPONENT_CATEGORIES.draftComponents,
  ];

  const component = allComponents.find(
    (c) => c.path === `/proto/components/${slug}`
  );

  if (!component) {
    notFound();
  }

  // Determine component type
  const isDraft = COMPONENT_CATEGORIES.draftComponents.some((c) => c.name === component.name);
  const isUI = COMPONENT_CATEGORIES.uiPrimitives.some((c) => c.name === component.name);
  const isCustom = COMPONENT_CATEGORIES.customComponents.some((c) => c.name === component.name);

  const componentType = isDraft 
    ? 'Draft Component' 
    : isUI 
    ? 'UI Primitive' 
    : 'Custom Component';

  const badgeColor = isDraft 
    ? 'bg-orange-500/20 text-orange-500' 
    : isUI 
    ? 'bg-blue-500/20 text-blue-500'
    : 'bg-green-500/20 text-green-500';

  // Get the demo component
  const DemoComponent = COMPONENT_DEMOS[slug];

  return (
    <>
      <ProtoHeader 
        component={{
          name: component.name,
          type: componentType as 'UI Primitive' | 'Custom Component' | 'Draft Component' | 'Prototype' | 'Page',
          file: 'file' in component ? component.file : undefined
        }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{component.name}</h1>
            <p className="text-muted-foreground">
              {'file' in component ? `Interactive component showcase and documentation` : 'Prototype flow'}
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm">
              {'file' in component && (
                <code className="px-2 py-1 rounded bg-muted text-xs">
                  {component.file}
                </code>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
                {componentType}
              </span>
            </div>
          </div>

          {/* Live Demo */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Live Demo</h2>
              <div className="p-8 rounded-xl border border-border/30 bg-card">
                {DemoComponent ? (
                  <DemoComponent />
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <p className="text-sm">
                      Demo not yet implemented for this component.
                    </p>
                    <p className="text-xs mt-4 opacity-60">
                      Add a demo by updating the COMPONENT_DEMOS object in this file.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Info */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Usage</h2>
              <div className="p-6 rounded-xl border border-border/30 bg-card">
                <div className="flex items-start gap-3">
                  <Code className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Import & Usage</h3>
                    <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                      {isDraft 
                        ? `// ✅ OK in /proto routes only\nimport { ${component.name.replace(/\s+/g, '')} } from '@/${component.file?.replace('.tsx', '')}';\n\n// ❌ BLOCKED in production routes\n// ESLint error: "Draft components are experimental only"`
                        : isUI
                        ? `import { ${component.name.replace(/\s+/g, '')} } from '@/${component.file?.replace('.tsx', '')}';\n\n// shadcn/ui primitive - production ready`
                        : `import ${component.name.replace(/\s+/g, '')} from '@/${component.file?.replace('.tsx', '')}';\n\n// Custom component - production ready`
                      }
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Documentation</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="p-6 rounded-xl border border-border/30 bg-card">
                  <h3>About {component.name}</h3>
                  <p className="text-muted-foreground">
                    {isDraft && "This is a draft component for experimentation. Move to production when ready."}
                    {isUI && "This is a shadcn/ui primitive component. See the shadcn documentation for full details."}
                    {isCustom && "This is a custom production-ready component built for this project."}
                  </p>
                  
                  {isDraft && (
                    <div className="mt-6 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                      <h4 className="text-sm font-semibold mb-2">Moving to Production</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Move file from <code className="text-xs bg-muted px-1 py-0.5 rounded">components/draft/</code> to <code className="text-xs bg-muted px-1 py-0.5 rounded">components/</code></li>
                        <li>Update imports across the codebase</li>
                        <li>Update registry.ts to move from draftComponents to customComponents</li>
                      </ol>
                    </div>
                  )}

                  {isUI && (
                    <div className="mt-6">
                      <p className="text-sm">
                        <strong>shadcn/ui documentation:</strong>{' '}
                        <a 
                          href={`https://ui.shadcn.com/docs/components/${slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View official docs →
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

