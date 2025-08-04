module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  rules: {
    'no-console': 'off',//'warn' 
    'no-debugger': 'warn',
    'vue/multi-word-component-names': 'off'
  }
}