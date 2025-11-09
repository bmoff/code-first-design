'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Palette, 
  Layers, 
  FlaskConical, 
  FileCode, 
  LayoutGrid, 
  ArrowRight,
} from 'lucide-react';
import { COMPONENT_CATEGORIES } from './registry';
import Link from 'next/link';

const CATEGORIES = [
  {
    id: 'customComponents' as const,
    label: 'Custom',
    description: 'Production-ready custom components',
    icon: FileCode,
  },
  {
    id: 'uiPrimitives' as const,
    label: 'UI Primitives',
    description: 'shadcn base components',
    icon: Layers,
  },
  {
    id: 'draftComponents' as const,
    label: 'Draft',
    description: 'Experimental components',
    icon: FlaskConical,
  },
  {
    id: 'prototypes' as const,
    label: 'Prototypes',
    description: 'Full flow prototypes',
    icon: LayoutGrid,
  },
];

export function DesignSystemNav() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof COMPONENT_CATEGORIES>('customComponents');

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeTab);
  const items = COMPONENT_CATEGORIES[activeTab];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Palette className="w-4 h-4" />
          Design System
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[800px] sm:max-w-[800px] border-l border-border/30">
        <SheetHeader className="pb-6 border-b border-border/20 px-6">
          <SheetTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="p-2 rounded-lg bg-primary/10">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            Design System
          </SheetTitle>
          <p className="text-muted-foreground text-sm">
            Browse and test components, prototypes, and experimental features
          </p>
        </SheetHeader>

        {/* Tab Navigation */}
        <div className="mt-6 px-6">
          <div className="flex flex-wrap gap-2 pb-4 border-b border-border/20">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const count = COMPONENT_CATEGORIES[category.id].length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`
                    group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === category.id 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  {count > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === category.id 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Content */}
        <div className="mt-6 px-6">
          {activeCategory && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{activeCategory.label}</h3>
              <p className="text-sm text-muted-foreground">
                {activeCategory.description}
              </p>
            </div>
          )}

          <ScrollArea className="h-[calc(100vh-22rem)]">
            {items.length > 0 ? (
              <div className="space-y-3 pb-6 pr-4">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="group block p-4 rounded-xl border border-border/30 hover:border-border/60 hover:bg-muted/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </div>
                        {'file' in item && (
                          <div className="text-xs text-muted-foreground mt-1 font-mono">
                            {item.file}
                          </div>
                        )}
                        {'description' in item && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/30 mb-4">
                  <p className="text-sm font-medium">No items yet</p>
                  <p className="text-xs mt-2">
                    Add items to the registry in <code className="text-xs bg-muted px-2 py-1 rounded">app/proto/_ds/registry.ts</code>
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

