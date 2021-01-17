'use strict';

// external imports
import {} from 'ramda';

// local imports

// functions implementation
const createShaderFromString = (shaderType, shaderCode, contextName) => {
    // maybe

    const shader = webGLContext.createShader(shaderType);

    webGLContext.shaderSource(shader, shaderCode);
    webGLContext.compileShader(shader);

    const shaderCompileStatus = webGLContext.getShaderParameter(shader, webGLContext.COMPILE_STATUS);
    R.unless(R.equals(true), () => {throw new Error(`Cannot create shader: ${webGLContext.getShaderInfoLog(shader)}`);})(shaderCompileStatus);

    return shader;
};

const prepareShaders = (shaderType, shaderSRCCodes, programName) => {
    R.forEach(shaderCode =>  {
        const vShader = createShaderFromString(webGLContext, shaderType, shaderCode);
        webGLContext.attachShader(webGLProgram, vShader);
    }, shaderSRCCodes);
};

// exports
