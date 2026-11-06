const D = window.PORTFOLIO;
const $ = (s) => document.querySelector(s);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

/* ---------- Tabs (Education + Skills) ---------- */
function makeTabs(container, groups, onPick) {
  let active = 0;
  const buttons = groups.map((g, i) => {
    const b = el('button', 'tab', g.name);
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.addEventListener('click', () => select(i));
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { select((active + 1) % groups.length); buttons[active].focus(); }
      if (e.key === 'ArrowLeft') { select((active - 1 + groups.length) % groups.length); buttons[active].focus(); }
    });
    container.appendChild(b);
    return b;
  });
  function select(i) {
    active = i;
    buttons.forEach((b, j) => {
      b.setAttribute('aria-selected', String(j === i));
      b.tabIndex = j === i ? 0 : -1;
    });
    onPick(groups[i]);
  }
  select(0);
}

makeTabs($('[data-group="edu"]'), D.education, (g) => {
  const n = g.items.length;
  $('#edu-count').textContent = `${n} ${g.unit}${n === 1 ? '' : 's'}`;
  $('#edu-panel').replaceChildren(...g.items.map((it) => {
    const row = el('div', 'spec-row');
    row.append(el('span', 'spec-date', it.meta), el('span', 'spec-title', it.title), el('span', 'spec-sub', it.sub));
    return row;
  }));
});

makeTabs($('[data-group="skills"]'), D.skills, (g) => {
  $('#skill-count').textContent = `${g.items.length} ${g.unit}`;
  $('#skill-grid').replaceChildren(...g.items.map((s) => el('div', 'skill', s)));
});

/* ---------- Experience ---------- */
$('#timeline').replaceChildren(...D.jobs.map((j) => {
  const card = el('div', 'job ivory');
  const dot = el('span', 'dot'); dot.setAttribute('aria-hidden', 'true');
  card.append(dot, el('p', 'caps', j.dates), el('h3', null, j.role), el('span', 'org', j.org), el('p', null, j.line));
  return card;
}));

/* ---------- Projects (swatch cards) ---------- */
const GH_ICON = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22"></path></svg>';
let openIndex = -1;
/* Photo gallery inside the project detail panel */
const CHEVRON_L = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"></path></svg>';
const CHEVRON_R = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"></path></svg>';
const IMG_ICON = '<svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="8.5" cy="9.5" r="1.6"></circle><path d="M21 16l-5-5-8 9"></path></svg>';
function buildGallery(photos) {
  let idx = 0;
  const wrap = el('div', 'gallery');
  const stage = el('div', 'gal-main');
  const media = el('div', 'gal-media');
  const counter = el('span', 'gal-count');
  const caption = el('p', 'gal-caption');
  stage.append(media);
  function show() {
    const ph = photos[idx];
    const holder = el('div', 'gal-ph'); holder.innerHTML = IMG_ICON;
    holder.append(el('span', null, 'Screenshot ' + (idx + 1)));
    const img = document.createElement('img');
    img.alt = ph.caption || 'Screenshot ' + (idx + 1);
    img.addEventListener('error', () => media.replaceChildren(holder));
    img.src = ph.src;
    media.replaceChildren(img);
    counter.textContent = (idx + 1) + ' / ' + photos.length;
    caption.textContent = ph.caption || '';
    caption.hidden = !ph.caption;
  }
  if (photos.length > 1) {
    const mk = (cls, label, icon, step) => {
      const b = el('button', 'gal-btn ' + cls); b.type = 'button'; b.setAttribute('aria-label', label); b.innerHTML = icon;
      b.addEventListener('click', () => { idx = (idx + step + photos.length) % photos.length; show(); });
      return b;
    };
    stage.append(mk('prev', 'Previous photo', CHEVRON_L, -1), mk('next', 'Next photo', CHEVRON_R, 1));
  }
  stage.append(counter);
  wrap.append(stage, caption);
  show();
  return wrap;
}
function renderProjects(scrollIntoView = false) {
  const cards = D.projects.map((p, i) => {
    const b = el('button', 'pcard'); b.type = 'button';
    b.setAttribute('aria-expanded', String(i === openIndex));
    const well = el('img', 'silver'); well.src = 'assets/silver.jpg'; well.alt = '';
    b.append(well, el('span', 'name', p.title), el('span', 'place', p.place), el('span', 'code', p.code));
    b.addEventListener('click', () => {
      const opening = openIndex !== i;
      openIndex = opening ? i : -1;
      renderProjects(opening);
      // The cards are rebuilt on every click, so hand focus back to the new card without scrolling.
      const same = $('#proj-top').children[i] || $('#proj-bottom').children[i - 2];
      if (same) same.focus({ preventScroll: true });
    });
    return b;
  });
  $('#proj-top').replaceChildren(...cards.slice(0, 2));
  $('#proj-bottom').replaceChildren(...cards.slice(2, 5));
  const det = $('#proj-detail');
  if (openIndex < 0) { det.hidden = true; return; }
  const p = D.projects[openIndex];
  const about = el('div', 'about');
  about.append(el('span', 'caps', p.place), el('h3', null, p.title), el('p', null, p.desc));
  const built = el('div', 'built'); const tags = el('div', 'tags');
  p.tech.forEach(t => tags.appendChild(el('span', null, t)));
  const gh = el('a', 'gh'); gh.href = p.github; gh.target = '_blank'; gh.rel = 'noopener'; gh.innerHTML = GH_ICON + 'View on GitHub';
  built.append(el('span', 'caps', 'Built with'), tags, gh);
  const photos = Array.isArray(p.photos) ? p.photos : [];
  if (photos.length) {
    const info = el('div', 'info'); info.append(about, built);
    det.className = 'swatch-detail has-photos';
    det.replaceChildren(buildGallery(photos), info);
  } else {
    det.className = 'swatch-detail';
    det.replaceChildren(about, built);
  }
  det.hidden = false;
  if (scrollIntoView) {
    // Wait one frame so layout is updated, then scroll only if the panel isn't fully visible.
    requestAnimationFrame(() => {
      const NAV = 100, TOP_GAP = 120, BOTTOM_GAP = 40;
      const rect = det.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top >= NAV && rect.bottom <= vh) return;
      let top;
      if (rect.height > vh - TOP_GAP || rect.top < NAV) top = window.scrollY + rect.top - TOP_GAP;
      else top = window.scrollY + rect.bottom - vh + BOTTOM_GAP;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    });
  }
}
renderProjects();

