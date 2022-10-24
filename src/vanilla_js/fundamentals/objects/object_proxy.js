'use strict';

function extend(subClass, baseClass) {
    baseClass.prototype = Object.create(subClass.prototype);
    baseClass.prototype.constructor = new Proxy(baseClass, {
        construct(target, args) {
            const obj = Object.create(baseClass.prototype);
            this.apply(target, obj, args);

            return obj;
        },

        apply(target, that, args) {
            subClass.apply(that, args);
            baseClass.apply(that, args);
        }
    });

    return baseClass.prototype.constructor;
}

class TestClass1 {
    #testPrivateProp1;

    constructor(pProp1) {
        this.#testPrivateProp1 = pProp1;
    }

    get pProp1() {
        return this.#testPrivateProp1;
    }
}

class TestClass2 {
    #testPrivateProp1;

    constructor(pProp1) {
        this.#testPrivateProp1 = pProp1;
    }

    pProp1() {
        return this.#testPrivateProp1;
    }
}

class DBListClass {
    onDataRowChanged(rowNumber, value) {
        console.log(`Changed row number (list): ${rowNumber}; value: ${value}`);
    }
}

class DBORowProxyClass {
    #dataArrayProxy = null;
    #rowNum = null;

    constructor(dataArrayProxy, rowNum) {
        this.#dataArrayProxy = dataArrayProxy;
        this.#rowNum = rowNum;
    }

    set(target, property, value, receiver) {
        console.log(`Changed row number (row): ${this.#rowNum}; value: ${value}`);
        return Reflect.set(...arguments);
    }
}

class DBArrayProxyClass {
    #sublist = null;

    constructor(sublist, dataArray) {
        this.#sublist = sublist;

        for (let rowIdx = 0; rowIdx < dataArray.length; rowIdx++) {
            const rowHandlerObject = new DBORowProxyClass(this, rowIdx);
            dataArray[rowIdx] = new Proxy(dataArray[rowIdx], rowHandlerObject);
        }
    }

    set(target, property, value, receiver) {
        const rowHandlerObject = new DBORowProxyClass(this, property);
        const newObject = new Proxy(value, rowHandlerObject);

        this.#sublist.onDataRowChanged(property, newObject);
        target[property] = newObject;

        return true;
    }
}

const TestParentObjectConstructor1 = function(prop1) {
    this.testProp1 = prop1;
};

const TestSubObjectConstructor1 = extend(TestParentObjectConstructor1, function(prop1, prop2) {
    this.testProp2 = prop2;
});

TestSubObjectConstructor1.prototype.testProp3 = 'test_prop3_val1';

const testObject1 = {
    testProp1: 'test_prop1_val1',
    testProp2: 'test_prop2_val1',
};

const testObject2Class1 = new TestClass1('test_private_prop1_val1');
const testObject1Class2 = new TestClass2('test_private_prop1_val1');

const testSubObject1 = new TestSubObjectConstructor1('test_prop1_val1', 'test_prop2_val1');

const testObject1Proxy1 = {};
const testObject1Proxy2 = {
    get(target, prop, receiver) {
        return 'test_proxy_val1';
    }
};

const testObject1Proxy3 = {
    get(target, prop, receiver) {
        if (prop === 'testProp2') {
            return 'test_proxy_val2';
        }

        return Reflect.get(...arguments);
    }
};

const testEmptyObject1Proxy1 = {
    get(obj, prop) {
        return prop in obj ?
            obj[prop] :
            'test_generic_proxy_val1';
    }
};

const testEmptyObject1Proxy2 = {
    set(obj, prop, value) {
        if (prop === 'pProp1') {
            if (value !== 'test_generic_proxy_val1') {
                throw new TypeError('Wrong value for "pProp1"');
            }
        }

        obj[prop] = value;
        return true;
    }
};

const testObject1Class1Proxy1 = {
    get(target, prop, receiver) {
        return target[prop];
    },
};

const testObject1Class2Proxy1 = {
    get(target, prop, receiver) {
        const value = target[prop];

        if (value instanceof Function) {
            return function (...args) {
                return value.apply(this === receiver ? target : this, args);
            };
        }
        return value;
    },
};

const testArray1Proxy1 = {
    get(obj, prop) {
        const id = parseInt(prop);
        if (isNaN(id)) {
            return undefined;
        }

        for (const row of obj) {
            if (row.id === id) {
                return row;
            }
        }

        return undefined;
    }
};

