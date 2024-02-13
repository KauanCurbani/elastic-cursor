const circle = document.getElementById("sandbox");

const mousePosition = { x: 0, y: 0 };
const lastPosition = { x: 0, y: 0 };
const circlePosition = { x: 0, y: 0 };

document.addEventListener("mousemove", (evt) => {
  mousePosition.x = evt.x;
  mousePosition.y = evt.y;
});

const speed = 0.15;

const tick = () => {
  const deltaMouseX = mousePosition.x - lastPosition.x;
  const deltaMouseY = mousePosition.y - lastPosition.y;
  lastPosition.x = mousePosition.x;
  lastPosition.y = mousePosition.y;

  // Calculate mouse movement angle
  const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

  // Calculate mouse movement valocity
  const mouseVelocity = Math.min(
    Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2),
    150
  );

  const transformString = `translate(-50%,-50%) rotate(${angle}deg) scale(${
    1 + (mouseVelocity / 150) * 0.5
  }, ${1 - (mouseVelocity / 150) * 0.5}) `;

  //   smooth circle movement
  circlePosition.y += (mousePosition.y - circlePosition.y) * speed;
  circlePosition.x += (mousePosition.x - circlePosition.x) * speed;

  circle.style.top = `${circlePosition.y}px`;
  circle.style.left = `${circlePosition.x}px`;

  circle.style.transform = transformString;

  window.requestAnimationFrame(tick);
};
tick();
