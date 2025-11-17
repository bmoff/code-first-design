# Code-First-Design

Design and development are converging, which is being accelerated by AI-assisted workflows. More teams are designing directly in code using AI editors such as Cursor and Lovable, and tools like Figma can now generate working components.

However, these AI-assisted tools often lack the context and guardrails to produce code that is consistent, reusable, and easy to scale.

Most teams still rely on a traditional handoff process. Product managers write specifications, designers create mock-ups, and developers rebuild them in code. This duplication slows down iteration and creates friction, even as AI becomes part of everyday work.

**Code-First-Design** starts from the hypothesis that design and code will continue to converge. If the real product experience already lives in code, it should also be the place where teams experiment and validate ideas.

The framework helps both technical and non-technical contributors design, test, and promote components directly inside a Next.js project. It introduces a clear structure that makes this process easier for people and AI tools to follow, helping projects scale successfully.

It doesn’t replace design tools, and it won’t suit every workflow. We’ve found it useful in our own projects and are sharing it to see whether others find it helpful.

This is still an unfinished idea we're testing in real projects. We welcome all feedback, positive or critical, as we test this in real workflows.

---

## What it solves

* Duplicate work between design and code: designs are often mocked up in Figma, then rebuilt manually in React.
* Fragmented workflows: designers, developers, and PMs switch between tools and lose context.
* The design/development divide: teams remain siloed even though design-in-code workflows are now possible.
* Too much overhead for small teams: solo builders need one environment to design, test, and ship.
* No clear structure for AI tools: AI editors can generate UI fast but struggle without project rules or context.

---

## Try it first

Want to see how it works before setting it up in your own project? Clone the repository and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/proto` to see the design system in action. You can create draft components, look at the registries, and see how everything works together before integrating it into your own codebase.

---

## How it works

The framework adds a clear pattern to manage UI components and prototypes through registries:

### Components

Components are individual UI pieces managed through three registries:

1. **Component Registry (`registry.ts`)**
   Lists all components with metadata such as name, path, and category. Used for navigation and categorisation.

2. **Component Config (`component-registry.ts`)**
   Imports the component code, defines default props, and adds fallback behaviour. Used for validation and safe rendering.

3. **Demo Renderers (`[slug]/page.tsx`)**
   Contains the `COMPONENT_DEMOS` object that maps component slugs to React render functions. This is what actually renders the component previews on the demo pages.

When you visit `/proto`, you see a list of all components. Selecting one loads its demo with default props. Draft components live in `components/draft` and can only be used inside `/proto` routes. ESLint blocks their use in production code. To promote a component, move it out of `draft/` and update all three registries.

### Prototypes

Prototypes are full application flows or complete pages. They're simpler than components:
- Live at `app/proto/prototypes/[name]/page.tsx`
- Registered in `registry.ts` only (no `component-registry.ts` or `COMPONENT_DEMOS` needed)
- Can import draft components freely
- Can have nested routes

Prototypes demonstrate how multiple components work together in a real user flow, like a complete workspace or dashboard.

### Rules

The framework includes Cursor rules in `.cursor/rules/` that guide you through working with these registries:
- **`code-first-design-create.mdc`** - Unified rule for creating draft components or prototypes (asks which you want to create, includes planning questions for prototypes)
- **`code-first-design-promote.mdc`** - Instructions for promoting components from draft to production
- **`code-first-design.mdc`** - Framework overview and conventions (applied automatically)
- **`design.mdc`** - Design patterns and component conventions

---

## Example workflow

**Creating a prototype:**

1. Call `@code-first-design-create` and describe what you want to build. Give clear instructions or reference a PRD: "Create a prototype for an analyst workspace. It needs a landing page where users enter a ticker symbol, then a workspace page showing research tools, charts, and analysis. I'll need components like WorkspaceLayout, AnalystSidebar, and ResearchPanel."

2. The rule will ask planning questions, then guide you through creating the route structure, any new components needed, and registering everything in the registry.

3. Preview at `/proto/prototypes/[your-prototype]`, iterate, and share with teammates for feedback.

**Promoting components to production:**

4. When components are ready, call `@code-first-design-promote` to move them from `draft/` to production. The rule handles moving files, updating imports, and moving registry entries.

5. Run `npm run validate-components` and `npm run validate:demos` to ensure everything works.

Prototypes can stay in `/proto` for ongoing experimentation, or you can promote individual components as they mature.

---

## Automated setup

You can set up Code-First-Design automatically in tools like Cursor or Claude Code.

<details>
<summary>Click to expand setup prompt</summary>

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
    prototypes/              # Full application flow prototypes (optional)
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
  - code-first-design.mdc
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

</details>

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

## Compatibility

Works with any AI coding assistant that supports rule files (like Cursor's `.mdc` files).

The `.mdc` rule files in `.cursor/rules/` provide structured instructions for creating and promoting components. When using Cursor, explicitly reference these rules in your prompts (e.g., "Follow the code-first-design-create rule...") for best results.

---

## Contributing

Code-First-Design is experimental and still evolving.
We welcome issues, discussions, and pull requests.
If you try this in your own project, please share your experience. Your feedback will shape how this approach develops.

---

## Licence

MIT
