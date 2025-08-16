module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: './tsconfig.json',
        },
      ],
    },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
