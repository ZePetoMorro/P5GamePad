let gamepadPosition;
let touchPosition;
let joystickRadius = 50;
let joystickDeadZone = 30;


p5.prototype.gamePad=function(obj) {
  push()
    if (touches.length === 1) {
    let x = touches[0].x;
    let y = touches[0].y;
    if (!gamepadPosition) {
      gamepadPosition = createVector(x, y);
    }
    touchPosition = createVector(x, y);

    let joystickDirection = p5.Vector.sub(touchPosition, gamepadPosition);

    // Limita o joystick dentro da DeadZone
    if (joystickDirection.mag() > joystickRadius) {
      joystickDirection.normalize();
      joystickDirection.mult(joystickRadius);
    }

    // Atualiza a posição da DeadZone
    let deadZonePosition = p5.Vector.add(gamepadPosition, joystickDirection);

    // Desenha a DeadZone e o joystick
    
    noFill();
    stroke("#33333396");
    strokeWeight(4);
    ellipse(gamepadPosition.x, gamepadPosition.y, joystickRadius * 2);
    fill("#33333396");
    ellipse(deadZonePosition.x, deadZonePosition.y, joystickDeadZone * 2);
    
    // Atualiza o objeto
    obj.position.add(p5.Vector.mult(joystickDirection, obj.speed));
  } else {
    gamepadPosition = null;
    touchPosition = null;
  }
  pop()
}
