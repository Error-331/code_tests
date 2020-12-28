'use strict';

// external imports
import {defaultTo, identity, isNil, ifElse, pipe, curry} from 'ramda';

// local imports

// globals declaration
const globalRegistry = new Map();

// functions implementation

// param - name
const getRegistry = pipe(
    defaultTo(null),
    ifElse(
        name => globalRegistry.has(name),
        name => globalRegistry.get(name),
        name => {
            const newRegistry = new Map();
            globalRegistry.set(name, newRegistry);

            return newRegistry;
        }
    )
);

//
const getRegistryEntity = (registry) => {
        return pipe(
            defaultTo(null),
            ifElse(
                name => registry.has(name),
                name => registry.get(name),
                identity
            )
        );
};

const setRegistryEntity = curry((registry, key, entity) => {
    ifElse(
        isNil,
        // maybe
        () => {
            throw new Error('Registry map is not provided');
        },
        () => {
            return ifElse(
                isNil,
                // maybe
                () => {
                    throw new Error('Registry key is not provided');
                },
                () => registry.set(key, entity)
            )(key)
        }
    )(registry)
});

// exports
export {
    getRegistry,
    getRegistryEntity,
    setRegistryEntity
};

