module.exports = {
  preset: "ts-jest",
  roots: ["./tests"],
  transform: {
    // process TypeScript files
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
