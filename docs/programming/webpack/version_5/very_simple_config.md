

List all supported commands and flags by cli

npx webpack --help=verbose
See help for a specific command or option

npx webpack help --mode





===


let testVar1 = 5;
testVar1 += 5;

console.log(testVar1);

===

(()=>{let l=5;l+=5,console.log(10)})();


===


/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("let testVar1 = 5;\ntestVar1 += 5;\n\nconsole.log(testVar1);\n\n\n//# sourceURL=webpack://bacon/./src/index.js?");
/******/ })()
;
