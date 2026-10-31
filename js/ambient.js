/* Mirrorwalker — ambient background: slow-drifting mirror shards */

(function () {
  const canvas = document.getElementById("mirror-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, shards;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeShards() {
    const n = Math.min(60, Math.floor((w * h) / 26000));
    shards = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: 1 + Math.random() * 3.2,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.1,
      a: 0.04 + Math.random() * 0.16,
      hue: Math.random() < 0.6 ? "139,123,255" : "79,216,232",
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.002,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of shards) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = "rgba(" + p.hue + "," + p.a + ")";
      // thin reflective shard: elongated diamond
      ctx.beginPath();
      ctx.moveTo(0, -p.s * 2.4);
      ctx.lineTo(p.s * 0.5, 0);
      ctx.lineTo(0, p.s * 2.4);
      ctx.lineTo(-p.s * 0.5, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    resize();
    makeShards();
  });
  resize();
  makeShards();
  tick();
})();
