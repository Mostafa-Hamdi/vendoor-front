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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // 👇 Turn "no-explicit-any" into a warning instead of an error
      "@typescript-eslint/no-explicit-any": "off",

      // (Optional) You can also make unused vars a warning instead of error
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
