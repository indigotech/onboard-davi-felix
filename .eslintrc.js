module.exports = {
  root: true,
  plugins: ['check-file'],
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    camelcase: 'error',
    curly: 'error',
    'check-file/folder-naming-convention': ['error', {'src/**': 'KEBAB_CASE'}],
  },
};