const testProxy1Object1 = new Proxy(testObject1, testObject1Proxy1);
const testProxy2Object1 = new Proxy(testObject1, testObject1Proxy2);
const testProxy3Object1 = new Proxy(testObject1, testObject1Proxy3);

const testProxy1EmptyObject1 = new Proxy({}, testEmptyObject1Proxy1);
testProxy1EmptyObject1.testProp1 = 'test_prop1_val1';
testProxy1EmptyObject1.testProp2 = null;

const testProxy2EmptyObject1 = new Proxy({}, testEmptyObject1Proxy2)

const testProxy1Object1Class1 = new Proxy(testObject2Class1, {});
const testProxy2Object1Class1 = new Proxy(testObject2Class1, testObject1Class1Proxy1);

const testProxy1Object1Class2 = new Proxy(testObject1Class2, testObject1Class2Proxy1);

const networksArray1 = [
    { id: 1, network: 'Xitrix1', type: 'cloud' },
    { id: 2, network: 'Xitrix2', type: 'cloud' },
    { id: 3, network: 'ThreeFlags1', type: 'com' },
    { id: 4, network: 'ThreeFlags2', type: 'com' },
    { id: 5, network: 'Kia', type: 'cloud' },
    { id: 6, network: 'Keen', type: 'com' },
]

const testProxy1Array1 = new Proxy(networksArray1, testArray1Proxy1);

const dbListInstance = new DBListClass();
const dbArrayProxyHandler = new DBArrayProxyClass(dbListInstance, networksArray1);

const dbArrayProxy = new Proxy(networksArray1, dbArrayProxyHandler);

console.log('Investigation of object proxy feature');
console.log('=====================================');
console.log('');

console.log('testProxy1Object1.testProp1:', testProxy1Object1.testProp1);
console.log('testProxy1Object1.testProp2:', testProxy1Object1.testProp2);

console.log('');

console.log('testProxy2Object1.testProp1:', testProxy2Object1.testProp1);
console.log('testProxy2Object1.testProp2:', testProxy2Object1.testProp2);

console.log('');

console.log('testProxy3Object1.testProp1:', testProxy3Object1.testProp1);
console.log('testProxy3Object1.testProp2:', testProxy3Object1.testProp2);

console.log('');

console.log('testProxy1EmptyObject1.testProp1:', testProxy1EmptyObject1.testProp1);
console.log('testProxy1EmptyObject1.testProp2:', testProxy1EmptyObject1.testProp2);
console.log('testProxy1EmptyObject1.testProp3:', testProxy1EmptyObject1.testProp3);

console.log('');

try {
    console.log('testProxy1Object1Class1.pProp1:', testProxy1Object1Class1.pProp1);
} catch(e) {
    console.log('testProxy1Object1Class1.pProp1:', '**error**');
}

console.log('testProxy2Object1Class1.pProp1:', testProxy2Object1Class1.pProp1);

console.log('');

console.log('testProxy1Object1Class2.pProp1:', testProxy1Object1Class2.pProp1());

console.log('');

try {
    testProxy2EmptyObject1.pProp1 = "test1";
} catch(e) {
    console.log('testProxy2EmptyObject1.pProp1 = "test1":', `**error, ${e.message}**`);
}

console.log('');

console.log('testSubObject1.testProp1:', testSubObject1.testProp1);
console.log('testSubObject1.testProp2:', testSubObject1.testProp2);
console.log('testSubObject1.testProp3:', testSubObject1.testProp3);

console.log('');

console.log('testProxy1Array1[1]:', testProxy1Array1[1]);
console.log('testProxy1Array1[3]:', testProxy1Array1[3]);
console.log('testProxy1Array1[6]:', testProxy1Array1[6]);

console.log('');

console.log('dbArrayProxy[4]:', dbArrayProxy[4]);
dbArrayProxy[4] = {}
console.log('dbArrayProxy[4]:', dbArrayProxy[4]);

dbArrayProxy[4].testProp1 = 'test_prop1_value1';
console.log(dbArrayProxy[4]);

console.log('');

console.log('dbArrayProxy[1].network:', dbArrayProxy[1].network);
dbArrayProxy[1].network = 'test_network';
console.log('dbArrayProxy[1].network:', dbArrayProxy[1].network);
console.log('dbArrayProxy[1]:', dbArrayProxy[1]);
