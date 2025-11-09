'use client';

import { Sparkles } from 'lucide-react';

/**
 * Example Draft Component
 * 
 * This is an experimental component that demonstrates the draft workflow.
 * It can only be imported in /proto, /dev, or /test routes.
 * 
 * When ready for production:
 * 1. Move this file from components/draft/ to components/
 * 2. Update imports across the codebase
 * 3. Update registry.ts to move from draftComponents to customComponents
 * 4. That's it!
 */

export interface ExampleCardProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'experimental' | 'wip';
}

export const defaultProps: ExampleCardProps = {
  title: 'Draft Component',
  description: 'This is an experimental component that cannot be imported in production routes.',
  variant: 'experimental',
};

export function ExampleCard({ 
  title = 'Draft Component',
  description = 'This is an experimental component that cannot be imported in production routes.',
  variant = 'experimental'
}: ExampleCardProps) {
  const variantStyles = {
    default: 'border-border bg-background',
    experimental: 'border-orange-500/20 bg-orange-500/5',
    wip: 'border-blue-500/20 bg-blue-500/5',
  };

  const variantBadges = {
    default: { text: 'Draft', color: 'bg-muted text-muted-foreground' },
    experimental: { text: 'Experimental', color: 'bg-orange-500/20 text-orange-500' },
    wip: { text: 'Work in Progress', color: 'bg-blue-500/20 text-blue-500' },
  };

  const badge = variantBadges[variant];

  return (
    <div className={`p-6 rounded-xl border ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-500/20">
            <Sparkles className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">Located in components/draft/</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
          {badge.text}
        </span>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
        <p className="text-sm font-mono text-accent">
          ✅ Can import in /proto routes
        </p>
        <p className="text-sm font-mono text-destructive mt-1">
          ❌ Blocked in production routes (ESLint)
        </p>
      </div>
    </div>
  );
}

