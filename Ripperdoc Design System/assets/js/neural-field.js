/* ============================================================
   RIPPERDOC — Neural Field
   The brand's signature generative motif: drifting nodes,
   connections that activate by proximity, and warm "spark"
   nodes where intelligence concentrates. Geometric, not stock.

   Usage:
     <canvas data-neural-field
             data-density="0.00010"   // nodes per px²
             data-sparks="3"          // glowing focal nodes
             data-speed="0.18"></canvas>
   Auto-inits all [data-neural-field] on DOMContentLoaded.
   Respects prefers-reduced-motion (renders one static frame).
   ============================================================ */
(function () {
  function hex(a) { return `rgba(234,154,62,${a})`; }
  function sparkCol(a) { return `rgba(255,217,160,${a})`; }

  function initField(canvas) {
    const ctx = canvas.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const density = parseFloat(canvas.dataset.density || '0.00011');
    const sparkCount = parseInt(canvas.dataset.sparks || '3', 10);
    const speed = parseFloat(canvas.dataset.speed || '0.18');
    const linkDist = parseFloat(canvas.dataset.link || '132');
    let w, h, dpr, nodes;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = Math.max(14, Math.round(w * h * density));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 1.3 + 0.7,
          spark: i < sparkCount,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      // connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const o = (1 - d / linkDist) * 0.34;
            ctx.strokeStyle = (a.spark || b.spark) ? hex(o * 1.5) : `rgba(170,180,192,${o * 0.5})`;
            ctx.lineWidth = (a.spark || b.spark) ? 0.9 : 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        if (n.spark) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 + n.phase);
          const rad = 14 + pulse * 10;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad);
          g.addColorStop(0, sparkCol(0.55)); g.addColorStop(0.4, hex(0.28)); g.addColorStop(1, hex(0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = sparkCol(0.95);
          ctx.beginPath(); ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = hex(0.5);
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        }
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      if (!reduce) requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    // Always paint one frame synchronously so the motif shows even when
    // requestAnimationFrame is throttled (background tabs, capture, preview).
    frame(performance.now());
    if (!reduce) requestAnimationFrame(frame);
  }

  function boot() {
    document.querySelectorAll('canvas[data-neural-field]').forEach(initField);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.RipperdocNeuralField = initField;
})();
