'use strict';

import {
    COMPARATOR_LESS_THAN,
    COMPARATOR_GREATER_THAN,
    COMPARATOR_EQUAL,
} from './../../constants/comparator_constants';

function defaultCompare(first, second) {
    if (first === second) {
        return COMPARATOR_EQUAL;
    }

    return first < second ? COMPARATOR_LESS_THAN : COMPARATOR_GREATER_THAN;
}

export {
    defaultCompare,
}