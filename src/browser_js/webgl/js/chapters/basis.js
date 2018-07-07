'use strict';

function drawScene(webGLContext, webGLProgram, buffersData, canvasWidth, canvasHeight) {
  webGLContext.clearColor(0.0, 0.0, 0.0, 1.0);
  webGLContext.enable(webGLContext.DEPTH_TEST);

  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT | webGLContext.DEPTH_BUFFER_BIT);
  webGLContext.viewport(0, 0, canvasWidth, canvasHeight);

  let mvMatrix = mat4.create(); // The Model-View matrix
  let pMatrix = mat4.create(); // The projection matrix

  mat4.perspective(pMatrix, 45, canvasWidth / canvasHeight, 0.1, 10000.0);
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -5.0]);

  webGLContext.uniformMatrix4fv(webGLProgram.pMatrixUniform, false, pMatrix);
  webGLContext.uniformMatrix4fv(webGLProgram.mvMatrixUniform, false, mvMatrix);

  //webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, buffersData.vertexBuffer);
  webGLContext.vertexAttribPointer(webGLProgram.aVertexPosition, 3, webGLContext.FLOAT, false, 0, 0);
  webGLContext.enableVertexAttribArray(webGLProgram.vertexPositionAttribute);

  //webGLContext.bindBuffer(webGLContext.ELEMENT_ARRAY_BUFFER, buffersData.indicesBuffer);
  webGLContext.drawElements(webGLContext.LINE_LOOP, buffersData.indices.length, webGLContext.UNSIGNED_SHORT, 0);
}

function renderLoop(webGLContext, webGLProgram, buffersData, canvasWidth, canvasHeight) {
  requestAnimationFrame(() => renderLoop(webGLContext, webGLProgram, buffersData, canvasWidth, canvasHeight));
  drawScene(webGLContext, webGLProgram, buffersData, canvasWidth, canvasHeight);
}

function initBuffers(webGLContext) {
  const vertexBuffer = webGLContext.createBuffer(); // vertex Buffer Object
  webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, vertexBuffer);

  const vertices = [1.5, 0, 0,
    -1.5, 1, 0,
    -1.5, 0.809017, 0.587785,
    -1.5, 0.309017, 0.951057,
    -1.5, -0.309017, 0.951057,
    -1.5, -0.809017, 0.587785,
    -1.5, -1, 0.0,
    -1.5, -0.809017, -0.587785,
    -1.5, -0.309017, -0.951057,
    -1.5, 0.309017, -0.951057,
    -1.5, 0.809017, -0.587785]; // JavaScript Array that populates vertex Buffer Object

  webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array(vertices), webGLContext.STATIC_DRAW);

  const indicesBuffer = webGLContext.createBuffer();
  webGLContext.bindBuffer(webGLContext.ELEMENT_ARRAY_BUFFER, indicesBuffer);

  const indices = [0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 5, 6,
    0, 6, 7,
    0, 7, 8,
    0, 8, 9,
    0, 9, 10,
    0, 10, 1];

  webGLContext.bufferData(webGLContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), webGLContext.STATIC_DRAW);

  // webGLContext.bindBuffer(webGLContext.ELEMENT_ARRAY_BUFFER, null);
  // webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, null);

  return {
    vertices,
    indices,
    vertexBuffer,
    indicesBuffer
  };
}

const $canvas = document.getElementById('canvasWebGLContainer1');
const webGLContext = getWebGLContext($canvas);
const webGLProgram = initWebGLProgram(webGLContext);

const buffersData = initBuffers(webGLContext);
drawScene(webGLContext, webGLProgram, buffersData, 800, 600);
renderLoop(webGLContext, webGLProgram, buffersData, 800, 600);
