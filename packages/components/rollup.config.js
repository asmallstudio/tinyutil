import babel from "rollup-plugin-babel";

const external = Object.keys(require("./package.json").dependencies);

export default {
  input: "src/index.js",
  external: [external],
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: "node_modules/**"
    })
  ],
  output: {
    file: "index.js",
    format: "cjs"
  }
};
