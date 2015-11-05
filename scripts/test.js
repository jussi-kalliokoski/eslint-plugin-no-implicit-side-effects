/* global config:false exec:false */
require("shelljs/global");

config.fatal = true;

const path = require("path");
const coverageDirectory = path.join("reports", "coverage");
const testRunner = path.join("node_modules", ".bin", "_mocha");

exec(`istanbul cover --dir ${coverageDirectory} ${testRunner} -- -R spec test/spec/**/*Spec.js`);
exec("jscs src test");
exec("eslint src test");
