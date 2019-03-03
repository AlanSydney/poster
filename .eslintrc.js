module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'semi': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
        
      }
    ],
    'no-use-before-define': ['error', { 'variables': false }],
    'react/sort-comp': 0,
    'arrow-body-style': 0,
    'import/first': 0,
    'indent': ['error', 2],
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'no-tabs': 'off'
  },
  'globals': {
    'fetch': false
  }
}