(function () {
  var colors = ['#99c0a8', '#e1e8cc', '#dccfba', '#caff38', '#ca9195'];
  var base = '#cacbd0';
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var blobs = colors.map(function (c) {
    return {
      color: c,
      x: rand(0, 100), y: rand(0, 100),       // current position (% of screen)
      tx: rand(-10, 110), ty: rand(-10, 110),  // where it's heading
      speed: rand(0.5, 4),                     // % of the screen per second
      size: rand(45, 80)                       // how far the color spreads
    };
  });

  var last = performance.now();
  function frame(now) {
    var dt = Math.min((now - last) / 1000, 0.1);
    last = now;

    var layers = blobs.map(function (b) {
      var dx = b.tx - b.x, dy = b.ty - b.y, dist = Math.hypot(dx, dy);
      if (dist < 1) {                          // arrived: new target and new speed
        b.tx = rand(-10, 110);
        b.ty = rand(-10, 110);
        b.speed = rand(0.5, 4);
      } else {
        b.x += (dx / dist) * b.speed * dt;
        b.y += (dy / dist) * b.speed * dt;
      }
      return 'radial-gradient(circle at ' + b.x + '% ' + b.y + '%, ' +
             b.color + ' 0%, transparent ' + b.size + '%)';
    });

    document.body.style.background = layers.join(',') + ', ' + base;
    document.body.style.backgroundAttachment = 'fixed';
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();