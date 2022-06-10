module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    Cesium: true,
    viewer: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 'off',
    'space-before-function-paren': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/require-prop-type-constructor': 'off',
    'prefer-const': 0, // 不强制const定义未更改变量
    'template-curly-spacing': 'off',
    indent: 'off' // 缩进 2空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
