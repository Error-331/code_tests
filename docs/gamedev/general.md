# General

- typical game loop implementation:

```js

const updateCamera = () => {/**/};
const updateSceneElements = () => {/**/};
const renderScene = () => {/**/};
const swapBuffers = () => {/**/};

while(!quit) {
    updateCamera();
    updateSceneElements();
    renderScene();
    swapBuffers();
}

```

- `pong` game loop implementation:

```js

const LEFT_PLAYER = 1;
const RIGHT_PLAYER = 1;

const initGame = () => {};
const readHumanInterfaceDevices = () => {};
const quitButtonPressed = () => {};

const movePaddles = () => {};
const moveBall = () => {};

const collideAndBounceBall = () => {};
const ballImpactedSide = () => {};
const incrementScore = () => {};
const resetBall = () => {};
const renderPlayfield = () => {};

initGame();

while(true) {
    readHumanInterfaceDevices();
    
    if (quitButtonPressed()) {
        break; 
    }
    
    movePaddles();
    moveBall();
    collideAndBounceBall();
    
    if (ballImpactedSide(LEFT_PLAYER)) {
        incrementScore(RIGHT_PLAYER);
        resetBall();
    } else if (ballImpactedSide(RIGHT_PLAYER)) {
        incrementScore(LEFT_PLAYER);
        resetBall();
    }
    
    renderPlayfield();
}

```

- there can be multiple loops in the game;

- system (OS, browser, etc.) should be handled before each iteration of game loop, example (Windows):

```

while (true) {
    MSG msg;
    
    while (PeekMessage(&msg, nullptr, 0, 0) > 0) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    
    RunOneIterationOfGameLoop();
}


```

## Subsystems

- device I/O;
- rendering;
- animation;
- collision detection and resolution;
- optional rigid body dynamics simulation;
- multiplayer networking;
- audio;
- etc;
