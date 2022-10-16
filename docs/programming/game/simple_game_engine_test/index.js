// basic loop
while (!quit) {
  // Update the camera transform based on interactive
  // inputs or by following a predefined path.
  updateCamera();

  // Update positions, orientations and any other
  // relevant visual state of any dynamic elements
  // in the scene.
  updateSceneElements();

  // Render a still frame into an off-screen frame
  // buffer known as the "back buffer".
  renderScene();

  // Swap the back buffer with the front buffer, making
  // the most recently rendered image visible
  // on-screen. (Or, in windowed mode, copy (blit) the
  // back buffer's contents to the front buffer.
  swapBuffers();
}

// Pong game loop
void main() // Pong
{
  initGame();

  // game loop
  while (true) {
    readHumanInterfaceDevices();

    if (quitButtonPressed()) {
      break; // exit the game loop
    }

    movePaddles();
    moveBall();
    collideAndBounceBall();

    if (ballImpactedSide(LEFT_PLAYER)) {
      incremenentScore(RIGHT_PLAYER);
      resetBall();
    } else if (ballImpactedSide(RIGHT_PLAYER)) {
      incrementScore(LEFT_PLAYER);
      resetBall();
    }

    renderPlayfield();
  }
}
