'use strict';

// boolean vars declaration
let booleanVar1: boolean = true;
const booleanVar2: boolean = false;

// numeric vars declaration
let numericVar1: number = 3;
let numericVar2: number = 0xFA;
let numericVar3: number = 0b1101;

// string vars declaration
let stringVar1: string = "Some string var 1";
let stringVar2: string = "Some string var 2";

// any vars declaration
let anyVar1: any = 4;
let anyVar2: any = {prop1: 1};
let anyVar3: any = 'str1';

// array vars declaration
let booleanArray1: boolean[] = [true, false, true, true, false];
let booleanArray2: Array<boolean> = [false, true, false, false, true];

let numericArray1: number[] = [2, 5, 6];
let numericArray2: Array<number> = [5, -1, 4];

let stringArray1: string[] = ['str1', 'str2', 'str3'];
let stringArray2: Array<string> = ['str4', 'str5', 'str6'];

// tuple declaration
let tuple1: [string, number, string, boolean];
let tuple2: [boolean, boolean, string];

tuple1 = ['str1', -4, 'str2', true];
tuple2 = [true, false, 'str3'];

// enum declaration
enum Cars {Audi, Subaru, Lexus, Porsche}
enum Dialects {vanilaJS = 1, CoffeeScript, TypeScript = 4}

let currentCar1 = Cars.Audi;
let currentCar2 = Cars[1];

let currentDialect1 = Dialects.TypeScript;
let currentDialect2 = Dialects[1];

// declaration of function that returns void
function voidFunc1(): void {
    console.log('void func 1');
}

function voidFunc2(): void {
    console.log('void func 2');
}