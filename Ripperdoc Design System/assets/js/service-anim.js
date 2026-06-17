/* ============================================================
   RIPPERDOC — Service Animations
   Lightweight canvas micro-animations, one per AI service.
   Each visualises "a signal travelling through a system" in the
   brand's ember palette. Draws one static frame immediately so it
   survives capture / reduced-motion, then animates where allowed.

   Usage:
     <canvas data-service="customer" data-active="0"></canvas>
   data-service: customer | documents | offers | research | social
   Auto-inits all [data-service]. Hovering the card sets data-active
   to "1" (handled by the page) which intensifies the animation.
   ============================================================ */
(function () {
  const EMBER = '234,154,62';
  const SPARK = '255,217,160';
  const MIST = '170,180,192';

  function ctxOf(c) { return c.getContext('2d'); }

  function setup(canvas) {
    const ctx = ctxOf(canvas);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, dpr, t0 = performance.now();

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height || 200;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const kind = canvas.dataset.service || 'research';
    const state = makeState(kind);

    function active() { return canvas.dataset.active === '1'; }

    function loop(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      DRAW[kind](ctx, w, h, t, active(), state);
      if (!reduce) requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    // one synchronous frame for capture / reduced-motion
    DRAW[kind](ctx, w, h, 0.4, false, state);
    if (!reduce) requestAnimationFrame(loop);
  }

  // ---- shared helpers ----
  function glowDot(ctx, x, y, r, a, col) {
    col = col || SPARK;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    g.addColorStop(0, `rgba(${col},${0.5 * a})`);
    g.addColorStop(1, `rgba(${EMBER},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 4, 0, 7); ctx.fill();
    ctx.fillStyle = `rgba(${col},${a})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
  function line(ctx, x1, y1, x2, y2, a, wdt) {
    ctx.strokeStyle = `rgba(${EMBER},${a})`;
    ctx.lineWidth = wdt || 1;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }
  function node(ctx, x, y, r, a, col) {
    ctx.fillStyle = `rgba(${col || EMBER},${a})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
  const ease = (p) => p < 0 ? 0 : p > 1 ? 1 : p * p * (3 - 2 * p);

  function makeState(kind) {
    if (kind === 'research') {
      const pts = [];
      const cols = 5, rows = 3;
      for (let i = 0; i < 14; i++) pts.push({ bx: Math.random(), by: Math.random(), ph: Math.random() * 6 });
      return { pts };
    }
    if (kind === 'social') {
      return { ch: [-0.32, -0.1, 0.12, 0.34] };
    }
    return {};
  }

  // ---- per-service renderers ----
  const DRAW = {
    // 1) Customer service: central hub receives queries, answers back
    customer(ctx, w, h, t, on, s) {
      const cx = w * 0.5, cy = h * 0.5;
      const speed = on ? 1.5 : 1;
      // user satellites
      const sats = 5;
      for (let i = 0; i < sats; i++) {
        const ang = (i / sats) * Math.PI * 2 + t * 0.18 * speed;
        const R = Math.min(w, h) * 0.34;
        const x = cx + Math.cos(ang) * R, y = cy + Math.sin(ang) * R * 0.78;
        line(ctx, cx, cy, x, y, 0.12, 1);
        node(ctx, x, y, 3, 0.6, MIST);
        // query travelling in, answer travelling out
        const phase = ((t * 0.5 * speed) + i / sats) % 1;
        const inbound = phase < 0.5;
        const p = inbound ? phase * 2 : (phase - 0.5) * 2;
        const e = ease(p);
        const fx = inbound ? x + (cx - x) * e : cx + (x - cx) * e;
        const fy = inbound ? y + (cy - y) * e : cy + (y - cy) * e;
        glowDot(ctx, fx, fy, 2.4, 0.9, inbound ? MIST : SPARK);
      }
      // hub
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 * speed);
      glowDot(ctx, cx, cy, 6 + pulse * 1.5, 1, SPARK);
      ctx.strokeStyle = `rgba(${EMBER},${0.3 + pulse * 0.3})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(cx, cy, 14 + pulse * 6, 0, 7); ctx.stroke();
    },

    // 2) Documents: pages stream through an extraction beam
    documents(ctx, w, h, t, on, s) {
      const speed = on ? 1.6 : 1;
      const beamX = w * 0.5;
      // beam
      const g = ctx.createLinearGradient(beamX - 14, 0, beamX + 14, 0);
      g.addColorStop(0, `rgba(${EMBER},0)`); g.addColorStop(0.5, `rgba(${EMBER},0.18)`); g.addColorStop(1, `rgba(${EMBER},0)`);
      ctx.fillStyle = g; ctx.fillRect(beamX - 14, 8, 28, h - 16);
      const N = 4;
      for (let i = 0; i < N; i++) {
        const phase = ((t * 0.28 * speed) + i / N) % 1;
        const x = phase * w;
        const y = h * 0.5 + Math.sin(i * 1.7) * h * 0.14;
        const processed = x > beamX;
        const a = Math.sin(phase * Math.PI); // fade in/out at edges
        ctx.save();
        ctx.globalAlpha = a;
        // doc rect
        ctx.fillStyle = processed ? `rgba(${EMBER},0.16)` : `rgba(${MIST},0.10)`;
        ctx.strokeStyle = processed ? `rgba(${EMBER},0.8)` : `rgba(${MIST},0.5)`;
        ctx.lineWidth = 1.2;
        const dw = 22, dh = 28;
        roundRect(ctx, x - dw / 2, y - dh / 2, dw, dh, 3); ctx.fill(); ctx.stroke();
        // text lines on doc
        ctx.strokeStyle = processed ? `rgba(${SPARK},0.8)` : `rgba(${MIST},0.4)`;
        ctx.lineWidth = 1;
        for (let l = 0; l < 3; l++) { const ly = y - 7 + l * 6; line2(ctx, x - 6, ly, x + 6 - (l === 2 ? 4 : 0), ly); }
        ctx.restore();
        if (Math.abs(x - beamX) < 16) glowDot(ctx, beamX, y, 2.6, a, SPARK);
      }
    },

    // 3) Offers: blocks assemble into a structured proposal
    offers(ctx, w, h, t, on, s) {
      const speed = on ? 1.5 : 1;
      const cx = w * 0.5, top = h * 0.22;
      const rows = [[0], [0, 1], [0, 1, 2]];
      const bw = 30, bh = 13, gap = 7;
      const cycle = (t * 0.4 * speed) % 1;
      let idx = 0; const total = 6;
      rows.forEach((row, r) => {
        const rowW = row.length * bw + (row.length - 1) * gap;
        row.forEach((c, ci) => {
          const appear = ease(((cycle * total) - idx) );
          const x = cx - rowW / 2 + ci * (bw + gap);
          const y = top + r * (bh + gap);
          ctx.save();
          ctx.globalAlpha = 0.25 + appear * 0.75;
          const lit = appear > 0.5;
          ctx.fillStyle = lit ? `rgba(${EMBER},0.18)` : `rgba(${MIST},0.06)`;
          ctx.strokeStyle = lit ? `rgba(${EMBER},0.85)` : `rgba(${MIST},0.3)`;
          ctx.lineWidth = 1.2;
          roundRect(ctx, x, y + (1 - appear) * 8, bw, bh, 3); ctx.fill(); ctx.stroke();
          ctx.restore();
          idx++;
        });
      });
      // assembling signal line down the side
      const sx = cx + 70;
      line(ctx, sx, top, sx, top + 3 * (bh + gap) - gap, 0.2, 1);
      const sp = (t * 0.6 * speed) % 1;
      glowDot(ctx, sx, top + sp * (3 * (bh + gap) - gap), 2.4, 0.9, SPARK);
    },

    // 4) Research: a neural lattice lights up as it "learns"
    research(ctx, w, h, t, on, s) {
      const speed = on ? 1.5 : 1;
      const pts = s.pts.map((p) => ({ x: 14 + p.bx * (w - 28), y: 14 + p.by * (h - 28), ph: p.ph }));
      // links by proximity
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < w * 0.28) {
          const flow = 0.5 + 0.5 * Math.sin(t * 1.4 * speed - d * 0.03);
          line(ctx, pts[i].x, pts[i].y, pts[j].x, pts[j].y, 0.05 + flow * 0.16, 0.8);
        }
      }
      pts.forEach((p, i) => {
        const lit = 0.5 + 0.5 * Math.sin(t * 1.6 * speed + p.ph);
        if (i % 4 === 0) glowDot(ctx, p.x, p.y, 2.2 + lit * 1.4, 0.5 + lit * 0.5, SPARK);
        else node(ctx, p.x, p.y, 1.8, 0.3 + lit * 0.5, EMBER);
      });
    },

    // 5) Social: content streams out to channel nodes
    social(ctx, w, h, t, on, s) {
      const speed = on ? 1.6 : 1;
      const sx = w * 0.18, sy = h * 0.5;
      glowDot(ctx, sx, sy, 5, 1, SPARK);
      s.ch.forEach((off, i) => {
        const tx = w * 0.86, ty = h * (0.5 + off);
        line(ctx, sx, sy, tx, ty, 0.12, 1);
        node(ctx, tx, ty, 4, 0.7, EMBER);
        ctx.strokeStyle = `rgba(${EMBER},0.4)`; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(tx, ty, 7, 0, 7); ctx.stroke();
        // packets
        for (let k = 0; k < 2; k++) {
          const phase = ((t * 0.5 * speed) + i * 0.2 + k * 0.5) % 1;
          const e = phase;
          const x = sx + (tx - sx) * e, y = sy + (ty - sy) * e;
          glowDot(ctx, x, y, 2, Math.sin(phase * Math.PI), SPARK);
        }
      });
    },
  };

  function line2(ctx, x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function boot() { document.querySelectorAll('canvas[data-service]').forEach(setup); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.RipperdocServiceAnim = setup;
})();
