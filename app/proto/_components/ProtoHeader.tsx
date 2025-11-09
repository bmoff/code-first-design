'use client';

import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DesignSystemNav } from '../_ds/DesignSystemNav';

interface ProtoHeaderProps {
  component?: {
    name: string;
    type: 'UI Primitive' | 'Custom Component' | 'Draft Component' | 'Prototype' | 'Page';
    feature?: string;
    file?: string;
  };
  showBackButton?: boolean;
}

export function ProtoHeader({ component, showBackButton = true }: ProtoHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Left: Navigation */}
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Link href="/proto">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          )}
          <Link href="/proto">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Center: Component Info */}
        {component && (
          <div className="flex-1 flex items-center justify-center gap-3 px-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Viewing:</span>
              <span className="font-semibold">{component.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                component.type === 'UI Primitive' 
                  ? 'bg-blue-500/20 text-blue-500'
                  : component.type === 'Draft Component'
                  ? 'bg-orange-500/20 text-orange-500'
                  : component.type === 'Prototype'
                  ? 'bg-purple-500/20 text-purple-500'
                  : 'bg-green-500/20 text-green-500'
              }`}>
                {component.type}
              </span>
              {component.feature && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{component.feature}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Right: Design System Button */}
        <div className="flex items-center gap-2">
          <DesignSystemNav />
        </div>
      </div>
    </header>
  );
}

