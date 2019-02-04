import babel from "rollup-plugin-babel";

module.exports = {
  input: "src/index.js",
  plugins: [
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    })
  ],
  output: {
    file: "dist/index.cjs.js",
    format: "cjs"
  }
};
