'use strict';

import {
    __,
    add,
    addIndex,
    always,
    ap,
    apply,
    applySpec,
    applyTo,
    ascend,
    binary,
    bind,
    call,
    comparator,
    compose,
    composeK,
    composeP,
    composeWith,
    construct,
    constructN,
    converge,
    curry,
    curryN,
    descend,
    empty,
    F,
    flip,
    identity,
    invoker,
    juxt,
    lift,
    liftN,
    memoizeWith,
    nAry,
    nthArg,
    o,
    of,
    once,
    otherwise,
    partial,
    partialRight,
    pipe,
    pipeWith,
    T,
    tap,
    then,
    thunkify,
    tryCatch,
    unapply,
    unary,
    uncurryN,
} from 'ramda';
import {concat, prop, last, forEach, sortBy, map, toUpper} from 'ramda';

import Maybe from 'folktale/maybe';

export default async () => {
    // test data
    const lettersArray1 = ['a', 'z', 'g', 'h', 'j'];
    const indexedLettersArray1 = ['b-4', 'e-1', 'a-5', 'c-3', 'd-2'];

    const testJSON1 = '{"user":{"address":{"state": "fl"}}}';

    const beingsArray1 = [
      {name: 'Impala', speed: 90, live: true},
      {name: 'Tomcat', speed: 50, live: true},
      {name: 'Bobcat', speed: 40, live: true},
      {name: 'Pagani', speed: 420, live: false}
    ];

    const testWords1 = ['run', 'go', 'look'];

    const tupleStringsArray1 = ['th', 'zs', 'xb'];
    const tupleStringsArray2 = ['ww', 'ee', 'rr'];
    const tupleStringsArray3 = ['11', '22', '33'];

    // __

    // add
    const addOne = x => add(x, 1);

    // addIndex
    const indexedForEach = addIndex(forEach);
    const lettersPrinterFunc1 = (letter, letterIndex, letters) => {
        console.log(`Letter: '${letter}' (idx - ${letterIndex}) of [${letters}]`);
    };

    // always
    const alwaysTrue = always(true);
    const alwaysLetterA = always('a');
    const alwaysNumber4 = always(4);

    // ap
    const toUpperCaseFunc = usrString => usrString.toUpperCase();
    const addSlashFunc = usrString => usrString + '/';

    // apply
    const addBackSlashesToArrayFunc = function() {
        const argumentsArray = Array.prototype.slice.call(arguments);
        return argumentsArray.map(letter => letter + '\\');
    };

    // applySpec
    const getNewDevice = applySpec({
        id: id => id,
        name: (id, groupName, groupId) => `${groupName}_${groupId}`,

        devices: [],
        screenShotsSettings: {
            diagnosticScreenshotsEnabled: (id, groupName, groupId, supportDiagnostics) => supportDiagnostics,
            formats: {
                png: always('notSupported'),
                gif: always('notSupported'),
                tiff: always('notSupported')
            }
        }
    });

    // applyTo
    const valueFunc1 = applyTo(331);

    // ascend
    const sortAscendingIndexedArray = ascend(indexedLetter => parseInt(indexedLetter[2]));

    // binary
    const noneBinaryFunction1 = (add1, add2, add3) => {
        let sum = 0;

        sum += add1;
        sum += add2;
        sum += add3 ? add3 : 0;

        return sum;
    };

    const binaryFunction1 = binary(noneBinaryFunction1);

    // bind
    const testObj1 = {prop1: 300};

    const bindableFunc1 = function(arg1) {
        return this.prop1 + arg1;
    };

    const bindedFunc1 = bind(bindableFunc1, testObj1);

    // call
    const callableFunc1 = function(arg1, arg2, arg3) {
        return arg1 + arg2 + arg3;
    };

    // comparator
    const unsortedNumbersArray1 = [2, 100, 57, 29, 38, 37];

    const byNumberAscComparator1 = comparator((firstNum, secondNum) => firstNum < secondNum);
    const byNumberDescComparator1 = comparator((firstNum, secondNum) => firstNum > secondNum);

    // compose
    const roundedSqrt = compose(Math.round, Math.sqrt);
    const squaredDate = compose(roundedSqrt, Date.parse);

    const fastestBeing = compose(
      flip(concat)(' is the fastest'),
      prop('name'),
      last,
      sortBy(prop('speed')),
    );

    // composeK
    const parseJSON = curry(jsonToParse => {
        try {
            return JSON.parse(jsonToParse);
        }
        catch(e) {
            return null
        }
    });

    const parseJSONChained = curry(jsonToParse => {
        const parsedJSON = parseJSON(jsonToParse);
        if (parsedJSON !== null) {
            return [parsedJSON];
        }

        return parsedJSON;
    });

    const parseJSONMaybe = curry(jsonToParse => {
        return Maybe.fromNullable(parseJSON(jsonToParse))
    });

    const getPropChained = curry((name, obj) => {
        return [obj[name]];
    });

    const getPropMaybe = curry((name, obj) => {
        return Maybe.fromNullable(obj[name]);
    });

    const stateToUpperCase = composeK(
      toUpper,
      getPropChained('state'),
      getPropChained('address'),
      getPropChained('user'),
      parseJSONChained
    );

    const stateToUpperCaseMaybe = composeK(
        compose(Maybe.of, toUpper),
        getPropMaybe('state'),
        getPropMaybe('address'),
        getPropMaybe('user'),
        parseJSONMaybe
    );

    // composeP
    const loadTemplates = () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                'template1': {
                    name: 'Card 1'
                },
                'template2': {
                    name: 'Cars 1'
                },
            }), 2000);
        });
    };

    const loadCampaigns = (templates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const campaigns = [
                    {
                        id: 1,
                        name: 'Campaign 1',
                        templateId: 'template1',
                    },
                    {
                        id: 2,
                        name: 'Campaign 2',
                        templateId: 'template2',
                    }
                ];

                const newCampaigns = campaigns.map((campaign) => {
                    const newCampaign = Object.assign({}, campaign);
                    newCampaign.template = templates[campaign.templateId];

                    return newCampaign;
                });

                return resolve(newCampaigns);
            }, 2000);
        });
    };

    const composeTemplatesAndCampaigns = composeP(loadCampaigns, loadTemplates);

    // composeWith
    const multiply = (a, b) => a * b;
    const square = x => x * x;

    const operate1 = composeWith((transformFunc, res) => res >= 100 ? 0 : transformFunc(res))([
        square,
        addOne,
        multiply,
    ]);

    // construct
    function TemplateClass(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    TemplateClass.prototype.getTemplateString = function() {
        const {id, name, type} = this;

        return `Template (${id}) with name '${name} of type ${type}'`;
    };

    const TemplateClasslConstructor = construct(TemplateClass);
    const templateClassInstance = TemplateClasslConstructor(5, 'Test template 1', 'ad');

    class UserClass {
        constructor(id, name, surname) {
            this.id = id;
            this.name = name;
            this.surname = surname;
        }

        getUserString() {
            const {id, name, surname} = this;
            return `User ${name} ${surname}  with id - (${id})`;
        }
    }

    const UserClassConstructor = construct(UserClass);
    const userClassInstance = UserClassConstructor(6, 'Max', 'Zaicev');

    // constructN
    class IngredientsClass {
        constructor() {
            this.ingredients = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        }

        getIngredientsList() {
            return this.ingredients.map((ingredient, index) => {
                return `Ingredient ${index + 1}: ${ingredient}`
            });
        }
    }

    const IngredientsClassConstructor = constructN(3, IngredientsClass);
    const ingredientsClassInstance = IngredientsClassConstructor('tomato', 'salad', 'feta cheese');

    // converge
    const average = converge((sum, length) => sum / length, [
        (userArray) => userArray.reduce((sum, item) => sum + item, 0),
        (userArray) => userArray.length
    ]);

    // curry
    const numberToHex = (component) => {
        const hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const numbersToHex = (...args) => {
        return [...args].map(numberToHex).join('');
    };

    const rgbToHex = (red, green, blue) => {
        return '#' + numbersToHex(red) + numbersToHex(green) + numbersToHex(blue);
    };

    const hexColors = curry(rgbToHex);

    // curryN
    const addThreeNumbers = (first, second, third) => {
        return first + second + third;
    };

    const addTheeNumbersByOne = curryN(3, addThreeNumbers);

    // descending
    const sortDescendIndexedArray = descend(indexedLetter => parseInt(indexedLetter[2]));

    // flip
    const concatThreeNumbersReverse = flip((first, second, third) => {
        return `${first}${second}${third}`
    });

    // invoker
    const invokedObj1 = {
        testParam1: 10,
        invokedTest1: function(arg1, arg2) {
            return (this.testParam1 + arg1) / arg2;
        }

    };

    const invoked1 = invoker(2, 'invokedTest1');

    // juxt
    const addPrefixPostfix = juxt([map(word => `we should ${word}`), map(word => `${word}ing`)]);

    // lift
    const concatStringTuples1 = lift((first, second, third) => first + second + third);

    // liftN
    const concatStringTuples2 = liftN(3, (first, second, third) => first + second + third);

    // memoizeWith
    let decorateValue1Counter = 0;

    const decorateValue1 = memoizeWith(key => `${key}`, (val) => {
        decorateValue1Counter = decorateValue1Counter + 1;
        return `-- ${val + val} --`
    });

    // nAry
    const concatStringThreeArgs = (first, second, third) => `${first}_${second}_${third}`;
    const concatStringOneArg = nAry(1, concatStringThreeArgs);

    // o
    const pickFirstLetter = map(item => item[0]);
    const letterToUpper = map(item => toUpper(item));
    const firstLetterToUpper = o(letterToUpper, pickFirstLetter);

    // once
    const incrementOneValue = once(value => value + 1);

    // otherwise
    const onPromiseFailHandler = otherwise(reason => ({error: reason, message: `${reason} error`}));

    // partial
    const composeAddress = partial((http, domain, path) => `${http}://${domain}/${path}`, ['http']);

    // partial right
    const squareOf = partialRight(Math.pow, [2]);
    const cubeOf = partialRight(Math.pow, [3]);

    // pipe
    const operate2 = pipe(
        multiply,
        addOne,
        square
    );

    // pipeWith
    const operate3 = pipeWith((transformFunc, res) => res >= 100 ? 0 : transformFunc(res))([
        multiply,
        addOne,
        square
    ]);

    // tap `${being.name}-${being.speed}`
    const concatBeingNameSpeed = tap(being => console.log(`${being.name}-${being.speed}`));

    // then
    const onPromiseResolve = then(being => {return [being.name, being.speed];});

    // thunkify
    const extractSomeName = thunkify(being => being.name)(beingsArray1[2]);

    // tryCatch
    const funcToTry1 = () => {throw new Error('Some test error 1');};

    // unapply
    const extractBeingsNames = unapply(map(being => being.name));

    // unary
    const arrayByFirstArg = unary((first, second, third) => [first, second, third]);

    // uncurryN
    const concatArrayThreeArgs = first => second => third => [first, second, third];
    const auncurryNThreeArgs = uncurryN(3, concatArrayThreeArgs);

    console.log('');
    console.log('"Functions" category');
    console.log('--------------------');

    console.log('');
    console.log('__ examples:');
    console.log('');

    console.log('hexColors(11,12,123) -', hexColors(11,12,123));
    console.log('hexColors(R.__, R.__, 0)(210)(12) -', hexColors(__, __, 0)(210)(12));

    console.log('');
    console.log('Add examples:');
    console.log('');

    console.log('addOne(1) -', addOne(1));
    console.log('addOne(2) -', addOne(2));
    console.log('addOne(3) -', addOne(3));

    console.log('');
    console.log('AddIndex examples:');
    console.log('');

    indexedForEach(lettersPrinterFunc1, lettersArray1);

    console.log('');
    console.log('Always examples:');
    console.log('');

    console.log('alwaysTrue() -', alwaysTrue());
    console.log('alwaysLetterA() -', alwaysLetterA());
    console.log('alwaysNumber4() -', alwaysNumber4());

    console.log('');
    console.log('Ap examples:');
    console.log('');

    console.log('ap([toUpperCaseFunc, addSlashFunc], lettersArray1) -', ap([toUpperCaseFunc, addSlashFunc], lettersArray1));

    console.log('');
    console.log('Apply examples:');
    console.log('');

    console.log('apply(addBackSlashFunc, lettersArray1) -', apply(addBackSlashesToArrayFunc, lettersArray1));

    console.log('');
    console.log('ApplySpec examples:');
    console.log('');

    console.log('getNewDevice(5, "test_reg_group", 45, false) -', getNewDevice(5, 'test_reg_group', 45, false));

    console.log('');
    console.log('ApplyTo examples:');
    console.log('');

    console.log('valueFunc1(x => x + 100) -', valueFunc1(x => x + 100));
    console.log('valueFunc1(x => `${x}_221`) -', valueFunc1(x => `${x}_221`));

    console.log('');
    console.log('Ascend examples:');
    console.log('');

    console.log('Sorted "indexedLettersArray1" (ascend) -', indexedLettersArray1.sort(sortAscendingIndexedArray));

    console.log('');
    console.log('Binary examples:');
    console.log('');

    console.log('noneBinaryFunction1.length -', noneBinaryFunction1.length);
    console.log('binaryFunction1.length -', binaryFunction1.length);

    console.log('');

    console.log('noneBinaryFunction1(1, 2, 3) -', noneBinaryFunction1(1, 2, 3));
    console.log('binaryFunction1(1, 2, 3) -', binaryFunction1(1, 2, 3));

    console.log('');
    console.log('Bind examples:');
    console.log('');

    console.log('bindedFunc1(10) -', bindedFunc1(10));
    console.log('bindedFunc1(100) -', bindedFunc1(100));

    console.log('');
    console.log('Call examples:');
    console.log('');

    console.log('call(callableFunc1, 100, 50, -20) -', call(callableFunc1, 100, 50, -20));
    console.log('call(callableFunc1, -30, -20, 50) -', call(callableFunc1, -30, -20, 50));

    console.log('');
    console.log('Comparator examples:');
    console.log('');

    console.log('unsortedNumbersArray1.sort(byNumberAscComparator1) -', unsortedNumbersArray1.sort(byNumberAscComparator1));
    console.log('unsortedNumbersArray1.sort(byNumberDescComparator1) -', unsortedNumbersArray1.sort(byNumberDescComparator1));
    
    console.log('');
    console.log('Compose examples:');
    console.log('');

    console.log('roundedSqrt(5) -', roundedSqrt(5));
    console.log('squaredDate("January 1, 2014") -', squaredDate("January 1, 2014"));
    console.log('fastestBeing(beingsArray1) -', fastestBeing(beingsArray1));

    console.log('');
    console.log('ComposeK examples:');
    console.log('');

    console.log('stateToUpperCase(testJSON1) -', stateToUpperCase(testJSON1));
    console.log('stateToUpperCaseMaybe(testJSON1).value -', stateToUpperCaseMaybe(testJSON1).value);

    console.log('');
    console.log('ComposeP examples:');
    console.log('');

    console.log('composeTemplatesAndCampaigns() -', await composeTemplatesAndCampaigns());

    console.log('');
    console.log('ComposeWith examples:');
    console.log('');

    console.log('operate1(3, 4) -', operate1(3, 4));
    console.log('operate1(10, 10) -', operate1(10, 10));

    console.log('');
    console.log('Construct examples:');
    console.log('');

    console.log('templateClassInstance.getTemplateString() -', templateClassInstance.getTemplateString());
    console.log('userClassInstance.getUserString() -', userClassInstance.getUserString());

    console.log('');
    console.log('ConstructN examples:');
    console.log('');

    console.log('ingredientsClassInstance.getIngredientsList() -');
    console.log(ingredientsClassInstance.getIngredientsList());

    console.log('');
    console.log('Converge examples:');
    console.log('');

    console.log('average([1, 10, 29, 32, 67, 52]) -', average([1, 10, 29, 32, 67, 52]));

    console.log('');
    console.log('Currying examples:');
    console.log('');

    console.log('hexColors(11)(12)(123) -', hexColors(11)(12)(123));
    console.log('hexColors(210)(12)(0) -', hexColors(210)(12)(0));

    console.log('');
    console.log('CurryN examples:');
    console.log('');

    console.log('addTheeNumbersByOne(5)(7)(3) -', addTheeNumbersByOne(5)(7)(3));

    console.log('');
    console.log('Descend examples:');
    console.log('');

    console.log('Sorted "indexedLettersArray1" (descend) -', indexedLettersArray1.sort(sortDescendIndexedArray));

    console.log('');
    console.log('Empty examples:');
    console.log('');

    console.log("empty(['1', '2', '3']) -", empty(['1', '2', '3']));
    console.log("empty('test') -", empty('test'));
    console.log("empty({prop1: 'prop1_val', prop2: 'prop2_val'}) -", empty({prop1: 'prop1_val', prop2: 'prop2_val'}));

    console.log('');
    console.log('F examples:');
    console.log('');

    console.log('F -', F());

    console.log('');
    console.log('Flip examples:');
    console.log('');

    console.log('concatThreeNumbersReverse(1,2,3) -', concatThreeNumbersReverse(1,2,3));

    console.log('');
    console.log('Identity examples:');
    console.log('');

    console.log('identity("test_val") -', identity('test_val'));

    console.log('');
    console.log('Invoker examples:');
    console.log('');

    console.log('invoked1(10, 2, invokedObj1) -', invoked1(10, 2, invokedObj1));

    console.log('');
    console.log('Juxt examples:');
    console.log('');

    console.log('addPrefixPostfix(testWords1) -', addPrefixPostfix(testWords1));

    console.log('');
    console.log('Lift examples:');
    console.log('');

    console.log('concatStringTuples1(tupleStringsArray1, tupleStringsArray2, tupleStringsArray3) -', concatStringTuples1(tupleStringsArray1, tupleStringsArray2, tupleStringsArray3));

    console.log('');
    console.log('LiftN examples:');
    console.log('');

    console.log('concatStringTuples2(tupleStringsArray1, tupleStringsArray2, tupleStringsArray3) -', concatStringTuples2(tupleStringsArray1, tupleStringsArray2, tupleStringsArray3));

    console.log('');
    console.log('MemoizeWith examples:');
    console.log('');

    console.log('decorateValue1(1) -', decorateValue1(1));
    console.log('decorateValue1(1) -', decorateValue1(1));
    console.log('decorateValue1Counter -', decorateValue1Counter);

    console.log('');
    console.log('NAry examples:');
    console.log('');

    console.log('concatStringThreeArgs("a1", "a2", "a3") -', concatStringThreeArgs('a1', 'a2', 'a3'));
    console.log('concatStringOneArg("a1", "a2", "a3") -', concatStringOneArg('a1', 'a2', 'a3'));

    console.log('');
    console.log('NthArg examples:');
    console.log('');

    console.log('nthArg(0)("first", "second", "third") -', nthArg(0)('first', 'second', 'third'));
    console.log('nthArg(1)("a1", "a2", "a3") -', nthArg(1)('a1', 'a2', 'a3'));
    console.log('nthArg(2)(111, 222, 333) -', nthArg(2)(111, 222, 333));

    console.log('');
    console.log('O examples:');
    console.log('');

    console.log('firstLetterToUpper(indexedLettersArray1) -', firstLetterToUpper(indexedLettersArray1));

    console.log('');
    console.log('Of examples:');
    console.log('');

    console.log('of(2) -', of(2));
    console.log('of(["a"]) -', of(['a']));

    console.log('');
    console.log('Once examples:');
    console.log('');

    console.log('incrementOneValue(22) -', incrementOneValue(22));
    console.log('incrementOneValue(42) -', incrementOneValue(42));

    console.log('');
    console.log('Otherwise examples:');
    console.log('');

    let promiseResult = await onPromiseFailHandler(Promise.reject('unknown'));
    console.log('promiseResult -', promiseResult);

    console.log('');
    console.log('Partial examples:');
    console.log('');

    console.log('composeAddress("some-domain", "some/path/1") -', composeAddress('some-domain', 'some/path/1'));

    console.log('');
    console.log('PartialRight examples:');
    console.log('');

    console.log('squareOf(3) -', squareOf(3));
    console.log('squareOf(4) -', squareOf(4));
    console.log('cubeOf(3) -', cubeOf(3));
    console.log('cubeOf(4) -', cubeOf(4));

    console.log('');
    console.log('Pipe examples:');
    console.log('');

    console.log('operate1(3, 4) -', operate2(3, 4));
    console.log('operate1(10, 10) -', operate2(10, 10));

    console.log('');
    console.log('PipeWith examples:');
    console.log('');

    console.log('operate2(3, 4) -', operate3(3, 4));
    console.log('operate2(10, 10) -', operate3(10, 10));

    console.log('');
    console.log('T examples:');
    console.log('');

    console.log('T() -', T());

    console.log('');
    console.log('Tap examples:');
    console.log('');

    forEach(concatBeingNameSpeed, beingsArray1);

    console.log('');
    console.log('Then examples:');
    console.log('');

    promiseResult = await onPromiseResolve(Promise.resolve(beingsArray1[0]));
    console.log('promiseResult -', promiseResult);

    console.log('');
    console.log('Thunkify examples:');
    console.log('');

    console.log('extractSomeName() -', extractSomeName());

    console.log('');
    console.log('TryCatch examples:');
    console.log('');

    console.log('tryCatch(funcToTry1, error => `error catched(${error.message})`)(23) -', tryCatch(funcToTry1, error => `error catched(${error.message})`)(23));

    console.log('');
    console.log('TryCatch examples:');
    console.log('');

    console.log('extractBeingsNames(beingsArray1[0], beingsArray1[1], beingsArray1[2]) -', extractBeingsNames(beingsArray1[0], beingsArray1[1], beingsArray1[2]));

    console.log('');
    console.log('Unary examples:');
    console.log('');

    console.log(arrayByFirstArg(1, 2, 3));

    console.log('');
    console.log('UncurryN examples:');
    console.log('');

    console.log(auncurryNThreeArgs(1, 2, 3));

    console.log('');
    console.log('***');
    console.log('');
};