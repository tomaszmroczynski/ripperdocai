/* @ds-bundle: {"format":3,"namespace":"RipperdocDesignSystem_cbf3c1","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"CapabilityMeter","sourcePath":"components/data/CapabilityMeter.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"assets/js/neural-field.js":"b9ee82a073da","assets/js/service-anim.js":"aed65ebfbe5b","components/core/Avatar.jsx":"819ea88bccee","components/core/Badge.jsx":"886ac7974020","components/core/Button.jsx":"c3fa3cb5beb7","components/core/IconButton.jsx":"16033fbaf452","components/data/CapabilityMeter.jsx":"1640aeffd1bf","components/data/StatCard.jsx":"0898a34739eb","components/forms/Input.jsx":"abdaae81a4ec","components/forms/Switch.jsx":"36bec409d71c","components/navigation/Tabs.jsx":"9017b92aa9c9","components/surfaces/Card.jsx":"4b50d52990fc","ui_kits/atlas/Sidebar.jsx":"ad1bef50bdaf","ui_kits/atlas/Topbar.jsx":"8918f743741a","ui_kits/atlas/screens.jsx":"2c9fd2b6c67f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RipperdocDesignSystem_cbf3c1 = window.RipperdocDesignSystem_cbf3c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/js/neural-field.js
try { (() => {
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
  function hex(a) {
    return `rgba(234,154,62,${a})`;
  }
  function sparkCol(a) {
    return `rgba(255,217,160,${a})`;
  }
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
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }
    function seed() {
      const count = Math.max(14, Math.round(w * h * density));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 1.3 + 0.7,
          spark: i < sparkCount,
          phase: Math.random() * Math.PI * 2
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
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const o = (1 - d / linkDist) * 0.34;
            ctx.strokeStyle = a.spark || b.spark ? hex(o * 1.5) : `rgba(170,180,192,${o * 0.5})`;
            ctx.lineWidth = a.spark || b.spark ? 0.9 : 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        if (n.spark) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.001 + n.phase);
          const rad = 14 + pulse * 10;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad);
          g.addColorStop(0, sparkCol(0.55));
          g.addColorStop(0.4, hex(0.28));
          g.addColorStop(1, hex(0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = sparkCol(0.95);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = hex(0.5);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);else boot();
  window.RipperdocNeuralField = initField;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/js/neural-field.js", error: String((e && e.message) || e) }); }

// assets/js/service-anim.js
try { (() => {
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
  function ctxOf(c) {
    return c.getContext('2d');
  }
  function setup(canvas) {
    const ctx = ctxOf(canvas);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w,
      h,
      dpr,
      t0 = performance.now();
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height || 200;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const kind = canvas.dataset.service || 'research';
    const state = makeState(kind);
    function active() {
      return canvas.dataset.active === '1';
    }
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
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, 7);
    ctx.fill();
    ctx.fillStyle = `rgba(${col},${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
  function line(ctx, x1, y1, x2, y2, a, wdt) {
    ctx.strokeStyle = `rgba(${EMBER},${a})`;
    ctx.lineWidth = wdt || 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  function node(ctx, x, y, r, a, col) {
    ctx.fillStyle = `rgba(${col || EMBER},${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
  const ease = p => p < 0 ? 0 : p > 1 ? 1 : p * p * (3 - 2 * p);
  function makeState(kind) {
    if (kind === 'research') {
      const pts = [];
      const cols = 5,
        rows = 3;
      for (let i = 0; i < 14; i++) pts.push({
        bx: Math.random(),
        by: Math.random(),
        ph: Math.random() * 6
      });
      return {
        pts
      };
    }
    if (kind === 'social') {
      return {
        ch: [-0.32, -0.1, 0.12, 0.34]
      };
    }
    return {};
  }

  // ---- per-service renderers ----
  const DRAW = {
    // 1) Customer service: central hub receives queries, answers back
    customer(ctx, w, h, t, on, s) {
      const cx = w * 0.5,
        cy = h * 0.5;
      const speed = on ? 1.5 : 1;
      // user satellites
      const sats = 5;
      for (let i = 0; i < sats; i++) {
        const ang = i / sats * Math.PI * 2 + t * 0.18 * speed;
        const R = Math.min(w, h) * 0.34;
        const x = cx + Math.cos(ang) * R,
          y = cy + Math.sin(ang) * R * 0.78;
        line(ctx, cx, cy, x, y, 0.12, 1);
        node(ctx, x, y, 3, 0.6, MIST);
        // query travelling in, answer travelling out
        const phase = (t * 0.5 * speed + i / sats) % 1;
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
      ctx.beginPath();
      ctx.arc(cx, cy, 14 + pulse * 6, 0, 7);
      ctx.stroke();
    },
    // 2) Documents: pages stream through an extraction beam
    documents(ctx, w, h, t, on, s) {
      const speed = on ? 1.6 : 1;
      const beamX = w * 0.5;
      // beam
      const g = ctx.createLinearGradient(beamX - 14, 0, beamX + 14, 0);
      g.addColorStop(0, `rgba(${EMBER},0)`);
      g.addColorStop(0.5, `rgba(${EMBER},0.18)`);
      g.addColorStop(1, `rgba(${EMBER},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(beamX - 14, 8, 28, h - 16);
      const N = 4;
      for (let i = 0; i < N; i++) {
        const phase = (t * 0.28 * speed + i / N) % 1;
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
        const dw = 22,
          dh = 28;
        roundRect(ctx, x - dw / 2, y - dh / 2, dw, dh, 3);
        ctx.fill();
        ctx.stroke();
        // text lines on doc
        ctx.strokeStyle = processed ? `rgba(${SPARK},0.8)` : `rgba(${MIST},0.4)`;
        ctx.lineWidth = 1;
        for (let l = 0; l < 3; l++) {
          const ly = y - 7 + l * 6;
          line2(ctx, x - 6, ly, x + 6 - (l === 2 ? 4 : 0), ly);
        }
        ctx.restore();
        if (Math.abs(x - beamX) < 16) glowDot(ctx, beamX, y, 2.6, a, SPARK);
      }
    },
    // 3) Offers: blocks assemble into a structured proposal
    offers(ctx, w, h, t, on, s) {
      const speed = on ? 1.5 : 1;
      const cx = w * 0.5,
        top = h * 0.22;
      const rows = [[0], [0, 1], [0, 1, 2]];
      const bw = 30,
        bh = 13,
        gap = 7;
      const cycle = t * 0.4 * speed % 1;
      let idx = 0;
      const total = 6;
      rows.forEach((row, r) => {
        const rowW = row.length * bw + (row.length - 1) * gap;
        row.forEach((c, ci) => {
          const appear = ease(cycle * total - idx);
          const x = cx - rowW / 2 + ci * (bw + gap);
          const y = top + r * (bh + gap);
          ctx.save();
          ctx.globalAlpha = 0.25 + appear * 0.75;
          const lit = appear > 0.5;
          ctx.fillStyle = lit ? `rgba(${EMBER},0.18)` : `rgba(${MIST},0.06)`;
          ctx.strokeStyle = lit ? `rgba(${EMBER},0.85)` : `rgba(${MIST},0.3)`;
          ctx.lineWidth = 1.2;
          roundRect(ctx, x, y + (1 - appear) * 8, bw, bh, 3);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
          idx++;
        });
      });
      // assembling signal line down the side
      const sx = cx + 70;
      line(ctx, sx, top, sx, top + 3 * (bh + gap) - gap, 0.2, 1);
      const sp = t * 0.6 * speed % 1;
      glowDot(ctx, sx, top + sp * (3 * (bh + gap) - gap), 2.4, 0.9, SPARK);
    },
    // 4) Research: a neural lattice lights up as it "learns"
    research(ctx, w, h, t, on, s) {
      const speed = on ? 1.5 : 1;
      const pts = s.pts.map(p => ({
        x: 14 + p.bx * (w - 28),
        y: 14 + p.by * (h - 28),
        ph: p.ph
      }));
      // links by proximity
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x,
          dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < w * 0.28) {
          const flow = 0.5 + 0.5 * Math.sin(t * 1.4 * speed - d * 0.03);
          line(ctx, pts[i].x, pts[i].y, pts[j].x, pts[j].y, 0.05 + flow * 0.16, 0.8);
        }
      }
      pts.forEach((p, i) => {
        const lit = 0.5 + 0.5 * Math.sin(t * 1.6 * speed + p.ph);
        if (i % 4 === 0) glowDot(ctx, p.x, p.y, 2.2 + lit * 1.4, 0.5 + lit * 0.5, SPARK);else node(ctx, p.x, p.y, 1.8, 0.3 + lit * 0.5, EMBER);
      });
    },
    // 5) Social: content streams out to channel nodes
    social(ctx, w, h, t, on, s) {
      const speed = on ? 1.6 : 1;
      const sx = w * 0.18,
        sy = h * 0.5;
      glowDot(ctx, sx, sy, 5, 1, SPARK);
      s.ch.forEach((off, i) => {
        const tx = w * 0.86,
          ty = h * (0.5 + off);
        line(ctx, sx, sy, tx, ty, 0.12, 1);
        node(ctx, tx, ty, 4, 0.7, EMBER);
        ctx.strokeStyle = `rgba(${EMBER},0.4)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(tx, ty, 7, 0, 7);
        ctx.stroke();
        // packets
        for (let k = 0; k < 2; k++) {
          const phase = (t * 0.5 * speed + i * 0.2 + k * 0.5) % 1;
          const e = phase;
          const x = sx + (tx - sx) * e,
            y = sy + (ty - sy) * e;
          glowDot(ctx, x, y, 2, Math.sin(phase * Math.PI), SPARK);
        }
      });
    }
  };
  function line2(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function boot() {
    document.querySelectorAll('canvas[data-service]').forEach(setup);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);else boot();
  window.RipperdocServiceAnim = setup;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/js/service-anim.js", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — a human presence. The brand puts the person first, so the
 * avatar is ringed like the logomark; optional "active" ember halo.
 */
