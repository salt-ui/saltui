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
        "react/jsx-no-bind": "off",
        "no-underscore-dangle": "off",
        "jsx-a11y/label-has-for": "off",
        "no-plusplus": [
            "error",
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "react/no-unused-prop-types": "off",
        "react/forbid-prop-types": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "react/no-did-mount-set-state": "off"
    }
};