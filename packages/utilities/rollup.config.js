import babel from "rollup-plugin-babel";

const external = Object.keys(require("./package.json").dependencies).concat(
  "react-static",
  "fs",
  "path"
);

export default [
  {
    input: "src/index.js",
    external: external,
    plugins: [babel()],
    output: {
      file: "dist/index.cjs.js",
      format: "cjs"
    }
  },
  {
    input: "node/src/index.js",
    external: external,
    output: {
      file: "node/index.js",
      format: "cjs"
    }
  }
];
