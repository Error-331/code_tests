'use strict';

// external imports

// local imports
import {getRegistry, getRegistryEntity, setRegistryEntity} from './utility/register';

// constants declaration (private)
const WEB_GL_CONTEXT_INSTANCES_REGISTRY_NAME = 'WEB_GL_CONTEXT_INSTANCES';
const WEB_GL_PROGRAM_INSTANCES_REGISTRY_NAME = 'WEB_GL_PROGRAM_INSTANCES';

const WEB_GL_DOM_INSTANCES_REGISTRY_NAME = 'WEB_GL_DOM_INSTANCES';

// constants declaration (public)
const WEB_GL_DEFAULT_CONTEXT_NAME = ' WEB_GL_DEFAULT_CONTEXT';

// globals declaration
const webGLContextInstancesRegistry = getRegistry(WEB_GL_CONTEXT_INSTANCES_REGISTRY_NAME);
const webGLProgramInstancesRegistry = getRegistry(WEB_GL_PROGRAM_INSTANCES_REGISTRY_NAME);
const webGLDOMInstancesRegistry = getRegistry(WEB_GL_DOM_INSTANCES_REGISTRY_NAME);

// functions implementation
const getWebGLContextInstance = getRegistryEntity(webGLContextInstancesRegistry);
const getWebGLProgramInstance = getRegistryEntity(webGLProgramInstancesRegistry);
const getWebGLDOMInstance = getRegistryEntity(webGLDOMInstancesRegistry);

const setWebGLContextInstance = setRegistryEntity(webGLContextInstancesRegistry);
const setWebGLProgramInstance = setRegistryEntity(webGLProgramInstancesRegistry);
const setWebGLDOMInstance = setRegistryEntity(webGLDOMInstancesRegistry);

const prepareWebGLContext = curry((name, $contextElement) => {
    setWebGLDOMInstance(name, $contextElement);
    setWebGLContextInstance(name, getWebGLContext($contextElement));
});

const prepareDefaultWebGLContext = prepareWebGLContext(WEB_GL_DEFAULT_CONTEXT_NAME);

// exports
export {
    WEB_GL_DEFAULT_CONTEXT_NAME,

    getWebGLContextInstance,
    getWebGLProgramInstance,
    getWebGLDOMInstance,

    setWebGLContextInstance,
    setWebGLProgramInstance,
    setWebGLDOMInstance,

    prepareWebGLContext,
    prepareDefaultWebGLContext,
};
