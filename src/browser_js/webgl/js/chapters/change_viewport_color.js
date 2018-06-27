function onWindowKeyDown(webGLContext, event){
  switch(event.keyCode){
    case 49: //1
      return clearViewport(webGLContext, 0.3, 0.7, 0.2, 1.0);
    case 50: // 2
      return clearViewport(webGLContext, 0.3, 0.2, 0.7, 1.0);
    case 51:{ // 3
      const color = webGLContext.getParameter(webGLContext.COLOR_CLEAR_VALUE);

      const red = Math.round(color[0] * 10) / 10;
      const green = Math.round(color[1]*10)/10;
      const blue = Math.round(color[2] * 10) / 10;

      alert(`clearColor = (${red}, ${green}, ${blue})`);
    }
  }
}

const $canvas = document.getElementById('canvasWebGLContainer1');
const webGLContext = getWebGLContext($canvas);

const onWindowKeyDownBinded = R.curry(onWindowKeyDown)(webGLContext);

window.onkeydown = onWindowKeyDownBinded;