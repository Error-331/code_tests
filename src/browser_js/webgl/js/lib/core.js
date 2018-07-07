'use strict';

function clearViewport(webGLContext, red, green, blue, alpha = 1.0, width = 0, height = 0) {
  webGLContext.clearColor(red, green, blue, alpha);

  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT);
  webGLContext.viewport(0, 0, width, height);
}

// throws error
function getWebGLContext($canvas, contextType = 1) {
  const contextNameType = contextType === 2 ? 'webgl2' : 'webgl';
  return $canvas.getContext(contextNameType);
}

/*
gl.FRAGMENT_SHADER
gl.VERTEX_SHADER

throws error
 */

function createShaderFromString(webGLContext, shaderType, shaderCode) {
  const shader = webGLContext.createShader(shaderType);

  webGLContext.shaderSource(shader, shaderCode);
  webGLContext.compileShader(shader);

  const shaderCompileStatus = webGLContext.getShaderParameter(shader, webGLContext.COMPILE_STATUS);
  R.unless(R.equals(true), () => {throw new Error(`Cannot create shader: ${webGLContext.getShaderInfoLog(shader)}`);})(shaderCompileStatus);

  return shader;
}

function initWebGLProgram(webGLContext) {
  const fgShader = createShaderFromString(webGLContext, webGLContext.FRAGMENT_SHADER, `
    #ifdef GL_ES
      precision highp float;
    #endif

    void main(void) {
        gl_FragColor = vec4(0.5, 0.9, 0.2, 1.0); //Green
    }
  `);

  const vxShader = createShaderFromString(webGLContext, webGLContext.VERTEX_SHADER, `
    attribute vec3 aVertexPosition;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        gl_PointSize = 3.0;
    }
  `);

  const webGLProgram = webGLContext.createProgram();

  webGLContext.attachShader(webGLProgram, vxShader);
  webGLContext.attachShader(webGLProgram, fgShader);
  webGLContext.linkProgram(webGLProgram);

  if (!webGLContext.getProgramParameter(webGLProgram, webGLContext.LINK_STATUS)) {
    alert('Could not initialise shaders');
  }

  webGLContext.useProgram(webGLProgram);

  webGLProgram.vertexPositionAttribute = webGLContext.getAttribLocation(webGLProgram, 'aVertexPosition');
  webGLProgram.pMatrixUniform = webGLContext.getUniformLocation(webGLProgram, 'uPMatrix');
  webGLProgram.mvMatrixUniform = webGLContext.getUniformLocation(webGLProgram, 'uMVMatrix');

  return webGLProgram;
}