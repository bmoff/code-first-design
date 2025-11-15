# Code-First-Design

Design and development are moving closer together through AI-assisted and component-driven workflows. Tools such as Cursor and Lovable now let developers, designers, and product managers work with code and design in the same place. At the same time, design tools like Figma are starting to generate working code from designs.

However, AI-assisted tools often lack the context or structure to produce code that is consistently ready for production or easy to scale.

Most teams still rely on a traditional handoff process. Product managers write specifications, designers create mock-ups, and developers rebuild them in code. This duplication slows down iteration and creates friction, even as AI becomes part of everyday work.

**Code-First-Design** starts from a simple bet: design and code will continue to merge. If most of the real product experience already lives in code, it should also be the place where teams experiment, validate ideas, and shape how components evolve.

The framework helps both technical and non-technical contributors design, test, and promote components directly inside a Next.js project. It introduces a clear structure that makes this process easier for people and AI tools to follow, reducing overhead and helping projects scale cleanly.

It doesn’t replace design tools or solve every workflow problem, but we’ve found it useful in our own projects and are sharing it to see if others do too.

This is still an unfinished idea we’re testing in real projects. We welcome all feedback, positive or critical, as we explore how this approach fits into real-world workflows.

---

## What it solves

* Duplicate work between design and code: designs are often mocked up in Figma, then rebuilt manually in React.
* Fragmented workflows: designers, developers, and PMs switch between tools and lose context.
* The design/development divide: modern frameworks make direct design-in-code possible, but teams stay siloed.
* Too much overhead for small teams: solo builders need one environment to design, test, and ship.
* No clear structure for AI tools: AI editors can generate UI fast but struggle without project rules or context.

---

## How it works

The framework adds a clear pattern to manage UI components through three registries:

1. **Component Registry (`registry.ts`)**
   Lists all components with metadata such as name, path, and category. Used for navigation and categorisation.

2. **Component Config (`component-registry.ts`)**
   Imports the component code, defines default props, and adds fallback behaviour. Used for validation and safe rendering.

3. **Demo Renderers (`[slug]/page.tsx`)**
   Contains the `COMPONENT_DEMOS` object that maps component slugs to React render functions. This is what actually renders the component previews on the demo pages.

When you visit `/proto`, you see a list of all components. Selecting one loads its demo with default props. Draft components live in `components/draft` and can only be used inside `/proto` routes. ESLint blocks their use in production code. Promoting a component simply means moving it out of `draft/` and updating all three registries.

---

## Try it first

Want to see how it works before setting it up in your own project? Clone this repository, then:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/proto` to see the design system in action. You can create draft components, look at the registries, and see how everything works together before integrating it into your own codebase.

---

## Quick setup (AI prompt)

You can set up Code-First-Design automatically in tools like Cursor or Claude Code.

Copy and paste this prompt into your AI editor:

```
Your goal is to set up the Code-First-Design framework in this Next.js project. It helps organise UI components with a clear separation between draft (experimental) and production components. It provides a design system at /proto where you can preview and iterate on components before promoting them to production.

Use the files and structure from this repository:
https://github.com/bmoff/code-first-design

Follow these steps:

1. **Create the folder structure:**

components/
  draft/                     # Experimental components
  ui/                        # Production components (e.g. shadcn primitives)

app/
  proto/
    _ds/                     # Design system internals
    _components/             # Shared design system components
    components/[slug]/       # Dynamic component demo pages
    layout.tsx               # Layout wrapper
    page.tsx                 # Design system landing page

.cursor/rules/               # Cursor rule files
scripts/                     # Validation scripts

2. **Copy these files from the repository:**

- app/proto/_ds/
  - DesignSystemNav.tsx
  - registry.ts
  - component-registry.ts
  - component-validator.ts
  - validate-components.ts
  - validate-demos.ts
- app/proto/_components/
  - ProtoHeader.tsx
- app/proto/components/[slug]/page.tsx
- components/draft/
  - ExampleCard.tsx
- .cursor/rules/
  - code-first-design-create.mdc
  - code-first-design-promote.mdc
  - design.mdc
