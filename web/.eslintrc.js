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
  ],
  // add your custom rules here
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
