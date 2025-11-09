# Code-First-Design

Design and development are converging. AI-powered IDEs are becoming increasingly visual and context-aware, while design tools are adding code generation features. The boundaries between designing and coding are fading.

Despite this shift, most workflows still assume a strict handoff: designers work in design tools like Figma, developers rebuild their work in code, and AI tools generate unstructured snippets that don't fit neatly into existing projects. This creates duplication, inconsistency, and friction.

Code-First-Design starts from a simple idea: if most of the real product experience already lives in code, then design and prototyping should live there too. Instead of switching tools or formats, developers can prototype, validate, and promote components within the same environment, guided by light project rules and structure that AI can understand.

This is a lightweight framework for organising UI components in Next.js projects that use AI coding assistants. It works with Cursor, Claude Code, and other AI editors that support rule files (like .mdc files). It offers a simple structure for prototyping and promoting components.

We're still experimenting with how this works in production and welcome feedback. It doesn't replace design tools or solve every workflow problem, but we're finding it useful for our own projects and want to see if it helps others too.

## Problems Code-First-Design Solves

**Duplicate work between design and code**

Developers often design components in Figma, then rebuild them in code. This doubles the effort and slows iteration.

**Fragmented workflows**

Product managers, designers, and developers work in separate tools with handoffs between each stage. This creates friction and lost context.

**Unnecessary divide between design and development**

Modern frontend frameworks and AI tools make it possible to design directly in code, yet the tools remain siloed.

**Too much overhead for solo or small-team developers**

Individual builders don't have time to master both design tools and codebases. They need one environment for both.

**Lack of integrated, AI-friendly structure**

AI editors like Cursor can generate UI fast, but without clear structure or context. There's no system for prototypes, validation, or promoting work safely to production.

Code-First-Design offers a simple structure that lets you design and iterate directly in code, with guardrails to keep things organised and safe.

## Setup

This framework requires Next.js 15+ (App Router), React 19+, TypeScript, Tailwind CSS, and ESLint.

Copy and paste this prompt into your AI editor (Cursor Composer, Claude Code, or any AI tool that can access this repository). If you're using Cursor or another tool that supports .mdc rule files, those will be set up automatically. Other AI tools can still use the framework, but won't have the automatic rule guidance.

```
Set up Code-First-Design in this Next.js project. Code-First-Design is a framework for organising UI components with a clear separation between draft (experimental) and production components. It provides a design system at /proto where you can preview and iterate on components before promoting them to production.

The system works with three registries:
1. Component Registry (registry.ts) - Lists all components with metadata, organised by category
2. Component Config (component-registry.ts) - Imports component code and defines default props
3. Demo Renderers ([slug]/page.tsx) - Maps component slugs to demo functions

Draft components live in components/draft/ and can only be imported in /proto routes. ESLint blocks draft imports in production routes. When ready, components are promoted by moving them from draft/ to components/ and updating the registries.

Reference the code-first-design repository at https://github.com/bmoff/code-first-design (or use the local repository if it's open) and copy all the framework files.

Create the following folder structure:
- components/draft/ - Experimental components that can only be imported in /proto routes
- components/ui/ - Production components (shadcn primitives)
- app/proto/_ds/ - Design system internals (registries, validators, navigation)
- app/proto/_components/ - Shared components for the design system pages
- app/proto/components/[slug]/ - Dynamic route for individual component demos
- .cursor/rules/ - Cursor rule files that guide AI to follow Code-First-Design patterns
- scripts/ - Validation scripts

Copy all files from the repository:
1. From app/proto/_ds/: 
   - DesignSystemNav.tsx - Navigation sheet component
   - registry.ts - Component registry with metadata (name, path, file location)
   - component-registry.ts - Component configs with imports and default props
   - component-validator.ts - Validation utilities for checking components can render
   - validate-components.ts - Script to validate all components
   - validate-demos.ts - Demo validation utilities
2. From app/proto/_components/: ProtoHeader.tsx - Header component for design system pages
3. From app/proto/components/[slug]/: page.tsx - Dynamic component showcase page
4. From app/proto/: page.tsx (design system landing page), layout.tsx (layout wrapper)
5. From components/draft/: ExampleCard.tsx - Example draft component with defaultProps export
6. From .cursor/rules/: 
   - code-first-design-create.mdc - Rules for creating new draft components
   - code-first-design-promote.mdc - Rules for promoting components to production
   - design.mdc - Template for project-specific design principles
7. From scripts/: validate-demos.js - Script to validate all components have demos

Install dependencies:
- npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-scroll-area @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge
- npm install --save-dev tsx

Configure ESLint to block draft imports in production: Add to your eslint.config.mjs array (if using flat config):
{
  rules: {
    "no-restricted-imports": ["error", {
      patterns: [{
        group: ["**/components/draft/**", "**/components/draft/*"],
        message: "Draft components can only be imported in /proto routes."
      }]
    }]
  }
},
{
  files: ["**/app/proto/**/*", "**/app/dev/**/*"],
  rules: { "no-restricted-imports": "off" }
}

Add validation scripts to package.json:
"validate-components": "tsx app/proto/_ds/validate-components.ts",
"validate:demos": "node scripts/validate-demos.js"

Verify setup: Run npm run dev and check that http://localhost:3000/proto loads the design system landing page, and that the Example Card component demo works at /proto/components/example-card.
```

