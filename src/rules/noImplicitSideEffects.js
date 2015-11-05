const MESSAGE = "Expression statements (side effects) must be prefixed with void.";

function isPrefixedWithVoid (node) {
    return node.expression.type === "UnaryExpression" && node.expression.operator === "void";
}

function noImplicitSideEffects (context) {
    return {
        ExpressionStatement: (node) => {
            if ( isPrefixedWithVoid(node) ) { return; }

            context.report({ node: node, message: MESSAGE });
        },
    };
}

noImplicitSideEffects.schema = [];

module.exports = noImplicitSideEffects;
