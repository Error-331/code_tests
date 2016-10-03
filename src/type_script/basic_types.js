'use strict';
// boolean vars declaration
var booleanVar1 = true;
var booleanVar2 = false;
// numeric vars declaration
var numericVar1 = 3;
var numericVar2 = 0xFA;
var numericVar3 = 13;
// string vars declaration
var stringVar1 = "Some string var 1";
var stringVar2 = "Some string var 2";
// any vars declaration
var anyVar1 = 4;
var anyVar2 = { prop1: 1 };
var anyVar3 = 'str1';
// array vars declaration
var booleanArray1 = [true, false, true, true, false];
var booleanArray2 = [false, true, false, false, true];
var numericArray1 = [2, 5, 6];
var numericArray2 = [5, -1, 4];
var stringArray1 = ['str1', 'str2', 'str3'];
var stringArray2 = ['str4', 'str5', 'str6'];
// tuple declaration
var tuple1;
var tuple2;
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
var currentCar1 = Cars.Audi;
var currentCar2 = Cars[1];
var currentDialect1 = Dialects.TypeScript;
var currentDialect2 = Dialects[1];
// declaration of function that returns void
function voidFunc1() {
    console.log('void func 1');
}
function voidFunc2() {
    console.log('void func 2');
}
//# sourceMappingURL=basic_types.js.map