import assert from 'node:assert/strict';

import RegularDictionaryValuePairClass from './../code/regular_dictionary_value_pair_class.js';

import {
    checkValuePair
} from './../../../../../../utils/testing/data_structures/dictionary/regular_dictionary_value_pair_class_test_utils.js';

function testRegularDictionaryValuePairCreatedSuccessfullyCase1() {
    let valuePair = null;

    const key = 'test_string_key1';
    const value = 'test_string_value1';

    try {
        valuePair = new RegularDictionaryValuePairClass(key, value);
    } catch (error) {
        assert.fail(`Cannot create a value pair; ${error.message}`);
    }

    checkValuePair(valuePair, key, value, '[#test_string_key1: test_string_value1]');
}

function testRegularDictionaryValuePairCreatedSuccessfullyCase2() {
    let valuePair = null;

    const key = 52;
    const value = 37;

    try {
        valuePair = new RegularDictionaryValuePairClass(key, value);
    } catch (error) {
        assert.fail(`Cannot create a value pair; ${error.message}`);
    }

    checkValuePair(valuePair, key, value, '[#52: 37]');
}

function testRegularDictionaryValuePairCreatedSuccessfullyCase3() {
    let valuePair = null;

    const key = null;
    const value = true;

    try {
        valuePair = new RegularDictionaryValuePairClass(key, value);
    } catch (error) {
        assert.fail(`Cannot create a value pair; ${error.message}`);
    }

    checkValuePair(valuePair, key, value, '[#null: true]');
}

function testRegularDictionaryValuePairCreatedSuccessfullyCase4() {
    let valuePair = null;

    const key = { tempParam1: 'tempVal1' };
    const value = undefined;

    try {
        valuePair = new RegularDictionaryValuePairClass(key, value);
    } catch (error) {
        assert.fail(`Cannot create a value pair; ${error.message}`);
    }

    checkValuePair(valuePair, key, value, '[#[object Object]: undefined]');
}

testRegularDictionaryValuePairCreatedSuccessfullyCase1();
testRegularDictionaryValuePairCreatedSuccessfullyCase2();
testRegularDictionaryValuePairCreatedSuccessfullyCase3();
testRegularDictionaryValuePairCreatedSuccessfullyCase4();