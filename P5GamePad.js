let gamepadPosition;
let touchPosition;
let joystickRadius = 50;
let joystickDeadZone = 30;


p5.prototype.gamePad=function(obj,cameraX,cameraY) {
  
  push()
    if (touches.length === 1) {
    let x = touches[0].x;
    let y = touches[0].y;
    if(cameraX==null&&cameraY==null){
      cameraX=0
      cameraY=0}
    if (!gamepadPosition) {
      gamepadPosition = createVector(x, y);
    }
    touchPosition = createVector(x, y);
    let adjustedTouchPosition = createVector(touchPosition.x - cameraX, touchPosition.y - cameraY);
    let joystickDirection = p5.Vector.sub(adjustedTouchPosition, gamepadPosition);

    
    if (joystickDirection.mag() > joystickRadius) {
      joystickDirection.normalize();
      joystickDirection.mult(joystickRadius);
    }
    //.mag() é de magnitude, usado para verificar o comprimento do vetor que representa a direção do joystick.
    //.normalize() é utilizada para garantir que o vetor joystickDirection tenha comprimento 1 após ser limitado pelo raio do joystick.
    //.mult() é utilizada para redimensionar o vetor joystickDirection para que tenha o comprimento desejado, limitado pelo raio do joystick.

      
    let deadZonePosition = p5.Vector.add(gamepadPosition, joystickDirection);
    
    noFill();
    stroke("#33333396");
    strokeWeight(4);
    ellipse(gamepadPosition.x, gamepadPosition.y, joystickRadius * 2);
    fill("#33333396");
    ellipse(deadZonePosition.x, deadZonePosition.y, joystickDeadZone * 2);
   
    obj.position.add(p5.Vector.mult(joystickDirection, obj.speed));
  } else {
    gamepadPosition = null;
    touchPosition = null;
  }
  pop()
}
