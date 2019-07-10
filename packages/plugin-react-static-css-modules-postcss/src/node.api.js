import ExtractCssChunks from "extract-css-chunks-webpack-plugin";

export default ({ cssLoaderConfigOptions = {}, sassIncludePaths = [], loaderRegexp = /\.css$/ }) => ({
  webpack: (config, { stage }) => {
    let loaders = [];

    const cssLoaderOptions = {
      importLoaders: 1,
      modules: true,
      camelCase: true,
      localIdentName:
        stage === "dev"
          ? "[name]__[local]--[hash:base64:5]"
          : "[hash:base64:5]",
      sourceMap: true,
      ...cssLoaderConfigOptions
    };
    const cssLoader = {
      loader: "css-loader",
      options: cssLoaderOptions
    };
    const postcssLoader = {
      loader: "postcss-loader",
      options: {
        config: {
          // File must be named in one of these formats:
          // https://github.com/michael-ciniawsky/postcss-load-config#usage
          path: "src/configuration/"
        }
      }
    };

    if (stage === "dev") {
      // Dev
      loaders = [
        {
          loader: ExtractCssChunks.loader,
          options: {
            hot: true
          }
        },
        cssLoader,
        postcssLoader
      ];
    } else if (stage === "node") {
      // Node
      // Don't extract css to file during node build process
      loaders = [
        {
          ...cssLoader,
          loader: "css-loader",
          options: {
            ...cssLoaderOptions,
            exportOnlyLocals: true
          }
        },
        postcssLoader
      ];
    } else {
      // Prod
      loaders = [ExtractCssChunks.loader, cssLoader, postcssLoader];
    }

    config.module.rules[0].oneOf.unshift({
      test: loaderRegexp,
      use: loaders
    });

    // config.plugins.push(new ExtractCssChunks());

    return config;
  }
});
