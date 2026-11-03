// Sitewide Halloween effect. Pumpkins, bats, ghosts and leaves drift down a fixed,
// click-through canvas above the page.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ICONS = ['🎃', '🦇', '👻', '🍂', '🍁']; // 🎃 🦇 👻 🍂 🍁

  var canvas = document.createElement('canvas');
  canvas.id = 'halloween-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var pieces = [];
  var width, height, frame;

  function resize() {
    var ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Fewer pieces on small screens
    var count = Math.round(Math.min(35, width / 40));
    while (pieces.length < count) pieces.push(makePiece(true));
    pieces.length = count;
  }

  function makePiece(anywhere) {
    var icon = ICONS[Math.floor(Math.random() * ICONS.length)];
    var isBat = icon === ICONS[1];
    return {
      icon: icon,
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -30,
      size: Math.random() * 14 + 16,
      speed: Math.random() * 0.7 + 0.5,
      drift: Math.random() * 0.6 - 0.3,
      sway: Math.random() * Math.PI * 2,
      // Bats flap side to side, the rest tumble
      swayAmount: isBat ? 1.6 : 0.5,
      spin: isBat ? 0 : Math.random() * 0.02 - 0.01,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.3 + 0.7
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var i = 0; i < pieces.length; i++) {
      var p = pieces[i];
      p.sway += 0.02;
      p.y += p.speed;
      p.x += p.drift + Math.sin(p.sway) * p.swayAmount;
      p.angle += p.spin;

      if (p.y > height + 30) pieces[i] = p = makePiece(false);
      if (p.x > width + 30) p.x = -30;
      if (p.x < -30) p.x = width + 30;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin ? p.angle : Math.sin(p.sway) * 0.2);
      ctx.font = p.size + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
      ctx.fillText(p.icon, 0, 0);
      ctx.restore();
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