function Avatar({
  src = null,
  name = '',
  size = 40,
  active = false,
  ring = true,
  style = {},
  ...rest
}) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '50%',
      background: src ? 'transparent' : 'var(--ink-700)',
      color: 'var(--ember-200)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: size * 0.38,
      letterSpacing: '0.02em',
      border: ring ? '1px solid var(--border-ember)' : '1px solid var(--border-subtle)',
      boxShadow: active ? 'var(--glow-sm)' : 'var(--edge-top)',
      overflow: 'hidden',
      flex: 'none',
      position: 'relative',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '·', active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: size * 0.26,
      height: size * 0.26,
      borderRadius: '50%',
      background: 'var(--ember-400)',
      border: '2px solid var(--bg-base)',
      boxShadow: 'var(--glow-sm)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status / category marker.
 * tone: neutral | ember | up | warn | down | info
 * variant: soft (tinted fill) | outline | solid
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      c: 'var(--mist-200)',
      bg: 'rgba(170,180,192,0.10)',
      bd: 'var(--border-subtle)',
      solid: 'var(--graphite-400)'
    },
    ember: {
      c: 'var(--ember-300)',
      bg: 'rgba(234,154,62,0.12)',
      bd: 'var(--border-ember)',
      solid: 'var(--ember-500)'
    },
    up: {
      c: 'var(--signal-up)',
      bg: 'var(--signal-up-bg)',
      bd: 'rgba(95,169,140,0.4)',
      solid: 'var(--signal-up)'
    },
    warn: {
      c: 'var(--ember-300)',
      bg: 'var(--signal-warn-bg)',
      bd: 'rgba(234,154,62,0.4)',
      solid: 'var(--signal-warn)'
    },
    down: {
      c: 'var(--signal-down)',
      bg: 'var(--signal-down-bg)',
      bd: 'rgba(200,85,61,0.4)',
      solid: 'var(--signal-down)'
    },
    info: {
      c: 'var(--signal-info)',
      bg: 'var(--signal-info-bg)',
      bd: 'rgba(110,143,184,0.4)',
      solid: 'var(--signal-info)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const variants = {
    soft: {
      background: t.bg,
      color: t.c,
      border: `1px solid ${t.bd}`
    },
    outline: {
      background: 'transparent',
      color: t.c,
      border: `1px solid ${t.bd}`
    },
    solid: {
      background: t.solid,
      color: 'var(--ink-1000)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.soft;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 10px',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      letterSpacing: '0.04em',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: variant === 'solid' ? 'var(--ink-1000)' : t.solid,
      boxShadow: tone === 'ember' && variant !== 'solid' ? 'var(--glow-sm)' : 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ripperdoc Button — the primary action surface.
 * Variants: primary (ember), secondary (graphite), ghost, outline.
 * Sizes: sm, md, lg. Optional leading/trailing icon nodes.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  full = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      fontSize: 13,
      padding: '0 14px',
      height: 34,
      gap: 7,
      radius: 'var(--radius-sm)'
    },
    md: {
      fontSize: 14,
      padding: '0 20px',
      height: 42,
      gap: 8,
      radius: 'var(--radius-md)'
    },
    lg: {
      fontSize: 16,
      padding: '0 28px',
      height: 52,
      gap: 10,
      radius: 'var(--radius-md)'
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent',
      boxShadow: hover ? 'var(--glow-md)' : 'var(--glow-sm)',
      fontWeight: 600
    },
    secondary: {
      background: hover ? 'var(--surface-hover)' : 'var(--surface-input)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--edge-top)',
      fontWeight: 500
    },
    outline: {
      background: hover ? 'rgba(234,154,62,0.08)' : 'transparent',
      color: 'var(--text-accent)',
      border: '1px solid var(--border-ember)',
      boxShadow: 'none',
      fontWeight: 500
    },
    ghost: {
      background: hover ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none',
      fontWeight: 500
    }
  };
  const p = palettes[variant] || palettes.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: full ? 'flex' : 'inline-flex',
      width: full ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-display)',
      fontWeight: p.fontWeight,
      letterSpacing: '-0.005em',
      lineHeight: 1,
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.42 : 1,
      transform: active && !disabled ? 'translateY(1px)' : 'translateY(0)',
      transition: 'background-color var(--dur-fast) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal), transform var(--dur-fast) var(--ease-signal), color var(--dur-fast) var(--ease-signal)',
      background: p.background,
      color: p.color,
      border: p.border,
      boxShadow: p.boxShadow,
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1.05em',
      height: '1.05em'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1.05em',
      height: '1.05em'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square action holding a single icon node.
 * Variants mirror Button: primary, secondary, ghost, outline.
 */
