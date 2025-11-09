import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/components/draft/**", "**/components/draft/*"],
              message:
                "Draft components are experimental only. Use them in /proto routes.",
            },
          ],
        },
      ],
    },
  },
  {
    // Allow draft imports in prototype/dev routes
    files: ["**/app/proto/**/*", "**/app/dev/**/*", "**/app/test/**/*"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];

export default eslintConfig;

