'use strict';

function clearViewport(webGLContext, red, green, blue, alpha = 1.0, width = 0, height = 0){
  webGLContext.clearColor(red, green, blue, alpha);

  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT);
  webGLContext.viewport(0, 0, width, height);
}

// throws error
function getWebGLContext($canvas, contextType = 1){
  const contextNameType = contextType === 2 ? 'webgl2' : 'webgl';
  return $canvas.getContext(contextNameType);
}