function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const dim = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      background: hover ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent',
      boxShadow: hover ? 'var(--glow-md)' : 'var(--glow-sm)'
    },
    secondary: {
      background: hover ? 'var(--surface-hover)' : 'var(--surface-input)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--edge-top)'
    },
    outline: {
      background: hover ? 'rgba(234,154,62,0.08)' : 'transparent',
      color: 'var(--text-accent)',
      border: '1px solid var(--border-ember)',
      boxShadow: 'none'
    },
    ghost: {
      background: hover ? 'var(--surface-hover)' : 'transparent',
      color: hover ? 'var(--text-strong)' : 'var(--text-muted)',
      border: '1px solid transparent',
      boxShadow: 'none'
    }
  };
  const p = palettes[variant] || palettes.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.42 : 1,
      transition: 'var(--t-color), var(--t-glow)',
      ...p,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: dim * 0.46,
      height: dim * 0.46
    }
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/CapabilityMeter.jsx
try { (() => {
/**
 * CapabilityMeter — a branded progress/gauge. Reads as a signal
 * travelling a connection: an ember-filled track with a glowing
 * leading node at the current value.
 */
function CapabilityMeter({
  value = 0,
  max = 100,
  label,
  showValue = true,
  height = 8,
  tone = 'ember',
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const tones = {
    ember: {
      fill: 'linear-gradient(90deg, var(--ember-600), var(--ember-400))',
      node: 'var(--spark)',
      glow: 'var(--glow-sm)'
    },
    up: {
      fill: 'linear-gradient(90deg, #2f5c4a, var(--signal-up))',
      node: 'var(--signal-up)',
      glow: '0 0 10px rgba(95,169,140,0.5)'
    },
    info: {
      fill: 'linear-gradient(90deg, #2c4258, var(--signal-info))',
      node: 'var(--signal-info)',
      glow: '0 0 10px rgba(110,143,184,0.5)'
    }
  };
  const t = tones[tone] || tones.ember;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 9
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-accent)'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      background: 'var(--ink-700)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--edge-ring)',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${pct}%`,
      background: t.fill,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }), pct > 1 && pct < 100 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: `${pct}%`,
      width: height + 4,
      height: height + 4,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background: t.node,
      boxShadow: t.glow,
      transition: 'left var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { CapabilityMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CapabilityMeter.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field on a sunken ink well. Ember focus ring/glow.
 * Optional leading icon and label/hint.
 */
function Input({
  label,
  hint,
  iconLeft = null,
  invalid = false,
  size = 'md',
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const heights = {
    sm: 36,
    md: 44,
    lg: 52
  };
  const h = heights[size] || heights.md;
  const borderColor = invalid ? 'var(--signal-down)' : focus ? 'var(--border-ember)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: '0 14px',
      background: 'var(--surface-input)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--glow-sm), var(--edge-ring)' : 'var(--edge-ring)',
      transition: 'border-color var(--dur-fast) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 17,
      height: 17,
      color: focus ? 'var(--ember-300)' : 'var(--text-faint)',
      flex: 'none'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-body)',
      fontSize: size === 'sm' ? 13 : 15
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: invalid ? 'var(--signal-down)' : 'var(--text-faint)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — toggle styled as an activating connection. When on, the
 * track lights ember and the knob carries a faint spark glow.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  style = {},
  ...rest
}) {
  const dims = {
    sm: {
      w: 36,
      h: 20,
      k: 14
    },
    md: {
      w: 46,
      h: 26,
      k: 19
    }
  };
  const d = dims[size] || dims.md;
  const pad = (d.h - d.k) / 2;
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  const sw = /*#__PURE__*/React.createElement("button", _extends({
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: 'relative',
      width: d.w,
      height: d.h,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid',
      borderColor: checked ? 'var(--border-ember)' : 'var(--border-subtle)',
      background: checked ? 'var(--action-primary)' : 'var(--ink-700)',
      boxShadow: checked ? 'var(--glow-sm)' : 'var(--edge-ring)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.42 : 1,
      padding: 0,
      transition: 'background-color var(--dur-base) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal), border-color var(--dur-base) var(--ease-signal)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: pad,
      left: checked ? d.w - d.k - pad - 1 : pad,
      width: d.k,
      height: d.k,
      borderRadius: '50%',
      background: checked ? 'var(--ink-1000)' : 'var(--mist-200)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
      transition: 'left var(--dur-base) var(--ease-spring), background-color var(--dur-base) var(--ease-signal)'
    }
  }));
  if (!label) return sw;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, sw, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-body)',
      fontFamily: 'var(--font-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Tabs — segmented navigation. The active tab carries an ember
 * underline that reads like an activated connection.
 */
