# No Implicit Side Effects Plugin for ESLint

[![Build Status](https://travis-ci.org/jussi-kalliokoski/eslint-plugin-no-implicit-side-effects.svg?branch=master)](https://travis-ci.org/jussi-kalliokoski/eslint-plugin-no-implicit-side-effects)
[![Coverage Status](https://img.shields.io/coveralls/jussi-kalliokoski/eslint-plugin-no-implicit-side-effects.svg)](https://coveralls.io/r/jussi-kalliokoski/eslint-plugin-no-implicit-side-effects)

An [ESLint] plugin to help writing JS in a pure functional style. Forces programmers to be only introduce (own) side effects knowingly by prefixing them with void, making side effects explicit and thus easy to find.

## Why `void`?

In C-like languages, `void` is most commonly used to denote a function without a return value, so by definition a side effect. In JavaScript, `void` is used to make any expression have the value `undefined`, as in no value. An expression that doesn't result in any value is also by definition a side effect. Considering these, I think `void` is the perfect keyword for this, especially because prefixing an expression whose value is not used with `void` doesn't change the program's behavior in any way.

## Installation

```
npm install --save-dev eslint-plugin-no-implicit-side-effects
```

NOTE: This plugin requires node v4.0 or higher.

Then add to the list of plugins in `.eslintrc`:

```
"plugins": ["no-implicit-side-effects"]
```

Instructions for setting up individual rules can be found the rules section.

## Rules

### `no-implicit-side-effects`

#### Config:

```
"no-implicit-side-effects/no-implicit-side-effects": 2
```

#### Description

Requires making your side effects explicit. This means that you cannot have statements that only contain an expression, e.g.

```javascript
// Not OK:
a = 1;
b.c = 2;
foo();
bar.qoo();
z.y++;
[1, 2, 3].forEach(n => console.log(n));
(function (){}());
// etc...
```

instead your functions should be focused on what is being returned. Expressions within a return statement or variable declarations are considered valid. If side effects such as assignment or function calls with unused return value are required, prefix them with `void` to make them explicit:

```javascript
// OK:
void (a = 1);
void (b.c = 2);
void foo();
void bar.qoo();
void z.y++;
void [1, 2, 3].forEach(n => console.log(n));
void function (){}();

// also OK:
var h = 3;
let i = 4;
const j = 5;
return foo();
```

#### Pitfalls

##### External side effects

This rule does not prevent indirect side effects. For example if function `foo` has a side effect and you declare function bar as:

```javascript
function bar (v) {
    return foo(v + 1);
}
```

the rule will not complain because the violation is not actually in this function.

##### Arrow functions

Single expression arrow functions can mask a side effect because they appear as a return value. For example `return promise.then(v => console.log(v));` will not be caught.

##### Unary increment/decrement

Unary increment and decrement are always side effects, but this rule doesn't have special treatment for them, which means side effects like this would be considered valid: `var x = y++;`. You can however use the built-in rule `no-plus-plus` for catching these.

## Recommended built-in rules

These will make it easier to develop in a pure functional style:

- `no-class-assign`.
- `no-cond-assign`
- `no-const-assign`.
- `no-func-assign`.
- `no-new`.
- `no-param-reassign`.
- `no-plusplus`.
- `no-return-assign`.
- `no-sequences`.
- `no-var`.
- `operator-assignment` (`"never"`).
- `prefer-arrow-callback`.
- `prefer-const`.

[ESLint]: http://eslint.org/
