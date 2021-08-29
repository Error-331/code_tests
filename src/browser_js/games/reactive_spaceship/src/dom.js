'use strict';

// external imports

// local imports

// implementation
let $canvas;
let canvasContext;

const initDOM = () => {
    $canvas = document.createElement('canvas');
    canvasContext = $canvas.getContext('2d');

    document.body.appendChild($canvas);

    $canvas.width = window.innerWidth;
    $canvas.height = window.innerHeight;
};

const getCanvasElement = () => $canvas;
const getCanvasContext = () => canvasContext;

const getCanvasWidth = () => $canvas.width;
const getCanvasHeight = () => $canvas.height;

// exports
export {
    initDOM,

    getCanvasElement,
    getCanvasContext,

    getCanvasWidth,
    getCanvasHeight,
};