function Tabs({
  items = [],
  value,
  onChange,
  style = {}
}) {
  const active = value ?? (items[0] && items[0].id);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--ink-850)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--edge-ring)',
      ...style
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onChange && onChange(it.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        height: 34,
        padding: '0 16px',
        fontFamily: 'var(--font-display)',
        fontSize: 13.5,
        fontWeight: 500,
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        background: on ? 'var(--surface-input)' : 'transparent',
        border: '1px solid',
        borderColor: on ? 'var(--border-subtle)' : 'transparent',
        borderRadius: 'var(--radius-sm)',
        boxShadow: on ? 'var(--edge-top), inset 0 -2px 0 var(--ember-500)' : 'none',
        cursor: 'pointer',
        transition: 'var(--t-color), box-shadow var(--dur-base) var(--ease-signal)'
      }
    }, it.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 15,
        height: 15,
        color: on ? 'var(--ember-300)' : 'inherit'
      }
    }, it.icon), it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: on ? 'var(--ember-300)' : 'var(--text-faint)'
      }
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface. Lit-from-within ink panel with a hairline
 * edge. Optional ember glow on hover for interactive cards, and an
 * optional top sheen.
 */
function Card({
  children,
  interactive = false,
  glow = false,
  padding = 24,
  sheen = true,
  as: Tag = 'div',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined,
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      backgroundImage: sheen ? 'var(--grad-card)' : 'none',
      border: '1px solid',
      borderColor: hover && interactive ? 'var(--border-ember)' : 'var(--border-hairline)',
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: glow || hover && interactive ? 'var(--edge-top), var(--shadow-md), var(--glow-md)' : 'var(--edge-top), var(--shadow-md)',
      transition: 'border-color var(--dur-base) var(--ease-signal), box-shadow var(--dur-base) var(--ease-signal), transform var(--dur-base) var(--ease-signal)',
      transform: hover && interactive ? 'translateY(-2px)' : 'translateY(0)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
/**
 * StatCard — a single capability metric. Mono value, optional delta
 * badge, optional icon, and an optional sparkline of recent signal.
 */
function StatCard({
  label,
  value,
  unit,
  delta,
  deltaTone = 'up',
  icon = null,
  spark = null,
  style = {}
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    padding: 22,
    style: {
      minWidth: 200,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 18,
      height: 18,
      color: 'var(--ember-300)'
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, unit)), (delta || spark) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14,
      gap: 12
    }
  }, delta && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: deltaTone,
    variant: "soft"
  }, delta), spark && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 28,
      minWidth: 0
    }
  }, spark)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atlas/Sidebar.jsx
