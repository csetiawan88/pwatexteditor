const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: ".index.html",
        chunks: ["main"], // Specify which chunks to include in the HTML file
      }),

      // WebpackPwaManifest to generate a PWA manifest file
      new WebpackPwaManifest({
        name: "Your PWA Name",
        short_name: "PWA Short Name",
        description: "Your PWA Description",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: path.resolve("src/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("icons"),
          },
        ],
      }),

      // InjectManifest to include the service worker script
      new InjectManifest({
        swSrc: "./src/sw.js", // Path to your service worker script
        exclude: [/\.map$/, /manifest\.json$/],
      }),
    ],

    module: {
      rules: [
        // Add CSS loaders configuration if needed
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        // Add Babel loader configuration if needed
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
