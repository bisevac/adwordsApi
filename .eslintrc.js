module.exports = {
   "extends": "airbnb-base",
   "parser": "babel-eslint",

    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
      "no-console": ["error", { "allow": ["warn", "log"] }],
      "space-in-parens": ["error", "always"],
      "computed-property-spacing": ["error", "always"],
      "key-spacing": ["error", {"beforeColon": true, "afterColon": true, "align": "colon"}],
      "no-multi-spaces": ["error", { "ignoreEOLComments": true,"exceptions": { "BinaryExpression": true,"ImportDeclaration": true,"VariableDeclarator": true } }],
      "space-before-function-paren": ["error", "always"],
      "import/no-dynamic-require": 0,
      "no-underscore-dangle": 0,
      "max-len": ["error", 140],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
    },
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module",
      "allowImportExportEverywhere": true
     },
    "globals": {
        "$config": true,
    },
    "env": {
        "es6": true,
        "node": true
      },
};
