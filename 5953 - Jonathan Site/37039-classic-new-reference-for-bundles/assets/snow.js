// Sitewide falling snow. Draws on a fixed, click-through canvas above the page.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'snow-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var flakes = [];
  var width, height, frame;

  function resize() {
    var ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Fewer flakes on small screens
    var count = Math.round(Math.min(120, width / 12));
    while (flakes.length < count) flakes.push(makeFlake(true));
    flakes.length = count;
  }

  function makeFlake(anywhere) {
    return {
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -10,
      r: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.8 + 0.4,
      drift: Math.random() * 0.6 - 0.3,
      sway: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.4
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.sway += 0.01;
      f.y += f.speed;
      f.x += f.drift + Math.sin(f.sway) * 0.3;

      if (f.y > height + 10) flakes[i] = f = makeFlake(false);
      if (f.x > width + 10) f.x = -10;
      if (f.x < -10) f.x = width + 10;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + f.opacity + ')';
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 2;
      ctx.fill();
    }
    frame = window.requestAnimationFrame(draw);
  }

  // Stop animating while the tab is hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      window.cancelAnimationFrame(frame);
    } else {
      frame = window.requestAnimationFrame(draw);
    }
  });

  window.addEventListener('resize', resize);
  resize();
  frame = window.requestAnimationFrame(draw);
})();
