const path = require("path");

const SRC_DIR = path.join(__dirname, "client", "src");
const OUT_DIR = path.join(__dirname, "public");

module.exports = {
  entry: path.join(SRC_DIR, "index.jsx"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
