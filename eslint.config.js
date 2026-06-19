module.exports = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "public/**"
    ]
  },
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];
