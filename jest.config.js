module.exports = {
  
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/src/**/*.spec.tsx'],
    //setupFiles: ['<rootDir>/jest.setup.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?@?react-native|@ionic-native|@ionic-native/core|@ionic-native/social-sharing)', // to avoid outside import error
    ],
  }