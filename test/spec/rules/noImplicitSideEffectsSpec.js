const RuleTester = require("eslint").RuleTester;
const rule = require("../../../src/rules/noImplicitSideEffects");

const VOID_ERROR = { message: "Expression statements (side effects) must be prefixed with void." };

const ruleTester = new RuleTester();
ruleTester.run("no-implicit-side-effects", rule, {
    valid: [{
        parser: "babel-eslint",
        code: `const a = 1`,
    }, {
        parser: "babel-eslint",
        code: `let a = 1`,
    }, {
        parser: "babel-eslint",
        code: `var a = 1`,
    }, {
        parser: "babel-eslint",
        code: `void (a = 1)`,
    }, {
        parser: "babel-eslint",
        code: `var a = foo()`,
    }, {
        parser: "babel-eslint",
        code: `void foo()`,
    }],

    invalid: [{
        parser: "babel-eslint",
        errors: [VOID_ERROR],
        code: `a = 2`,
    }, {
        parser: "babel-eslint",
        errors: [VOID_ERROR],
        code: `a = 2`,
    }, {
        parser: "babel-eslint",
        errors: [VOID_ERROR],
        code: `foo()`,
    }, {
        parser: "babel-eslint",
        errors: [VOID_ERROR],
        code: `foo()`,
    }],
});
