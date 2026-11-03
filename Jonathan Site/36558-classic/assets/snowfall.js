(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'snowfall-canvas';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var width, height, flakes;
  var FLAKE_COUNT = 80;

  function makeFlake() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.6 - 0.3,
      drift: Math.random() * Math.PI * 2
    };
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    flakes = [];
    for (var i = 0; i < FLAKE_COUNT; i++) {
      flakes.push(makeFlake());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

    for (var i = 0; i < flakes.length; i++) {
      var flake = flakes[i];
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function update() {
    for (var i = 0; i < flakes.length; i++) {
      var flake = flakes[i];
      flake.y += flake.speedY;
      flake.drift += 0.01;
      flake.x += flake.speedX + Math.sin(flake.drift) * 0.3;

      if (flake.y > height) {
        flake.y = -flake.radius;
        flake.x = Math.random() * width;
      }
      if (flake.x > width) {
        flake.x = 0;
      } else if (flake.x < 0) {
        flake.x = width;
      }
    }
  }

  function tick() {
    update();
    draw();
    window.requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  init();
  window.requestAnimationFrame(tick);
})();
