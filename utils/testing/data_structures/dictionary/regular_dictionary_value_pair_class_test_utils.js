// external imports
import assert from 'node:assert/strict';

// internal imports

// implementation
function checkValuePair(valuePair, key, value, stringValue) {
    assert.deepStrictEqual(valuePair.key, key);
    assert.deepStrictEqual(valuePair.value, value);
    assert.deepStrictEqual(valuePair.toString(), stringValue);
}

// exports
export {
    checkValuePair
}
