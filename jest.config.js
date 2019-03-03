module.exports = {
  preset: 'react-native',
  verbose: true,
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'node'
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    '/android/',
    '/ios/'
  ]
};
