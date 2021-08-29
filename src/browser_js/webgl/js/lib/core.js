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





function initWebGLProgram(webGLContext, vertexShaders, fragmentShaders) {
  vertexShaders = R.unless(R.is(Object), vShader => [vShader])(vertexShaders);
  fragmentShaders = R.unless(R.is(Object), fShader => [fShader])(fragmentShaders);

  const webGLProgram = webGLContext.createProgram();

  prepareShaders(webGLContext.VERTEX_SHADER, vertexShaders);
  prepareShaders(webGLContext.FRAGMENT_SHADER, fragmentShaders);

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

function gatherBufferStats(webGLContext, vertexBuffer, indexBuffer) {
  const stats = {
    vBufferBound: false,
    iBufferBound: false,

    vboSize: null,
    vboUsage: null,

    iboSize: null,
    iboUsage: null,
  };

  const arrayBufferBinding = webGLContext.getParameter(webGLContext.ARRAY_BUFFER_BINDING);
  stats.vBufferBound = R.equals(arrayBufferBinding, vertexBuffer);

  const elementArrayBufferBinding = webGLContext.getParameter(webGLContext.ARRAY_BUFFER_BINDING);
  stats.iBufferBound = R.equals(elementArrayBufferBinding, indexBuffer);

  stats.vboSize = webGLContext.getBufferParameter(webGLContext.ARRAY_BUFFER, webGLContext.BUFFER_SIZE);
  stats.vboUsage = webGLContext.getBufferParameter(webGLContext.ARRAY_BUFFER, webGLContext.BUFFER_USAGE);

  stats.iboSize = webGLContext.getBufferParameter(webGLContext.ELEMENT_ARRAY_BUFFER, webGLContext.BUFFER_SIZE);
  stats.iboUsage = webGLContext.getBufferParameter(webGLContext.ELEMENT_ARRAY_BUFFER, webGLContext.BUFFER_USAGE);

  return stats;
}
