module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true,
    "mocha": true
  },
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": [
      "error",
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    "react/no-unused-state": "off",
    "react/jsx-no-bind": "off",
    "react/no-unused-prop-types": "off",
    "react/forbid-prop-types": "off",
    "react/no-did-mount-set-state": "off",
    "react/prefer-stateless-function": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
  }
};