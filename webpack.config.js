module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'build.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx*$/,//takes js and jsx files
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a valid name to reference
          query: {
            presets: ['es2015','stage-2']
          }
        }
      ]
    }
  };
