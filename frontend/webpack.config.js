const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  // Entry points for JavaScript files
  entry: {
    main: './src/js/main.js',
    project: './src/js/project.js',
    admin: './src/js/admin.js',
    about: './src/js/about.js',
    projects: './src/js/projects.js',
    contact: './src/js/contact.js',
  },
  output: {
    path: path.resolve(__dirname, '../backend/public'),
    filename: 'js/[name].[contenthash].bundle.js',
    clean: true, // Clean the output directory before emit.
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // Processes CSS files
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource', // Handles image files
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    // Generates index.html and injects the bundled scripts.
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'], // Include only main.js bundle for index.html
    }),
    new HtmlWebpackPlugin({
      template: './public/about.html', 
      filename: 'about.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      template: './public/contact.html', 
      filename: 'contact.html',
      chunks: ['contact'],
    }),
    new HtmlWebpackPlugin({
      template: './public/project.html', 
      filename: 'project.html',
      chunks: ['project'],
    }),
    new HtmlWebpackPlugin({
      template: './public/projects.html', 
      filename: 'projects.html',
      chunks: ['projects'],
    }),
    new HtmlWebpackPlugin({
      template: './public/admin.html', 
      filename: 'admin.html',
      chunks: ['admin'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, '../backend/public/images'),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    open: true, // Automatically open the browser
    historyApiFallback: true,
    proxy: [
      {
        context: ['/uploads'],
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    ]    
  },
  mode: 'production', // Set to 'production' for production builds.
};
