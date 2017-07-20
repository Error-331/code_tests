'use strict';

export default async () => {
    const globalVar1 = 'glob_var1_val1';
    const globalVar2 = 'glob_var2_val1';

    console.log('Modules examples');
    console.log('================');
    console.log('');

    (function () {
        const privateVar1 = [93, 95, 88, 0, 55, 91];

        const privateFunc1 = function() {
            return privateVar1.reduce((accumulator, item) => accumulator + item, 0);
        };

        function privateFunc2() {
            return privateVar1.filter(item => item < 70);
        }

        console.log('Module 1');
        console.log('--------');
        console.log('');

        console.log('globalVar1 -', globalVar1);
        console.log('privateVar1 -', privateVar1);
        console.log('');
        console.log('privateFunc1() -', privateFunc1());
        console.log('privateFunc2() -', privateFunc2());
    }());

    console.log('');
    console.log('Outside module 1');
    console.log('');

    console.log('globalVar1 -', globalVar1);
    //console.log('privateVar1 -', privateVar1); // error
    console.log('');
    //console.log('privateFunc1 -', privateFunc1); // error
    //console.log('privateFunc2 -', privateFunc2); // error
    console.log('');


    (function (moduleVar1) {
        console.log('Module 2');
        console.log('--------');
        console.log('');

        moduleVar1 = 'mod_var1_val1';
        console.log('moduleVar1 -', moduleVar1);
    }(globalVar2));

    console.log('');
    console.log('Outside module 2');
    console.log('');

    console.log('globalVar2 -', globalVar2);

    console.log('');
    console.log('Testing module 3 exposed methods');
    console.log('');

    const module3 = (function () {
        const privateVar1 = [93, 95, 88, 0, 55, 91];

        return {
            publicFunc1: function() {
                return privateVar1.reduce((accumulator, item) => accumulator + item, 0);
            },

            publicFunc2: function() {
                return privateVar1.filter(item => item < 70);
            }
        }
    })();

    console.log('module3.publicFunc1() -', module3.publicFunc1());
    console.log('module3.publicFunc2() -', module3.publicFunc2());

    console.log('');
    console.log('Testing module 4 exposed methods');
    console.log('');

    const module4 = (function () {
        const privateVar1 = [93, 95, 88, 0, 55, 91];

        const publicFunc1 = function() {
            return privateVar1.reduce((accumulator, item) => accumulator + item, 0);
        };

        function publicFunc2() {
            return privateVar1.filter(item => item < 70);
        }

        return {
            publicFunc1,
            publicFunc2
        }
    })();

    console.log('module4.publicFunc1() -', module4.publicFunc1());
    console.log('module4.publicFunc2() -', module4.publicFunc2());

    console.log('');
    console.log('Module inside class method example 1');
    console.log('');

    function ExampleClass1() {
        this.publicMember1 = 'public_member1_val1';

        this.publicMethod1 = function() {
            (function() {
                console.log(this.publicMember1);
            })()
        }
    }

    const testObj1 = new ExampleClass1();
    //testObj1.publicMethod1(); // error

    console.log('');
    console.log('Module inside class method example 2');
    console.log('');

    function ExampleClass2() {
        this.publicMember1 = 'public_member1_val1';

        this.publicMethod1 = function() {
            (function() {
                console.log(this.publicMember1);
            }).call(this);
        }
    }

    const testObj2 = new ExampleClass2();
    testObj2.publicMethod1();

    console.log('');
    console.log('Module inside class method example 3');
    console.log('');

    function ExampleClass3() {
        this.publicMember1 = 'public_member1_val1';

        this.publicMethod1 = function() {
            (function() {
                console.log(this.publicMember1);
            }).apply(this);
        }
    }

    const testObj3 = new ExampleClass2();
    testObj3.publicMethod1();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}