'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
exports["default"] = function () { return __awaiter(_this, void 0, void 0, function () {
    function voidFunc1() {
        console.log('void func 1');
    }
    function voidFunc2() {
        console.log('void func 2');
    }
    var booleanVar1, booleanVar2, numericVar1, numericVar2, numericVar3, stringVar1, stringVar2, anyVar1, anyVar2, anyVar3, booleanArray1, booleanArray2, numericArray1, numericArray2, stringArray1, stringArray2, tuple1, tuple2, Cars, Dialects, currentCar1, currentCar2, currentDialect1, currentDialect2, TestClass1, objectsArray1;
    return __generator(this, function (_a) {
        console.log('TypeScript basic type testing');
        console.log('=============================');
        console.log('');
        console.log('Boolean vars declaration:');
        console.log('');
        booleanVar1 = true;
        booleanVar2 = false;
        console.log('let booleanVar1: boolean = true;');
        console.log('const booleanVar2: boolean = false;');
        console.log('');
        console.log('Numeric vars declaration:');
        console.log('');
        numericVar1 = 3;
        numericVar2 = 0xFA;
        numericVar3 = 13;
        console.log('let numericVar1: number = 3;');
        console.log('let numericVar2: number = 0xFA;');
        console.log('let numericVar3: number = 0b1101;');
        console.log('');
        console.log('String vars declaration:');
        console.log('');
        stringVar1 = "Some string var 1";
        stringVar2 = "Some string var 2";
        console.log('let stringVar1: string = "Some string var 1";');
        console.log('let stringVar2: string = "Some string var 2";');
        console.log('');
        console.log('Any vars declaration:');
        console.log('');
        anyVar1 = 4;
        anyVar2 = { prop1: 1 };
        anyVar3 = "str1";
        console.log('let anyVar1: any = 4;');
        console.log('let anyVar2: any = {prop1: 1};');
        console.log('let anyVar3: any = "str1";');
        console.log('');
        console.log('Array vars declaration:');
        console.log('');
        booleanArray1 = [true, false, true, true, false];
        booleanArray2 = [false, true, false, false, true];
        console.log('let booleanArray1: boolean[] = [true, false, true, true, false];');
        console.log('let booleanArray2: Array<boolean> = [false, true, false, false, true];');
        console.log('');
        numericArray1 = [2, 5, 6];
        numericArray2 = [5, -1, 4];
        console.log('let numericArray1: number[] = [2, 5, 6];');
        console.log('let numericArray2: Array<number> = [5, -1, 4];');
        console.log('');
        stringArray1 = ["str1", "str2", "str3"];
        stringArray2 = ["str4", "str5", "str6"];
        console.log('let stringArray1: string[] = ["str1", "str2", "str3"];');
        console.log('let stringArray2: Array<string> = ["str4", "str5", "str6"];');
        console.log('');
        console.log('Tuple declaration:');
        console.log('');
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
        (function (Cars) {
            Cars[Cars["Audi"] = 0] = "Audi";
            Cars[Cars["Subaru"] = 1] = "Subaru";
            Cars[Cars["Lexus"] = 2] = "Lexus";
            Cars[Cars["Porsche"] = 3] = "Porsche";
        })(Cars || (Cars = {}));
        (function (Dialects) {
            Dialects[Dialects["vanilaJS"] = 1] = "vanilaJS";
            Dialects[Dialects["CoffeeScript"] = 2] = "CoffeeScript";
            Dialects[Dialects["TypeScript"] = 4] = "TypeScript";
        })(Dialects || (Dialects = {}));
        currentCar1 = Cars.Audi;
        currentCar2 = Cars[1];
        currentDialect1 = Dialects.TypeScript;
        currentDialect2 = Dialects[1];
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
        console.log('function voidFunc1(): void {console.log("void func 1");}');
        console.log('function voidFunc2(): void {console.log("void func 2");}');
        console.log('');
        TestClass1 = (function () {
            function TestClass1() {
            }
            return TestClass1;
        }());
        objectsArray1 = [
            { testProp1: 'testVal1', testProp2: 12 },
            { testProp1: 'testVal2', testProp2: 331 },
            { testProp1: 'testVal3', testProp2: 417 }
        ];
        console.log('objectsArray1 (TestClass1[]):', objectsArray1);
        console.log('');
        console.log('--------------------------------------------------------');
        console.log('');
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=basic_types.js.map