try { (() => {
// Atlas — Sidebar. Reads brand components from the DS bundle namespace.
(() => {
  const {
    Avatar
  } = window.RipperdocDesignSystem_cbf3c1;
  function Sidebar({
    active,
    onNav
  }) {
    const Ic = ({
      n
    }) => /*#__PURE__*/React.createElement("i", {
      "data-lucide": n,
      style: {
        width: 18,
        height: 18
      }
    });
    const groups = [{
      title: 'Augment',
      items: [{
        id: 'overview',
        label: 'Overview',
        icon: 'layout-dashboard'
      }, {
        id: 'agents',
        label: 'Agents',
        icon: 'waypoints',
        badge: '6'
      }, {
        id: 'knowledge',
        label: 'Knowledge',
        icon: 'database'
      }, {
        id: 'automations',
        label: 'Automations',
        icon: 'git-branch'
      }]
    }, {
      title: 'Operate',
      items: [{
        id: 'signals',
        label: 'Signals',
        icon: 'activity'
      }, {
        id: 'people',
        label: 'People',
        icon: 'user-round'
      }, {
        id: 'settings',
        label: 'Settings',
        icon: 'settings-2'
      }]
    }];
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 248,
        flex: 'none',
        height: '100%',
        background: 'var(--ink-850)',
        borderRight: '1px solid var(--border-hairline)',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        height: 64,
        padding: '0 20px',
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/ripperdoc-mark.svg",
      alt: "",
      style: {
        width: 26,
        height: 26,
        color: 'var(--mist-100)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--text-strong)',
        letterSpacing: '-0.01em'
      }
    }, "Atlas"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--text-faint)',
        letterSpacing: '0.1em'
      }
    }, "v2.4")), /*#__PURE__*/React.createElement("nav", {
      style: {
        flex: 1,
        padding: '18px 12px',
        overflowY: 'auto'
      }
    }, groups.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.title,
      style: {
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
        padding: '0 12px',
        marginBottom: 8
      }
    }, g.title), g.items.map(it => {
      const on = it.id === active;
      return /*#__PURE__*/React.createElement("button", {
        key: it.id,
        onClick: () => onNav(it.id),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          width: '100%',
          height: 38,
          padding: '0 12px',
          marginBottom: 2,
          background: on ? 'var(--surface-input)' : 'transparent',
          border: '1px solid',
          borderColor: on ? 'var(--border-subtle)' : 'transparent',
          borderRadius: 'var(--radius-sm)',
          color: on ? 'var(--text-strong)' : 'var(--text-muted)',
          boxShadow: on ? 'inset 2px 0 0 var(--ember-500)' : 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: on ? 500 : 400,
          cursor: 'pointer',
          transition: 'var(--t-color)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: on ? 'var(--ember-300)' : 'var(--text-faint)',
          display: 'inline-flex'
        }
      }, /*#__PURE__*/React.createElement(Ic, {
        n: it.icon
      })), it.label, it.badge && /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--ember-300)',
          background: 'rgba(234,154,62,0.12)',
          borderRadius: 'var(--radius-pill)',
          padding: '1px 8px'
        }
      }, it.badge));
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 14,
        borderTop: '1px solid var(--border-hairline)',
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Marcus Chen",
      active: true,
      size: 36
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.3,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: 'var(--text-strong)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, "Marcus Chen"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-mono)'
      }
    }, "Lead operator"))));
  }
  window.Sidebar = Sidebar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atlas/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atlas/Topbar.jsx
