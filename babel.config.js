module.exports = {
    presets: ['@babel/react', '@babel/env'],
    plugins: ['@babel/plugin-proposal-class-properties']
  };

  // @babel/react transforms jsx
  // @babel/env allows us to safely use modern js features and not worry about browsers that doesn't know how to handle them
  // @babel/plugin... enable use of class field syntax