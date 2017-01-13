'use strict';
// boolean vars declaration
let booleanVar1 = true;
const booleanVar2 = false;
// numeric vars declaration
let numericVar1 = 3;
let numericVar2 = 0xFA;
let numericVar3 = 0b1101;
// string vars declaration
let stringVar1 = "Some string var 1";
let stringVar2 = "Some string var 2";
// any vars declaration
let anyVar1 = 4;
let anyVar2 = { prop1: 1 };
let anyVar3 = 'str1';
// array vars declaration
let booleanArray1 = [true, false, true, true, false];
let booleanArray2 = [false, true, false, false, true];
let numericArray1 = [2, 5, 6];
let numericArray2 = [5, -1, 4];
let stringArray1 = ['str1', 'str2', 'str3'];
let stringArray2 = ['str4', 'str5', 'str6'];
// tuple declaration
let tuple1;
let tuple2;
tuple1 = ['str1', -4, 'str2', true];
tuple2 = [true, false, 'str3'];
// enum declaration
var Cars;
(function (Cars) {
    Cars[Cars["Audi"] = 0] = "Audi";
    Cars[Cars["Subaru"] = 1] = "Subaru";
    Cars[Cars["Lexus"] = 2] = "Lexus";
    Cars[Cars["Porsche"] = 3] = "Porsche";
})(Cars || (Cars = {}));
var Dialects;
(function (Dialects) {
    Dialects[Dialects["vanilaJS"] = 1] = "vanilaJS";
    Dialects[Dialects["CoffeeScript"] = 2] = "CoffeeScript";
    Dialects[Dialects["TypeScript"] = 4] = "TypeScript";
})(Dialects || (Dialects = {}));
let currentCar1 = Cars.Audi;
let currentCar2 = Cars[1];
let currentDialect1 = Dialects.TypeScript;
let currentDialect2 = Dialects[1];
// declaration of function that returns void
function voidFunc1() {
    console.log('void func 1');
}
function voidFunc2() {
    console.log('void func 2');
}
//# sourceMappingURL=basic_types.js.map