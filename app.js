const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 2;

let car = {
  x: 50,
  y: canvas.height - 60,
  width: 60,
  height: 30,
  color: "red"
};

let animationId = null;
let hasCollided = false;

function startSimulation() {
  speed = parseFloat(document.getElementById("speedInput").value);
  car.x = 50;
  car.y = canvas.height - 60;
  hasCollided = false;
  cancelAnimationFrame(animationId);
  update();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let nextX = car.x + speed;

  if (!hasCollided && nextX + car.width >= canvas.width) {
    hasCollided = true;
    car.x = canvas.width - car.width;
    console.log("Collision detected: Car hit the wall.");
    drawScene();
    return;
  }

  if (!hasCollided) {
    car.x = nextX;
  }

  drawScene();
  animationId = requestAnimationFrame(update);
}

function drawScene() {
  // Draw road
  ctx.fillStyle = "gray";
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

  // Draw car
  ctx.fillStyle = hasCollided ? "gray" : car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);
}
