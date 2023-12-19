const config = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
}

module.exports = config