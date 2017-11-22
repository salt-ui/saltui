module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "import"
    ],
    "env": {
        "es6": true
    },
    "parser": "babel-eslint",
    "rules": {
        "import/no-extraneous-dependencies": "off",
        "react/prefer-stateless-function": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "react/forbid-prop-types": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/no-unused-prop-types": "off"
    }
};