## Folder Structure

The framework creates this structure:

```
app/
  proto/
    _ds/                    # Design system internals
      DesignSystemNav.tsx   # Navigation component
      registry.ts            # Component registry
      component-registry.ts # Component configs
      component-validator.ts # Validation utilities
      validate-components.ts # Validation script
      validate-demos.ts      # Demo validation utilities
    _components/
      ProtoHeader.tsx        # Header component
    components/
      [slug]/
        page.tsx             # Dynamic demo pages
    page.tsx                 # Design system landing page
    layout.tsx               # Layout wrapper

components/
  draft/                     # Experimental components
  ui/                        # Production components (shadcn primitives)

.cursor/rules/
  code-first-design-create.mdc
  code-first-design-promote.mdc
  design.mdc                 # Project-specific design principles
```

## Usage

### Creating a Draft Component

1. Ask your AI editor: "Create a draft component HeroCard with title and cta"
2. The AI will automatically:
   - Create `components/draft/HeroCard.tsx`
   - Add it to the registry in `app/proto/_ds/registry.ts`
   - Add a demo config in `app/proto/_ds/component-registry.ts`
   - Create a demo entry in `app/proto/components/[slug]/page.tsx`
3. View it at `/proto/components/hero-card`

The Cursor rule files are typically included automatically when working on TypeScript or TSX files. The AI should follow the Code-First-Design patterns. If you want to be sure, you can explicitly reference the rule in your prompt, for example: "Create a draft component HeroCard following the code-first-design-create rule."

### Promoting to Production

When a component is ready for production:

1. Ask your AI editor: "Promote HeroCard to production"
2. The AI will automatically:
   - Move the file from `components/draft/` to `components/` (or your preferred location)
   - Update registry entries (move from `draftComponents` to `customComponents`)
   - Update imports in demo files
3. Run validation to check everything still works:
   ```bash
   npm run validate-components
   npm run validate:demos
   ```

ESLint will automatically prevent any remaining draft imports in production routes.

## Validation

The framework includes two validation scripts:

**Validate components:**
```bash
npm run validate-components
```

This checks that all components can be imported and rendered without errors.

**Validate demos:**
```bash
npm run validate:demos
```

This checks that every component in the registry has a corresponding demo implementation.

Run these regularly, especially after creating or promoting components.

## How It Works

The framework uses a simple three-part system:

1. Component Registry (`registry.ts`) - Lists all components with metadata (name, path, file location), organised by category (UI primitives, custom components, draft components, prototypes)

2. Component Config (`component-registry.ts`) - Imports actual component code, defines default props, and provides fallback messages for error states

3. Demo Renderers (`[slug]/page.tsx`) - Maps component slugs to demo renderer functions that display components in the design system

When you visit `/proto`, the landing page reads from the registry and displays all components. When you click a component, it looks up the demo renderer and displays it with usage instructions and documentation.

Draft components live in `components/draft/` and can only be imported in `/proto` routes. ESLint blocks draft imports in production routes automatically. When you promote a component, you move the file and update the registries.

## Requirements

- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS
- ESLint

## AI Tool Compatibility

Code-First-Design works with any AI coding assistant. The Cursor rule files (.mdc) provide automatic guidance in Cursor and other tools that support them. If your AI tool doesn't support rule files, you can still use the framework by manually following the patterns described in those rule files when creating or promoting components.

## Example Workflow

1. Ask Cursor: "Create a draft component HeroCard with title and cta."
2. Cursor adds `components/draft/HeroCard.tsx`, updates the registries, and creates a demo entry.
3. Open `/proto`, select HeroCard under Draft Components, and iterate on the design.
4. When ready: "Promote HeroCard to production."
5. File moves out of `draft/`, registries update, validation passes.
6. ESLint prevents any remaining draft imports in production routes.

## Contributing

This is an experimental project. We're still learning how this works in production and actively incorporating feedback. We welcome issues, pull requests, and thoughts on how to improve the framework.

## License

MIT