- scripts/
  - validate-demos.js

**Important:** After copying the files, review and update `.cursor/rules/design.mdc` to match your design patterns and conventions. This file focuses on usage patterns and examples rather than exact values (which live in `app/globals.css`). Customise the component patterns, spacing conventions, and examples to match your project's style.

3. **Install dependencies:**

npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-scroll-area @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge
npm install --save-dev tsx

4. **Configure ESLint to block draft imports in production (using Flat Config):**

Add these configuration objects to your existing `eslint.config.mjs` array:

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

5. **Add validation scripts to package.json:**

Add these to the existing `scripts` section in your `package.json`:

```json
"validate-components": "tsx app/proto/_ds/validate-components.ts",
"validate:demos": "node scripts/validate-demos.js"
```

6. **Start the project:**
Run `npm run dev` and open `http://localhost:3000/proto`.
You should see the design system landing page and the ExampleCard demo at `/proto/components/example-card`.

Stop after the folder structure, required files, and validation scripts are added.
```

---

## Usage

### Creating a draft component

1. In your AI editor, explicitly reference the Cursor rule and ask:
   "Follow the code-first-design-create rule and create a draft component HeroCard with title and cta."

2. The editor will:

   * Create `components/draft/HeroCard.tsx`
   * Add it to `registry.ts` under `draftComponents`
   * Add a demo entry in `component-registry.ts`
   * Add an entry to the `COMPONENT_DEMOS` object in `app/proto/components/[slug]/page.tsx`

The component will be available at `/proto/components/hero-card`. Draft components can only be imported within `/proto` routes.

You can also do this manually by following the steps in `.cursor/rules/code-first-design-create.mdc`.

### Promoting a component to production

1. When ready, explicitly reference the Cursor rule and ask:
   "Follow the code-first-design-promote rule and promote HeroCard to production."

2. The editor will:

   * Move the file from `components/draft/` to `components/`
   * Update imports in registries and demo files
   * Move the entry from `draftComponents` to `customComponents` in `registry.ts`
   * Run validations

3. You can also run validation manually:

```bash
npm run validate-components
npm run validate:demos
```

ESLint will prevent any leftover draft imports in production routes.

You can also do this manually by following the steps in `.cursor/rules/code-first-design-promote.mdc`.

---

## Validation

Two scripts help keep components consistent:

* **Validate components**
  Use this to ensure all components can be imported and rendered.

  ```bash
  npm run validate-components
  ```

* **Validate demos**
  Use this to check that every component in the registry has a working demo.

  ```bash
  npm run validate:demos
  ```

Run these regularly, especially after creating or promoting components.

---

## Example workflow

1. Ask your AI editor to generate a draft component, explicitly referencing the rule: "Follow the code-first-design-create rule and create a draft component HeroCard with title and cta."
2. Open `/proto` to preview it, adjust layout and props, and share with teammates for feedback.
3. Run `npm run validate-components` and `npm run validate:demos`, and check accessibility and usability quickly before sharing wider.
4. Test the component with a few users or customers, gather feedback, and log any issues or ideas for improvement.
5. Refine the component based on what you learn, update usage notes or props if needed, and ensure validation still passes.
6. Ask your AI editor to promote it: "Follow the code-first-design-promote rule and promote HeroCard to production." Then open a pull request for review.
7. Merge after review, deploy, and monitor how it's used. Revisit `/proto` to make further improvements if needed.

---

## Compatibility

Works with any AI coding assistant that supports rule files (like Cursor's `.mdc` files).

The `.mdc` rule files in `.cursor/rules/` provide structured instructions for creating and promoting components. When using Cursor, explicitly reference these rules in your prompts (e.g., "Follow the code-first-design-create rule...") for best results.

If your tool doesn't support rule files, you can still follow the same structure manually by reading the `.mdc` files as documentation and using the validation scripts. The framework is designed to work either way.

---

## Contributing

Code-First-Design is experimental and still evolving.
We welcome issues, discussions, and pull requests.
If you try this in your own project, please share your experience. Your feedback will shape how this approach develops.

---

## Licence

MIT