try { (() => {
// Atlas — Topbar with search + actions.
(() => {
  const {
    Button,
    IconButton,
    Badge
  } = window.RipperdocDesignSystem_cbf3c1;
  function Topbar({
    title,
    subtitle
  }) {
    const Ic = ({
      n,
      s = 16
    }) => /*#__PURE__*/React.createElement("i", {
      "data-lucide": n,
      style: {
        width: s,
        height: s
      }
    });
    return /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        height: 64,
        padding: '0 26px',
        flex: 'none',
        borderBottom: '1px solid var(--border-hairline)',
        background: 'rgba(7,9,12,0.6)',
        backdropFilter: 'var(--glass)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        fontWeight: 600,
        color: 'var(--text-strong)',
        letterSpacing: '-0.01em'
      }
    }, title), subtitle && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-mono)'
      }
    }, subtitle)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        height: 38,
        padding: '0 14px',
        width: 240,
        background: 'var(--surface-input)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--edge-ring)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Ic, {
      n: "search"
    })), /*#__PURE__*/React.createElement("input", {
      placeholder: "Search signals, agents\u2026",
      style: {
        flex: 1,
        minWidth: 0,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'var(--text-body)',
        fontFamily: 'var(--font-body)',
        fontSize: 13.5
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-faint)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 4,
        padding: '1px 5px'
      }
    }, "\u2318K")), /*#__PURE__*/React.createElement(Badge, {
      tone: "up",
      dot: true
    }, "All systems live"), /*#__PURE__*/React.createElement(IconButton, {
      label: "Notifications",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(Ic, {
      n: "bell"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Ic, {
        n: "zap"
      })
    }, "New augmentation")));
  }
  window.Topbar = Topbar;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atlas/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/atlas/screens.jsx
