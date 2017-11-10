'use strict';

// https://scotch.io/tutorials/understanding-hoisting-in-javascript

export default async () => {
    console.log('Hoisting');
    console.log('========');
    console.log('');

    console.log('General notes');
    console.log('');

    console.log(' - Variable assignment takes precedence over function declaration');
    console.log(' - Function declarations take precedence over variable declarations');
    console.log(' - Function declarations are hoisted over variable declarations but not over variable assignments.');

    console.log('');
    console.log('');

    console.log('Type of undefined variable:', typeof undefinedVariable1);
    //console.log('Yields "ReferenceError: undefinedVariable1 is not defined":', undefinedVariable1);

    console.log('');

    console.log('hoistedVar1 -', hoistedVar1);
    var hoistedVar1 = 'hoisted_var1_ val1';

    console.log('');

    function hoistFunc1() {
        console.log('Hoisted variable inside function -', hoistedVar2);
        var hoistedVar2 = 'hoisted_var2_val1'
    }

    hoistFunc1();

    console.log('');

    //console.log('Yields "ReferenceError: hoistedVar3 is not defined":', hoistedVar3);
    //hoistedVar3 = 'hoisted_var3_val1';

    console.log('');

    hoistFunc2();
    function hoistFunc2() {
        console.log('Function "hoistFunc2" has been hoisted');
    }

    console.log('');

    //console.log('Yields "TypeError: hoistFunc3 is not a function":', hoistFunc3());

    var hoistFunc3 = function() {
        console.log('text');
    };

    console.log('');

    var hoistedVar4 = 'hoisted_var4_val1';

    function hoistedVar4(val) {
        return val * 2;
    }

    console.log('Variable assignment over function declaration, typeof hoistedVar4 -', typeof hoistedVar4);

    console.log('');

    var hoistedVar5;

    function hoistedVar5(val) {
        return val * 2;
    }

    console.log('Function declarations over variable declarations, typeof hoistedVar5', typeof hoistedVar5);

    console.log('');

    //console.log('Yields "ReferenceError: hoistFunc4 is not defined":', hoistFunc4());
    //console.log('Yields "TypeError: undefined is not a function":', hoistedVar5());

    var hoistedVar5 = function hoistFunc4() {
        console.log('text');
    };

    console.log('');

    var hoistedVar6 = 'hoisted_var6_val1';

    (function () {
        // Outputs: "Original name was undefined"
        console.log('hoistedVar6:', hoistedVar6);

        var hoistedVar6 = 'hoisted_var6_val2';

        // Outputs: "New name is Underhill"
        console.log('hoistedVar6:', hoistedVar6);
    })();

    console.log('');

    /*

    var tempObject1 = new Class1('test object 1');
    tempObject1.name = 'new name';

    console.log('Yields "ReferenceError: Class1 is not defined":', tempObject1);

    class Class1 {
        constructor(name) {
            this.name = name;
        }
    }

    */

    console.log('');

    /*

    var tempObject2 = new Class2('test object 2');
    tempObject2.name = 'new name';

    console.log('Yields "ReferenceError: Class2 is not defined":', tempObject2);

    var Class2 = class Class2 {
        constructor(name) {
            this.name = name;
        }
    }

    */

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}