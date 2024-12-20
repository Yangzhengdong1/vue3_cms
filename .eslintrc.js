module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-extra-semi": 2,
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-async-promise-executor": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "vue/script-indent": [
      "error",
      2, // 缩进为 2 个空格
      {
        baseIndent: 1 // 第一层缩进为 2 个空格（第二层以上的缩进相对上一层）
      }
    ]
  }
};