try { (() => {
// Atlas — screens. Composes DS components into product views.
(() => {
  const {
    Card,
    StatCard,
    CapabilityMeter,
    Badge,
    Button,
    Avatar,
    Tabs,
    Switch
  } = window.RipperdocDesignSystem_cbf3c1;
  const Ico = ({
    n,
    s = 18,
    c
  }) => /*#__PURE__*/React.createElement("i", {
    "data-lucide": n,
    style: {
      width: s,
      height: s,
      color: c
    }
  });

  // A live neural-activity panel built on the brand motif.
  function NeuralPanel({
    height = 220
  }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (ref.current && window.RipperdocNeuralField) window.RipperdocNeuralField(ref.current);
    }, []);
    return /*#__PURE__*/React.createElement(Card, {
      padding: 0,
      style: {
        overflow: 'hidden',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        zIndex: 2,
        top: 18,
        left: 20,
        right: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--ember-300)'
      }
    }, "Live signal field"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 600,
        color: 'var(--text-strong)',
        marginTop: 4
      }
    }, "Intelligence in motion")), /*#__PURE__*/React.createElement(Badge, {
      tone: "ember",
      dot: true
    }, "streaming")), /*#__PURE__*/React.createElement("canvas", {
      ref: ref,
      "data-neural-field": true,
      "data-sparks": "4",
      "data-density": "0.00016",
      style: {
        width: '100%',
        height,
        display: 'block'
      }
    }));
  }
  function OverviewScreen() {
    const Spark = ({
      up = true
    }) => /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 120 28",
      preserveAspectRatio: "none",
      style: {
        width: '100%',
        height: 28
      }
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "0,22 18,18 34,20 52,12 70,15 88,7 106,10 120,4",
      fill: "none",
      stroke: up ? 'var(--ember-400)' : 'var(--signal-down)',
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "Throughput",
      value: "3,480",
      unit: "tok/s",
      delta: "+312%",
      deltaTone: "up",
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "activity",
        s: 17,
        c: "var(--ember-300)"
      }),
      spark: /*#__PURE__*/React.createElement(Spark, null)
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Hours returned",
      value: "1,240",
      unit: "/wk",
      delta: "+18%",
      deltaTone: "up",
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "clock",
        s: 17,
        c: "var(--ember-300)"
      }),
      spark: /*#__PURE__*/React.createElement(Spark, null)
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Active agents",
      value: "6",
      delta: "2 new",
      deltaTone: "ember",
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "waypoints",
        s: 17,
        c: "var(--ember-300)"
      })
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Confidence",
      value: "91",
      unit: "%",
      delta: "stable",
      deltaTone: "neutral",
      icon: /*#__PURE__*/React.createElement(Ico, {
        n: "scan-eye",
        s: 17,
        c: "var(--ember-300)"
      }),
      spark: /*#__PURE__*/React.createElement(Spark, null)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(NeuralPanel, {
      height: 236
    }), /*#__PURE__*/React.createElement(Card, {
      padding: 24
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)',
        marginBottom: 4
      }
    }, "Capability coverage"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        marginBottom: 22
      }
    }, "How much of the workflow is augmented."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(CapabilityMeter, {
      label: "Knowledge recall",
      value: 72
    }), /*#__PURE__*/React.createElement(CapabilityMeter, {
      label: "Decision support",
      value: 58,
      tone: "info"
    }), /*#__PURE__*/React.createElement(CapabilityMeter, {
      label: "Automation depth",
      value: 44,
      tone: "info"
    }), /*#__PURE__*/React.createElement(CapabilityMeter, {
      label: "Signal confidence",
      value: 91,
      tone: "up"
    })))), /*#__PURE__*/React.createElement(Card, {
      padding: 0
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, "Recent augmentations"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Ico, {
        n: "arrow-right",
        s: 14
      })
    }, "View all")), [{
      who: 'Ada Lovelace',
      act: 'deployed',
      what: 'Research synthesis agent',
      when: '2m ago',
      tone: 'up',
      icon: 'brain'
    }, {
      who: 'Knowledge base',
      act: 'indexed',
      what: '4,210 documents',
      when: '14m ago',
      tone: 'ember',
      icon: 'database'
    }, {
      who: 'Flow engine',
      act: 'automated',
      what: 'Invoice triage → ledger',
      when: '1h ago',
      tone: 'info',
      icon: 'git-branch'
    }, {
      who: 'Marcus Chen',
      act: 'reviewed',
      what: 'Contract risk signals',
      when: '3h ago',
      tone: 'neutral',
      icon: 'scan-eye'
    }].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '15px 24px',
        borderBottom: i < 3 ? '1px solid var(--border-hairline)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        flex: 'none',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--ink-700)',
        border: '1px solid var(--border-hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ember-300)'
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      n: r.icon,
      s: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-strong)',
        fontWeight: 500
      }
    }, r.who), " ", r.act, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-strong)'
      }
    }, r.what))), /*#__PURE__*/React.createElement(Badge, {
      tone: r.tone,
      variant: "soft"
    }, r.act), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-faint)',
        width: 64,
        textAlign: 'right'
      }
    }, r.when)))));
  }
  function AgentsScreen() {
    const agents = [{
      name: 'Synthesis',
      role: 'Research & summarisation',
      status: 'active',
      load: 78,
      runs: '1.2k',
      icon: 'brain'
    }, {
      name: 'Ledger',
      role: 'Finance automation',
      status: 'active',
      load: 54,
      runs: '880',
      icon: 'git-branch'
    }, {
      name: 'Sentinel',
      role: 'Risk & compliance',
      status: 'active',
      load: 33,
      runs: '420',
      icon: 'scan-eye'
    }, {
      name: 'Archivist',
      role: 'Knowledge indexing',
      status: 'idle',
      load: 12,
      runs: '6.4k',
      icon: 'database'
    }, {
      name: 'Composer',
      role: 'Content generation',
      status: 'active',
      load: 66,
      runs: '2.1k',
      icon: 'code-xml'
    }, {
      name: 'Router',
      role: 'Task orchestration',
      status: 'paused',
      load: 0,
      runs: '340',
      icon: 'waypoints'
    }];
    const toneFor = s => s === 'active' ? 'up' : s === 'idle' ? 'neutral' : 'warn';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16
      }
    }, agents.map(a => /*#__PURE__*/React.createElement(Card, {
      key: a.name,
      interactive: true,
      padding: 22
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-md)',
        background: 'var(--ink-700)',
        border: '1px solid var(--border-hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ember-300)',
        boxShadow: 'var(--edge-top)'
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      n: a.icon,
      s: 20
    })), /*#__PURE__*/React.createElement(Badge, {
      tone: toneFor(a.status),
      dot: true
    }, a.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, a.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        marginBottom: 18
      }
    }, a.role), /*#__PURE__*/React.createElement(CapabilityMeter, {
      label: "Load",
      value: a.load,
      height: 6
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 14,
        borderTop: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-faint)'
      }
    }, a.runs, " runs"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Ico, {
        n: "settings-2",
        s: 13
      })
    }, "Tune")))));
  }
  window.OverviewScreen = OverviewScreen;
  window.AgentsScreen = AgentsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/atlas/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.CapabilityMeter = __ds_scope.CapabilityMeter;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

})();
