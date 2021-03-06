module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  // add your custom rules here
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  },
}
