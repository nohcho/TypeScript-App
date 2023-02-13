module.exports = {

  extends: [
    "semistandard",
    "standard"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "error",
    "object-curly-newline": ["error", {
      ObjectExpression: "always",
      ObjectPattern: {
        multiline: true
      },
      ImportDeclaration: "never",
      ExportDeclaration: {
        multiline: true, minProperties: 3
      }
    }],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    curly: "error",
    "no-unused-vars": "warn",
    "no-extra-semi": "error"
  },
  overrides: [{
    files: ["**/src/**/*.test.{ts,tsx}"],
    env: {
      jest: true
    }
  }
  ]
};
