module.exports = {
  "extends": "airbnb-base",
  // "plugins": [
  //   "react"
  // ],
  // "parserOptions": {
  //   "ecmaFeatures": {
  //     "jsx": true
  //   }
  // },
  "env": {
    // "browser": true,
    "node": true
  },
  // "globals": {
  //   "React": true
  // },
  //
  // "ecmaFeatures": {
  //   "jsx": true
  // },
  "rules": {
    "no-multi-spaces": "off",
    "indent": ["error", 2, { MemberExpression: 0 }],
    "arrow-parens": "off",
    "no-console": "off"
  //   "react/jsx-uses-react": "error",
  //   "react/jsx-uses-vars": "error",
  },
  // "parser": "babel-eslint"
};