/* ---------- Mouse-reactive ASCII background ---------- */
(function background() {
  const cv = $('#bg');
  const ctx = cv.getContext('2d');
  const chars = ' .·:-=+*#';
  const cell = 16;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0;
  const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => {
    m.tx = e.clientX; m.ty = e.clientY;
    if (m.x < -999) { m.x = m.tx; m.y = m.ty; }
    if (still) draw(0);
  });
  document.addEventListener('pointerleave', () => { m.tx = -9999; m.ty = -9999; });
  resize();

  function draw(ms) {
    const t = ms / 1000;
    if (m.tx < -999) { m.x += (-9999 - m.x) * 0.02; m.y += (-9999 - m.y) * 0.02; }
    else { m.x += (m.tx - m.x) * 0.12; m.y += (m.ty - m.y) * 0.12; }

    ctx.clearRect(0, 0, w, h);
    // 1) Mesh: a soft grid that bulges away from the cursor
    const gap = 48, R = 170;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(60,52,42,0.08)';
    const warp = (px, py) => {
      const dx = px - m.x, dy = py - m.y, d = Math.hypot(dx, dy) || 1;
      const k = Math.exp(-(d * d) / (2 * R * R)) * 26;
      const wob = Math.sin(px * 0.01 + t * 0.6) * 3 + Math.cos(py * 0.012 - t * 0.5) * 3;
      return [px + (dx / d) * k + wob, py + (dy / d) * k + wob];
    };
    for (let y = 0; y <= h + gap; y += gap) {
      ctx.beginPath();
      for (let x = 0; x <= w + 16; x += 16) { const p = warp(x, y); x ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
      ctx.stroke();
    }
    for (let x = 0; x <= w + gap; x += gap) {
      ctx.beginPath();
      for (let y = 0; y <= h + 16; y += 16) { const p = warp(x, y); y ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
      ctx.stroke();
    }
    // 2) ASCII: drifting soft blobs (a mesh gradient) drawn in characters
    const ramp = ' .:-=+*#%@';
    const cw = 10, chh = 15, mn = Math.min(w, h);
    const blobs = [
      [w * 0.66 + Math.sin(t * 0.18) * w * 0.10, h * 0.58 + Math.cos(t * 0.15) * h * 0.10, mn * 0.42, 0.95],
      [w * 0.30 + Math.cos(t * 0.13) * w * 0.12, h * 0.30 + Math.sin(t * 0.21) * h * 0.10, mn * 0.26, 0.55],
      [m.x, m.y, 150, 0.7]
    ];
    ctx.font = '11px "Geist Mono", ui-monospace, monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let y = chh / 2; y < h; y += chh) {
      for (let x = cw / 2; x < w; x += cw) {
        let f = 0;
        for (let i = 0; i < 3; i++) { const b = blobs[i], dx = x - b[0], dy = y - b[1]; f += b[3] * Math.exp(-(dx * dx + dy * dy) / (2 * b[2] * b[2])); }
        f += Math.sin(x * 0.05 + y * 0.03 + t) * 0.03;
        f = Math.min(1, Math.max(0, f));
        const ch = ramp[Math.floor(f * (ramp.length - 1))];
        if (ch === ' ') continue;
        ctx.fillStyle = 'rgba(60,52,42,' + (0.14 + f * 0.42).toFixed(3) + ')';
        ctx.fillText(ch, x, y);
      }
    }
    if (!still) requestAnimationFrame(draw);
  }
  if (still) draw(0); else requestAnimationFrame(draw);
})();

/* ---------- Contact note flip ---------- */
(function contactNote() {
  const btn = $('#contact-toggle');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // let links work
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    $('#contact-closed').style.display = open ? 'none' : 'contents';
    $('#contact-open').style.display = open ? 'contents' : 'none';
  });
})();
