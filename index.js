module.exports = {
    rules: {
        "no-implicit-side-effects": require("./src/rules/noImplicitSideEffects"),
    },

    rulesConfig: {
        "no-implicit-side-effects": 0,
    },
};
