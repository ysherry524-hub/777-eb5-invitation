/* Champagne-gold confetti + thin ribbons on a 2D canvas. One restrained burst, then it drifts down and fades.
   window.Confetti(canvas).burst(x, y)  — x/y in CSS px (the point the paper rises from). */
window.Confetti = function (canvas) {
  var ctx = canvas.getContext("2d");
  var COLORS = ["#C6A66B", "#D8BF8E", "#E9DCBE", "#F7F3EA", "#B0904F", "#CDB48A", "#9C8150"];
  var bits = [], w = 0, h = 0, dpr = 1, raf = 0, last = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }

  function make(x, y, ribbon) {
    var a = -Math.PI / 2 + (Math.random() - .5) * 2.6; // fan upward
    var v = (ribbon ? 900 : 1100) * (.35 + Math.random() * .75) * Math.min(1, Math.max(.6, w / 1000));
    return {
      x: x + (Math.random() - .5) * Math.min(w * .5, 360), y: y,
      vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      ribbon: ribbon,
      len: ribbon ? 46 + Math.random() * 46 : 0,
      sw: ribbon ? 1.6 + Math.random() * 1.2 : 5 + Math.random() * 5, // width
      sh: 3 + Math.random() * 4,                                       // height (flakes)
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * 9,
      flip: Math.random() * 6.28, vf: 4 + Math.random() * 8,
      wave: Math.random() * 6.28,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0, ttl: 2 + Math.random() * 1.1
    };
  }

  function frame(t) {
    var dt = Math.min(.04, (t - (last || t)) / 1000);
    last = t;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    for (var i = bits.length - 1; i >= 0; i--) {
      var b = bits[i];
      b.life += dt;
      var drag = b.ribbon ? 1.5 : 1.25;
      b.vx -= b.vx * drag * dt;
      b.vy += (b.ribbon ? 240 : 300) * dt - b.vy * drag * dt * .6;
      b.x += b.vx * dt + Math.sin(b.wave + b.life * 3) * (b.ribbon ? 22 : 14) * dt;
      b.y += b.vy * dt;
      b.rot += b.vr * dt; b.flip += b.vf * dt;
      var fade = Math.min(1, (b.ttl - b.life) / .6);
      if (fade <= 0 || b.y > h + 80) { bits.splice(i, 1); continue; }
      ctx.globalAlpha = fade * .95;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      if (b.ribbon) {
        // a thin curling strip: a short sine path, its brightness varying as it twists
        ctx.strokeStyle = b.color;
        ctx.lineWidth = b.sw * (.55 + .45 * Math.abs(Math.cos(b.flip)));
        ctx.lineCap = "round";
        ctx.beginPath();
        for (var k = 0; k <= 10; k++) {
          var s = k / 10, px = s * b.len - b.len / 2, py = Math.sin(s * 5.2 + b.flip) * 6;
          k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
      } else {
        ctx.scale(1, Math.cos(b.flip)); // foil flake tumbling
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.sw / 2, -b.sh / 2, b.sw, b.sh);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (bits.length) raf = requestAnimationFrame(frame);
    else { raf = 0; ctx.clearRect(0, 0, w, h); }
  }

  return {
    burst: function (x, y) {
      resize();
      var n = w < 600 ? 70 : 120;
      for (var i = 0; i < n; i++) bits.push(make(x, y, i % 6 === 0));
      if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
    },
    stop: function () { bits = []; }
  };
};
