const nan1 = NaN;

console.log('Type of NaN: ', typeof nan1);

function f1() {
    const f2 = function() {
        console.log(this);
    };

    f2();
}

const obj1 = {
    prop1: 1,
    method1: function() {
        const f2 = function() {
           console.log(this);
        };

        f2();
    }
};

obj1.method1();


(
    function() {
        var first1 = first2 = 1;
        console.log('fff');
    }
)();

console.log('vars', first2);


const c = {};
const b = [1, 2, 3, 4];

c[b] = 5;

console.log(c);
