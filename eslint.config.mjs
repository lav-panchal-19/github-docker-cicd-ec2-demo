import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser,
    },
    rules: {
      // Possible Errors
      "no-console": "warn", // Allows console statements, but shows a warning
      "no-debugger": "error", // Disallows debugger statements
      "no-extra-semi": "error", // Disallows unnecessary semicolons

      // Best Practices
      "eqeqeq": ["error", "always"], // Enforces the use of === and !==
      "curly": ["error", "all"], // Enforces consistent brace style for all control statements

      // Variables
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Warns about unused variables, but allows unused function args starting with "_"
      "no-undef": "error", // Disallows the use of undeclared variables

      // Style
      "indent": ["error", 4], // Enforces 2-space indentation
      "quotes": ["error", "single", { "avoidEscape": true }], // Enforces single quotes, allows double quotes to avoid escaping
      "semi": ["error", "always"], // Requires semicolons at the end of statements
      "comma-dangle": ["error", "always-multiline"], // Requires a comma at the end of multiline arrays/objects

      // ECMAScript 6
      "prefer-const": "error", // Enforces the use of `const` for variables that are never reassigned
      "no-var": "error", // Disallows the use of `var`, prefer `let` or `const`
    },
  },
  pluginJs.configs.recommended,
];
