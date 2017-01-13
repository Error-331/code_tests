'use strict';

// closure example 1
function func1() {
    var a = 10; // enclosed var
    return function g() {
        var b = a + 1;
        return b;
    }
}

var func1Result = func1();
func1Result(); // returns '11'

// closure example 2
function func2() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

func2(); // returns '2'

// closure example 3
function func4() {
    var a = 3;

    function func6() {
        console.log(a);
    }

    func5(func6);
}

function func5(fn) {
    fn();
}

func4(); // prints 3

// closure example 4
var tempFunc1;

function func7() {
    var a = 40;

    function func8() {
        console.log(a);
    }

    tempFunc1 = func8;
 }

function func9() {
    tempFunc1();
}

func7();
func9(); // 40

// closure example 5
for (var  cnt1 = 0; cnt1 < 10; cnt1++) {
    setTimeout(function() {
        console.log(cnt1); }
        , 100 * cnt1);
} // prints 10 all the time

for (var cnt2 = 0; cnt2 < 10; cnt2++) {
    (function(cnt2) {
        setTimeout(function() {
            console.log(cnt2);
        }, 100 * cnt2);
    })(cnt2);
} // prints numbers from 0 to 10

for (let cnt3 = 0; cnt3 < 10; cnt3++) {
    setTimeout(function() { console.log(cnt3); }, 100 * i);
} // prints numbers from 0 to 10
