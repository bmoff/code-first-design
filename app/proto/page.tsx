'use client';

import { Palette, Layers, FlaskConical, FileCode, LayoutGrid, ArrowRight, Zap } from 'lucide-react';
import { COMPONENT_CATEGORIES } from './_ds/registry';
import { ProtoHeader } from './_components/ProtoHeader';
import Link from 'next/link';

const STATS = [
  {
    label: 'UI Primitives',
    count: COMPONENT_CATEGORIES.uiPrimitives.length,
    icon: Layers,
    color: 'text-primary',
    description: 'Base components',
  },
  {
    label: 'Custom Components',
    count: COMPONENT_CATEGORIES.customComponents.length,
    icon: FileCode,
    color: 'text-accent',
    description: 'Production ready',
  },
  {
    label: 'Draft Components',
    count: COMPONENT_CATEGORIES.draftComponents.length,
    icon: FlaskConical,
    color: 'text-orange-500',
    description: 'Experimental',
  },
  {
    label: 'Prototypes',
    count: COMPONENT_CATEGORIES.prototypes.length,
    icon: LayoutGrid,
    color: 'text-purple-500',
    description: 'Full flows',
  },
];

export default function ProtoPage() {
  return (
    <>
      <ProtoHeader showBackButton={false} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 relative overflow-hidden">
        {/* Gradient orbs for depth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 mb-8 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-accent" />
              Prototype Environment
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Design System
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Browse components, prototypes, and experimental features.
              <br />
              Click the <Palette className="inline w-4 h-4 mx-1" /> button to navigate.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group p-6 rounded-xl bg-card border border-border/30 hover:border-border/60 transition-all duration-300 text-center"
                  >
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.count}</div>
                    <div className="text-sm text-muted-foreground mb-4">components</div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg bg-muted/50 ${stat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-foreground">{stat.label}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Component Library Sections */}
            <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Component Library</h2>
              
              <div className="grid gap-6">
                {/* Custom Components */}
                {COMPONENT_CATEGORIES.customComponents.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-accent/10">
                        <FileCode className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">Custom Components</h3>
                        <p className="text-muted-foreground">Production-ready components</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {COMPONENT_CATEGORIES.customComponents.map((component) => (
                        <Link
                          key={component.name}
                          href={component.path}
                          className="group/link flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted border border-border/30 hover:border-border/60 transition-all duration-200"
                        >
                          <span className="text-sm font-medium">{component.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prototypes */}
                {COMPONENT_CATEGORIES.prototypes.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-purple-500/10">
                        <LayoutGrid className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">Full Prototypes</h3>
                        <p className="text-muted-foreground">Complete application flows</p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {COMPONENT_CATEGORIES.prototypes.map((prototype) => (
                        <Link
                          key={prototype.name}
                          href={prototype.path}
                          className="group/proto p-6 rounded-xl bg-card border border-border/30 hover:border-border/60 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-foreground mb-2 group-hover/proto:text-accent transition-colors">
                                {prototype.name}
                              </h4>
                              {'description' in prototype && (
                                <p className="text-sm text-muted-foreground mb-3">{prototype.description}</p>
                              )}
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover/proto:text-accent group-hover/proto:translate-x-1 transition-all flex-shrink-0 ml-4" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* UI Primitives */}
                {COMPONENT_CATEGORIES.uiPrimitives.length > 0 && (
                  <div className="group p-8 rounded-2xl bg-card border border-border/30 hover:border-border/60 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Layers className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">UI Primitives</h3>
                        <p className="text-muted-foreground">shadcn/ui base components</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {COMPONENT_CATEGORIES.uiPrimitives.map((component) => (
                        <Link
                          key={component.name}
                          href={component.path}
                          className="group/link flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted border border-border/30 hover:border-border/60 transition-all duration-200"
                        >
                          <span className="text-sm font-medium">{component.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Draft Components */}
                <div className="group p-8 rounded-2xl bg-card border border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-orange-500/10">
                      <FlaskConical className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">Draft Components</h3>
                      <p className="text-muted-foreground">Experimental components that can&apos;t be imported in production</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-sm font-medium">
                      Experimental
                    </span>
                  </div>
                  {COMPONENT_CATEGORIES.draftComponents.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {COMPONENT_CATEGORIES.draftComponents.map((component) => (
                        <Link
                          key={component.name}
                          href={component.path}
                          className="group/link flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-200"
                        >
                          <span className="text-sm font-medium">{component.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-lg bg-muted/30 border border-border/30">
                      <p className="text-sm text-muted-foreground">
                        No draft components yet. Create your first in <code className="text-xs bg-muted px-2 py-1 rounded">components/draft/</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="max-w-4xl mx-auto mt-12 p-6 rounded-xl border border-accent/20 bg-accent/5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                About This Space
              </h3>
              <p className="text-sm text-muted-foreground">
                This is the prototype environment where you can experiment freely. 
                Draft components can only be imported here - they&apos;re blocked in production routes by ESLint.
                When a component is ready, simply move it from <code className="text-xs">components/draft/</code> to <code className="text-xs">components/</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

