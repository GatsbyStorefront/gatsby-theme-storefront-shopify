const path = require('path');
module.exports = {
  parser: 'babel-eslint',
  globals: {
    __PATH_PREFIX__: true,
  },
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaJsonFilepath: path.resolve(__dirname, '../../site/schema.json'),
        tagName: 'graphql',
      },
    ],
    'react/jsx-uses-react': 2,
    'react/react-in-jsx-scope': 2,
  },
  extends: ['react-app', 'plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y', 'graphql', 'react'],
};
