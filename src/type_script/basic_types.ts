'use strict';

export default async () => {
    console.log('TypeScript basic type testing');
    console.log('=============================');
    console.log('');

    console.log('Boolean vars declaration:');
    console.log('');

    let booleanVar1: boolean = true;
    const booleanVar2: boolean = false;

    console.log('let booleanVar1: boolean = true;');
    console.log('const booleanVar2: boolean = false;');

    console.log('');
    console.log('Numeric vars declaration:');
    console.log('');

    let numericVar1: number = 3;
    let numericVar2: number = 0xFA;
    let numericVar3: number = 0b1101;

    console.log('let numericVar1: number = 3;');
    console.log('let numericVar2: number = 0xFA;');
    console.log('let numericVar3: number = 0b1101;');

    console.log('');
    console.log('String vars declaration:');
    console.log('');

    let stringVar1: string = "Some string var 1";
    let stringVar2: string = "Some string var 2";

    console.log('let stringVar1: string = "Some string var 1";');
    console.log('let stringVar2: string = "Some string var 2";');

    console.log('');
    console.log('Any vars declaration:');
    console.log('');

    let anyVar1: any = 4;
    let anyVar2: any = {prop1: 1};
    let anyVar3: any = "str1";

    console.log('let anyVar1: any = 4;');
    console.log('let anyVar2: any = {prop1: 1};');
    console.log('let anyVar3: any = "str1";');

    console.log('');
    console.log('null/undefined vars declaration:');
    console.log('');

    let undefinedVar1: undefined = undefined;
    let nullVar1: null = null;

    console.log('let undefinedVar1: undefined = undefined;');
    console.log('let nullVar1: null = null;');

    console.log('');
    console.log('Array vars declaration:');
    console.log('');

    let booleanArray1: boolean[] = [true, false, true, true, false];
    let booleanArray2: Array<boolean> = [false, true, false, false, true];

    console.log('let booleanArray1: boolean[] = [true, false, true, true, false];');
    console.log('let booleanArray2: Array<boolean> = [false, true, false, false, true];');

    console.log('');

    let numericArray1: number[] = [2, 5, 6];
    let numericArray2: Array<number> = [5, -1, 4];

    console.log('let numericArray1: number[] = [2, 5, 6];');
    console.log('let numericArray2: Array<number> = [5, -1, 4];');

    console.log('');

    let stringArray1: string[] = ["str1", "str2", "str3"];
    let stringArray2: Array<string> = ["str4", "str5", "str6"];

    console.log('let stringArray1: string[] = ["str1", "str2", "str3"];');
    console.log('let stringArray2: Array<string> = ["str4", "str5", "str6"];');

    console.log('');
    console.log('Tuple declaration:');
    console.log('');

    let tuple1: [string, number, string, boolean];
    let tuple2: [boolean, boolean, string];

    tuple1 = ["str1", -4, "str2", true];
    tuple2 = [true, false, "str3"];

    console.log('let tuple1: [string, number, string, boolean];');
    console.log('let tuple2: [boolean, boolean, string];');

    console.log('');

    console.log('tuple1 = ["str1", -4, "str2", true];');
    console.log('tuple2 = [true, false, "str3"];');

    console.log('');
    console.log('Enum declaration:');
    console.log('');

    enum Cars {Audi, Subaru, Lexus, Porsche}
    enum Dialects {vanilaJS = 1, CoffeeScript, TypeScript = 4}

    let currentCar1 = Cars.Audi;
    let currentCar2 = Cars[1];

    let currentDialect1 = Dialects.TypeScript;
    let currentDialect2 = Dialects[1];

    console.log('enum Cars {Audi, Subaru, Lexus, Porsche}');
    console.log('enum Dialects {vanilaJS = 1, CoffeeScript, TypeScript = 4}');

    console.log('');

    console.log('let currentCar1 = Cars.Audi;');
    console.log('let currentCar2 = Cars[1];');

    console.log('');

    console.log('let currentDialect1 = Dialects.TypeScript;');
    console.log('let currentDialect2 = Dialects[1];');

    console.log('');
    console.log('Declaration of function that returns void:');
    console.log('');

    function voidFunc1(): void {
        console.log('void func 1');
    }

    function voidFunc2(): void {
        console.log('void func 2');
    }

    console.log('function voidFunc1(): void {console.log("void func 1");}');
    console.log('function voidFunc2(): void {console.log("void func 2");}');

    console.log('');
    console.log('Declaration of function that never returns value:');
    console.log('');

    function neverFunc1(message: string): never {
        throw new Error(message);
    }

    console.log('function neverFunc1(message: string): never {throw new Error(message);}');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}