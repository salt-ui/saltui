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
        "react/prefer-stateless-function": "off"
    }
};