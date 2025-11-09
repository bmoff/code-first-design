# Code-First-Design

Code-First-Design is a small experiment in closing the gap between design and development. It's a framework for people who build directly in code and want to use AI editors, like Cursor or Claude Code, without ending up with a messy or inconsistent project.

It doesn't replace design tools or solve every workflow problem. It's just a simple structure that makes it easier to prototype and promote components safely inside your codebase.

## Quick Comparison

**Without Code-First-Design:**

```
❌ Components scattered: `components/`, `src/components/`, `app/components/`
❌ No demos or previews
❌ Draft code in production
❌ Inconsistent naming
```

**With Code-First-Design:**

```
✅ Clear structure: `components/draft/` vs `components/ui/`
✅ Demos at `/proto/components/[slug]`
✅ ESLint prevents draft imports in production
✅ Consistent patterns via rule files
```

## Why

Modern editors can now generate UI quickly, but they often lack structure. Files end up scattered, naming is inconsistent, and unfinished code can slip into production.

**The result:** You spend more time cleaning up AI-generated code than you save by using AI in the first place.

Code-First-Design adds a few simple guardrails:

* A clear folder layout for **draft** and **production** components.
* Three Cursor rule files that guide where AI-generated code should go.
* Validation and ESLint rules to stop experimental code from leaking into live builds.

The idea is to spend less time moving between Figma and code, and more time iterating directly where the product actually runs.

## Philosophy

Design and development are slowly merging. Designers are working closer to production code, and developers are prototyping faster than ever.

This project is a small step towards that future. It's not perfect and won't fit every team or project, but it's something we're experimenting with to see what works.

If you try it or have thoughts, we'd genuinely like to hear your feedback and ideas.

---

## Quick Start

### Option 1: Copy-Paste Prompt (Recommended)

Copy and paste this prompt into Cursor or your AI editor:

```
Set up Code-First-Design in this project. Create `components/draft`, `components/ui`, and `app/proto` folders, add three Cursor rule files (code-first-design-create.mdc, code-first-design-promote.mdc, design.mdc), a simple ExampleCard component with demo, ESLint fences, and a design system page at /proto.
```

### Option 2: Manual Setup

1. **Copy the framework files** from this repository into your Next.js project
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Add ESLint configuration** (see [ESLint Setup](#eslint-setup))
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
5. **Open the design system:**
   ```
   http://localhost:3000/proto
   ```

## Folder Structure

```
app/
  proto/
    _ds/
      DesignSystemNav.tsx
      registry.ts
      component-registry.ts
      component-validator.ts
      validate-components.ts
      validate-demos.ts
    _components/
      ProtoHeader.tsx
    components/
      [slug]/
        page.tsx          # Dynamic demo pages
    page.tsx               # Design system landing page
    layout.tsx             # Optional theme provider

components/
  draft/                  # Experimental components
  ui/                     # Production components (shadcn primitives)

.cursor/rules/
  code-first-design-create.mdc
  code-first-design-promote.mdc
  design.mdc             # Project-specific design principles
```

## Usage

### Creating a Draft Component

1. Ask your AI editor: "Create a draft component HeroCard with title and cta"
2. The AI will:
   - Create `components/draft/HeroCard.tsx`
   - Add it to the registry
   - Create a demo entry
3. View it at `/proto/components/hero-card`

### Promoting to Production

1. Ask your AI editor: "Promote HeroCard to production"
2. The AI will:
   - Move the file from `draft/` to `components/`
   - Update registry entries
   - Update imports
3. Run validation: `npm run validate-components`

## Validation

Run these commands to ensure everything is working:

```bash
# Validate all components can be imported and rendered
npm run validate-components

# Validate all components have demos
npm run validate:demos
```

## ESLint Setup

Add this to your `eslint.config.mjs`:

```js
{
  rules: {
    "no-restricted-imports": ["error", {
      patterns: [{
        group: ["**/components/draft/**", "**/components/draft/*"],
        message: "Draft components can only be imported in /proto routes."
      }]
    }]
  },
  overrides: [{
    files: ["**/app/proto/**/*", "**/app/dev/**/*"],
    rules: { "no-restricted-imports": "off" }
  }]
}
```

## Requirements

- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS
- ESLint

## How It Works

1. **Draft Components** live in `components/draft/` and can only be imported in `/proto` routes
2. **ESLint** blocks draft imports in production routes automatically
3. **Design System** at `/proto` shows all components with live demos
4. **Validation Scripts** ensure components can be imported and rendered
5. **Promotion** is simply moving files and updating registries

## Example Workflow

1. Ask Cursor: "Create a draft component HeroCard with title and cta."
2. Cursor adds `components/draft/HeroCard.tsx`, a demo page, and registry entries.
3. Open `/proto`, select HeroCard under Draft Components, and iterate.
4. When ready: "Promote HeroCard to production."
5. File moves out of `draft`, registries update, validation passes.
6. ESLint prevents any remaining draft imports in production routes.

## Contributing

This is an experimental project. We welcome feedback, issues, and pull requests!

## License

MIT

