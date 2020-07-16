module.exports = {
  extends: ["@cleartax"],
  overrides: [{
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "promise/catch-or-return": "off",
      "promise/always-return": "off"
    }
  }],
  "eslint.workingDirectories": [{ directory: "./src", changeProcessCWD: true }]
};
