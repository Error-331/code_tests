// external imports

// local imports
import { getCanvasContext, getCanvasHeight, getCanvasWidth } from './../dom';

// implementation
const drawRectangle = (x, y, width, height, color) => {
    const canvasContext = getCanvasContext();

    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

const drawTriangle = (x, y, width, color, direction) => {
    const canvasContext = getCanvasContext();

    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.moveTo(x - width, y);

    canvasContext.lineTo(x, direction === 'up' ? y - width : y + width);
    canvasContext.lineTo(x + width, y);
    canvasContext.lineTo(x - width, y);

    canvasContext.fill();
};

const drawScene = () => {
    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    drawRectangle(0, 0, canvasWidth, canvasHeight, '#000000');
};

// export
export {
    drawRectangle,
    drawTriangle,
    drawScene,
}
