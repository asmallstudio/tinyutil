module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["react"],
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "react/prop-types": "off",
    "block-scoped-var": "warn",
    "guard-for-in": "error",
    "new-cap": "warn",
    "no-alert": "warn",
    "no-console": "warn",
    "no-else-return": "warn",
    "no-multi-str": "error",
    "no-param-reassign": "error",
    "no-undefined": "error",
    "no-template-curly-in-string": "error",
    "no-var": "warn",
    "prefer-const": "warn",
    "prefer-destructuring": "warn",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    "space-infix-ops": [
      "error",
      {
        int32Hint: true
      }
    ]
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      pragma: "React",
      version: "16.6.0"
    }
  }
};
