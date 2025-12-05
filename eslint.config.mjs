import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  {
      plugins: {
        prettier,
        'react-hooks': reactHooks,
      },
      rules: {
      "no-console": "error",
      "prettier/prettier": "error",
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'off',
      "prettier/prettier": ["off", { endOfLine: "lf" }],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/*.config.js",
    "**/*.config.cjs",
    "**/*.config.mjs",
    "**/ActualiteEditionView.tsx"
  ]),
]);

export default eslintConfig;
