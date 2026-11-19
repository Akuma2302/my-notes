/* SVG pictures and mind maps, drawn in code so they stay sharp and work offline. */
const D = (() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const defs = '<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker></defs>';
  const svg = (w, h, body, title) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img"><title>${esc(title || 'Diagram')}</title>${defs}${body}</svg>`;

  function wrap(text, max) {
    const words = String(text).split(' '); const lines = []; let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function textBlock(x, y, text, { size = 13, max = 18, weight = 600, anchor = 'middle', cls = '', lh } = {}) {
    const lines = wrap(text, max); lh = lh || size * 1.25;
    const y0 = y - ((lines.length - 1) * lh) / 2;
    return lines.map((l, i) => `<text x="${x}" y="${y0 + i * lh}" text-anchor="${anchor}" dominant-baseline="central" font-size="${size}" font-weight="${weight}" ${cls ? `class="${cls}"` : ''}>${esc(l)}</text>`).join('');
  }
  function box(x, y, w, h, label, color = 'x', sub, opts = {}) {
    const r = opts.r ?? 10;
    let t;
    if (sub) {
      t = textBlock(x + w / 2, y + h / 2 - 9, label, { size: opts.size || 13, max: opts.max || Math.floor(w / 7.5) })
        + textBlock(x + w / 2, y + h / 2 + 11, sub, { size: 11, weight: 400, max: Math.floor(w / 6.2) });
    } else t = textBlock(x + w / 2, y + h / 2, label, { size: opts.size || 13, max: opts.max || Math.floor(w / 7.5) });
    return `<g class="n-${color}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" stroke-width="1.2"/>${t}</g>`;
  }
  const line = (x1, y1, x2, y2, arrow = true, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="svg-line" stroke-width="1.4" ${dash ? 'stroke-dasharray="4 4"' : ''} ${arrow ? 'marker-end="url(#ar)"' : ''}/>`;
  const path = (d, arrow = true, dash) => `<path d="${d}" fill="none" class="svg-line" stroke-width="1.4" ${dash ? 'stroke-dasharray="4 4"' : ''} ${arrow ? 'marker-end="url(#ar)"' : ''}/>`;
  const label = (x, y, t, size = 12, cls = 'svg-t2', anchor = 'middle', weight = 400) => `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="central" font-size="${size}" font-weight="${weight}" class="${cls}">${esc(t)}</text>`;

  /* vertical or horizontal flow of steps */
  function flow(items, { color = 'p', dir = 'v', title, colors } = {}) {
    items = items.map(i => Array.isArray(i) ? i : [i]);
    if (dir === 'h') {
      const n = items.length, W = 640, gap = 26, bw = (W - 20 - gap * (n - 1)) / n, h = 84;
      let b = '';
      items.forEach((it, i) => {
        const x = 10 + i * (bw + gap);
        b += box(x, 18, bw, h, it[0], colors ? colors[i] : color, it[1], { max: Math.floor(bw / 8) });
        if (i < n - 1) b += line(x + bw + 2, 18 + h / 2, x + bw + gap - 2, 18 + h / 2);
      });
      return svg(W, h + 36, b, title);
    }
    const W = 360, bh = 54, gap = 22; let b = '';
    items.forEach((it, i) => {
      const y = 10 + i * (bh + gap);
      b += box(40, y, W - 80, bh, it[0], colors ? colors[i] : color, it[1]);
      if (i < items.length - 1) b += line(W / 2, y + bh + 1, W / 2, y + bh + gap - 2);
    });
    return svg(W, 20 + items.length * (bh + gap) - gap, b, title);
  }

  /* circular cycle (PDCA, risk paradigm, spiral phases) */
  function cycle(items, { color = 't', center, title, colors } = {}) {
    const W = 380, H = 360, cx = W / 2, cy = H / 2, R = 125, n = items.length; let b = '';
    if (center) b += `<g class="n-x"><circle cx="${cx}" cy="${cy}" r="48" stroke-width="1.2"/>${textBlock(cx, cy, center, { size: 13, max: 11 })}</g>`;
    const pts = items.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + R * Math.cos(a), cy + R * Math.sin(a), a]; });
    pts.forEach((p, i) => {
      const q = pts[(i + 1) % n]; const a1 = p[2] + 0.42, a2 = q[2] - 0.42 + (i === n - 1 ? 2 * Math.PI : 0);
      const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
      b += path(`M${x1},${y1} A${R},${R} 0 0 1 ${x2},${y2}`);
    });
    pts.forEach((p, i) => {
      const it = Array.isArray(items[i]) ? items[i] : [items[i]];
      b += box(p[0] - 62, p[1] - 28, 124, 56, it[0], colors ? colors[i] : color, it[1], { max: 15 });
    });
    return svg(W, H, b, title);
  }

  /* root -> branches -> leaves (top-down) */
  function tree(root, kids, { color = 'p', title, kidColors } = {}) {
    const n = kids.length, W = Math.max(360, n * 150), colW = W / n;
    const maxLeaves = Math.max(...kids.map(k => (k.kids || []).length));
    const H = 150 + maxLeaves * 34; let b = '';
    b += box(W / 2 - 110, 10, 220, 46, root, 'x');
    kids.forEach((k, i) => {
      const cx = colW * i + colW / 2, c = kidColors ? kidColors[i] : color;
      b += path(`M${W / 2},56 C${W / 2},76 ${cx},70 ${cx},88`);
      b += box(cx - colW / 2 + 8, 90, colW - 16, 48, k.label, c, k.sub, { max: Math.floor((colW - 16) / 7.5) });
      (k.kids || []).forEach((leaf, j) => {
        const y = 150 + j * 34;
        b += `<g class="n-${c}"><rect x="${cx - colW / 2 + 16}" y="${y}" width="${colW - 32}" height="28" rx="14" stroke-width=".8" style="fill-opacity:.55"/></g>`;
        b += `<g class="n-${c}">${textBlock(cx, y + 14, leaf, { size: 11.5, weight: 500, max: Math.floor((colW - 36) / 6.3) })}</g>`;
      });
    });
    return svg(W, H, b, title);
  }

  /* two columns compare */
  function compare(a, b2, { title } = {}) {
    const rows = Math.max(a.items.length, b2.items.length), W = 600, H = 70 + rows * 46; let b = '';
    [[a, 10], [b2, 310]].forEach(([side, x]) => {
      b += box(x, 8, 280, 44, side.title, side.color || 'p');
      side.items.forEach((it, i) => {
        b += `<g class="n-${side.color || 'p'}"><rect x="${x + 8}" y="${62 + i * 46}" width="264" height="38" rx="8" stroke-width=".6" style="fill-opacity:.45"/>${textBlock(x + 140, 81 + i * 46, it, { size: 12, weight: 500, max: 38 })}</g>`;
      });
    });
    b += label(300, 30, 'vs', 13, 'svg-t', 'middle', 700);
    return svg(W, H, b, title);
  }

  /* grid of cards */
  function cards(items, { cols = 3, title, h = 74 } = {}) {
    const W = 600, gap = 10, w = (W - gap * (cols + 1)) / cols, rows = Math.ceil(items.length / cols); let b = '';
    items.forEach((it, i) => {
      const r = Math.floor(i / cols), c = i % cols;
      b += box(gap + c * (w + gap), gap + r * (h + gap), w, h, it.t, it.c || 'p', it.s, { max: Math.floor(w / 8) });
    });
    return svg(W, gap + rows * (h + gap), b, title);
  }

  /* simple bar chart */
  function bars(data, { title, color = 'c', unit = '', max, labelW = 150 } = {}) {
    const W = 600, bh = 26, gap = 10, H = 20 + data.length * (bh + gap); max = max || Math.max(...data.map(d => d.v)); let b = '';
    data.forEach((d, i) => {
      const y = 10 + i * (bh + gap), w = Math.max(4, ((W - labelW - 80) * d.v) / max);
      b += label(labelW - 8, y + bh / 2, d.label, 12, 'svg-t', 'end', 500);
      b += `<g class="n-${d.c || color}"><rect x="${labelW}" y="${y}" width="${w}" height="${bh}" rx="5" stroke-width="1"/></g>`;
      b += label(labelW + w + 8, y + bh / 2, (d.text || d.v + unit), 12, 'svg-t2', 'start', 600);
    });
    return svg(W, H, b, title);
  }

  /* mind map: center with branches split left / right, leaves as pills */
  function mindmap(m) {
    const br = m.branches, left = br.filter((_, i) => i % 2 === 1), right = br.filter((_, i) => i % 2 === 0);
    /* half width = OFF + BW + GAP + LW + margin, so nothing leaves the canvas */
    const OFF = 100, BW = 140, GAP = 26, LW = 196, W = 2 * (OFF + BW + GAP + LW + 8), cx = W / 2;
    const sideH = side => side.reduce((s, b) => s + Math.max(1, (b.kids || []).length) * 30 + 26, 0);
    const H = Math.max(260, Math.max(sideH(left), sideH(right)) + 30), cy = H / 2;
    let b = '';
    const drawSide = (side, dir) => {
      let y = (H - sideH(side)) / 2 + 10;
      side.forEach(bn => {
        const kids = bn.kids || [], blockH = Math.max(1, kids.length) * 30, by = y + blockH / 2;
        const bx = dir > 0 ? cx + OFF : cx - OFF - BW;
        const c = bn.color || 'p';
        b += path(`M${cx + dir * 70},${cy} C${cx + dir * 90},${cy} ${cx + dir * 85},${by} ${dir > 0 ? bx : bx + BW},${by}`, false);
        b += box(bx, by - 22, BW, 44, bn.label, c, null, { max: 18, size: 13 });
        kids.forEach((k, j) => {
          const ky = y + j * 30 + 15, kx = dir > 0 ? bx + BW + GAP : bx - GAP - LW;
          b += path(`M${dir > 0 ? bx + BW : bx},${by} C${dir > 0 ? bx + BW + 14 : bx - 14},${by} ${dir > 0 ? bx + BW + 14 : bx - 14},${ky} ${dir > 0 ? kx : kx + LW},${ky}`, false);
          b += `<g class="n-${c}"><rect x="${kx}" y="${ky - 12}" width="${LW}" height="24" rx="12" stroke-width=".7" style="fill-opacity:.5"/>${textBlock(kx + LW / 2, ky, k, { size: 11.5, weight: 500, max: 32 })}</g>`;
        });
        y += blockH + 26;
      });
    };
    drawSide(right, 1); drawSide(left, -1);
    b += `<g class="n-b"><ellipse cx="${cx}" cy="${cy}" rx="78" ry="40" stroke-width="1.6"/>${textBlock(cx, cy, m.center, { size: 14, max: 14, weight: 700 })}</g>`;
    return svg(W, H, b, 'Mind map: ' + m.center);
  }

  /* ---------- special pictures ---------- */
  const special = {
    errorChain() {
      let b = box(10, 30, 170, 70, 'Error', 'a', 'Mistake by a person') + box(215, 30, 170, 70, 'Fault (bug)', 'c', 'Hidden in the code') + box(420, 30, 170, 70, 'Failure', 'r', 'User sees it at run time');
      b += line(182, 65, 213, 65) + line(387, 65, 418, 65);
      b += label(300, 122, 'Only when the faulty code is actually executed', 12) + label(505, 122, 'Not every fault becomes a failure', 12);
      return svg(600, 140, b, 'Error to fault to failure');
    },
    swVsHw() {
      return compare({ title: 'Software product', color: 'p', items: ['Millions of operating modes', 'Invisible: defects hidden', 'Defects found in development only'] },
        { title: 'Industrial (hardware) product', color: 'x', items: ['A few thousand modes', 'Visible: defects can be seen', 'Defects found in every phase'] }, { title: 'Software vs hardware' });
    },
    qaVsQc() {
      let b = '';
      ['Requirements', 'Design', 'Coding', 'Testing', 'Release'].forEach((s, i) => { b += box(10 + i * 118, 60, 104, 40, s, 'x'); if (i < 4) b += line(116 + i * 118, 80, 126 + i * 118, 80); });
      b += `<g class="n-g"><rect x="10" y="12" width="580" height="34" rx="8" stroke-width="1"/>${textBlock(300, 29, 'QA = prevent errors across the whole process', { size: 13, max: 80 })}</g>`;
      b += `<g class="n-c"><rect x="364" y="114" width="226" height="34" rx="8" stroke-width="1"/>${textBlock(477, 131, 'QC = inspect product, withhold bad ones', { size: 12, max: 40 })}</g>`;
      return svg(600, 160, b, 'QA vs QC');
    },
    mccall() {
      return tree("McCall's quality factors (1977)", [
        { label: 'Product operation', sub: 'Using it daily', kids: ['Correctness', 'Reliability', 'Efficiency', 'Integrity', 'Usability'] },
        { label: 'Product revision', sub: 'Changing it', kids: ['Maintainability', 'Flexibility', 'Testability'] },
        { label: 'Product transition', sub: 'Moving it', kids: ['Portability', 'Reusability', 'Interoperability'] }
      ], { kidColors: ['p', 't', 'c'], title: "McCall's model tree" });
    },
    mccallTriangle() {
      let b = `<polygon points="300,30 110,300 490,300" fill="none" class="svg-line" stroke-width="2"/>`;
      b += box(215, 4, 170, 50, 'Product revision', 't', 'Maintain, flex, test');
      b += box(20, 278, 190, 50, 'Product operation', 'p', 'Correct, reliable, efficient...');
      b += box(390, 278, 190, 50, 'Product transition', 'c', 'Port, reuse, interoperate');
      b += label(300, 200, 'Software', 16, 'svg-t', 'middle', 700) + label(300, 222, 'product', 16, 'svg-t', 'middle', 700);
      return svg(600, 340, b, "McCall's triangle");
    },
    waterfall() {
      const st = ['Requirements', 'Analysis', 'Design', 'Coding', 'Testing', 'Installation', 'Maintenance']; let b = '';
      st.forEach((s, i) => { const x = 10 + i * 80, y = 10 + i * 40; b += box(x, y, 120, 36, s, 't', null, { size: 12 }); if (i < st.length - 1) b += path(`M${x + 120},${y + 18} L${x + 132},${y + 18} L${x + 132},${y + 48}`); });
      return svg(620, 300, b, 'Waterfall model');
    },
    vmodel() {
      const L = ['Requirements', 'System design', 'Architecture', 'Module design'], R = ['Acceptance test', 'System test', 'Integration test', 'Unit test']; let b = '';
      L.forEach((s, i) => { b += box(20 + i * 50, 10 + i * 62, 150, 44, s, 'p'); });
      R.forEach((s, i) => { b += box(430 - i * 50, 10 + i * 62, 150, 44, s, 'g'); b += line(170 + i * 50, 32 + i * 62, 428 - i * 50, 32 + i * 62, true, true); });
      b += box(225, 262, 150, 44, 'Coding', 'x');
      b += path('M170,240 L222,280', true) + path('M378,282 L430,240', true);
      b += label(150, 300, 'Verification side', 12) + label(470, 300, 'Validation side', 12);
      return svg(600, 320, b, 'V model');
    },
    spiral() {
      let b = '';
      for (let r = 30; r <= 150; r += 30) b += `<circle cx="300" cy="170" r="${r}" fill="none" class="svg-line" stroke-width="1" stroke-dasharray="3 4"/>`;
      b += line(300, 10, 300, 330, false) + line(110, 170, 490, 170, false);
      b += box(330, 14, 150, 44, '1. Planning', 't') + box(330, 282, 170, 44, '2. Risk analysis', 'r') + box(100, 282, 170, 44, '3. Engineering', 'p') + box(110, 14, 160, 44, '4. Customer evaluation', 'a');
      b += path('M300,140 A30,30 0 1,1 330,170 A60,60 0 1,1 300,110 A90,90 0 1,1 390,170 A120,120 0 1,1 300,50', true);
      return svg(600, 340, b, 'Spiral model');
    },
    prototyping() {
      return cycle([['Build prototype'], ['Users try it', 'Give comments'], ['Developers fix', 'Add parts'], ['Goal reached?']], { color: 'p', center: 'Repeat', title: 'Prototyping model' });
    },
    topDownBottomUp() {
      let b = label(150, 14, 'Top-down: needs STUBS', 13, 'svg-t', 'middle', 700) + label(450, 14, 'Bottom-up: needs DRIVERS', 13, 'svg-t', 'middle', 700);
      b += box(100, 30, 100, 36, 'M9 (main)', 'p') + box(30, 110, 100, 36, 'Stub of M1', 'x') + box(170, 110, 100, 36, 'Stub of M2', 'x');
      b += line(130, 66, 80, 108) + line(170, 66, 220, 108);
      b += box(400, 30, 100, 36, 'Driver of M9', 'x') + box(330, 110, 100, 36, 'M1 (tested)', 't') + box(470, 110, 100, 36, 'M2 (tested)', 't');
      b += line(430, 66, 380, 108) + line(470, 66, 520, 108);
      b += label(150, 168, 'Dummy lower modules replace', 11.5) + label(150, 184, 'unfinished ones below', 11.5);
      b += label(450, 168, 'Fake upper module sends test', 11.5) + label(450, 184, 'data to finished modules', 11.5);
      return svg(600, 200, b, 'Stubs and drivers');
    },
    boxes() {
      let b = `<g class="n-x"><rect x="20" y="40" width="160" height="110" rx="10" style="fill:#333"/></g>` + label(100, 95, 'Black box', 15, 'svg-t', 'middle', 700);
      b = `<g class="n-x"><rect x="20" y="40" width="160" height="110" rx="10" stroke-width="2"/>${textBlock(100, 95, 'Black box: cannot see inside', { size: 13, max: 14 })}</g>`;
      b += line(0, 95, 18, 95) + line(182, 95, 210, 95) + label(10, 80, 'in', 11) + label(200, 80, 'out', 11);
      b += `<g class="n-t"><rect x="320" y="40" width="260" height="110" rx="10" stroke-width="2"/></g>`;
      b += box(335, 55, 60, 30, 'if', 't') + box(420, 55, 60, 30, 'loop', 't') + box(505, 55, 60, 30, 'calc', 't') + box(420, 105, 60, 30, 'return', 't');
      b += line(395, 70, 418, 70) + line(480, 70, 503, 70) + line(450, 85, 450, 103);
      b += label(100, 175, 'Test only inputs vs outputs', 12) + label(450, 175, 'White box: test every path and line', 12);
      return svg(600, 190, b, 'Black box vs white box');
    },
    pathCoverage() {
      const P = [[300, 20, '1'], [300, 70, '2'], [220, 120, '3'], [380, 120, '4'], [300, 170, '5'], [220, 220, '6'], [380, 220, '7'], [300, 270, '8']]; let b = '';
      [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 7], [6, 7]].forEach(([a, c]) => b += line(P[a][0], P[a][1] + 16, P[c][0], P[c][1] - 16));
      P.forEach(p => b += `<g class="n-p"><circle cx="${p[0]}" cy="${p[1]}" r="16" stroke-width="1.2"/>${textBlock(p[0], p[1], p[2], { size: 13 })}</g>`);
      b += label(120, 120, 'IF #1', 12, 'svg-t2') + label(120, 220, 'IF #2', 12, 'svg-t2');
      b += label(490, 60, '4 full paths:', 12, 'svg-t', 'middle', 700) + label(490, 82, '1-2-3-5-6-8', 12) + label(490, 100, '1-2-3-5-7-8', 12) + label(490, 118, '1-2-4-5-6-8', 12) + label(490, 136, '1-2-4-5-7-8', 12);
      b += label(490, 170, 'Line coverage needs 2', 12, 'svg-t2') + label(490, 188, 'Path coverage needs 4', 12, 'svg-t2');
      return svg(600, 295, b, 'Path coverage graph');
    },
    reviewTypes() {
      return cards([
        { t: 'Formal design review', s: 'Approves the design', c: 'p' }, { t: 'Inspection', s: 'Formal, checklist, defects', c: 't' }, { t: 'Walkthrough', s: 'Informal, author leads', c: 't' },
        { t: 'Expert opinion', s: 'Outside specialist', c: 'c' }, { t: 'Contract review', s: 'Before signing', c: 'a' }, { t: 'All are static', s: 'Code is not run', c: 'x' }
      ], { cols: 3, title: 'Review methods' });
    },
    contractReview() {
      return flow([['Customer request', 'RFP / tender'], ['Proposal draft review', 'Clarify needs, risks, cost'], ['Negotiation'], ['Contract draft review', 'No unclear issues left'], ['Sign contract']], { colors: ['x', 'a', 'x', 'a', 'g'], title: 'Contract review stages' });
    },
    reliabilityMetrics() {
      return cards([
        { t: 'POFOD', s: 'Fail per request (ATM)', c: 't' }, { t: 'ROCOF', s: 'Failures per time (OS)', c: 't' },
        { t: 'MTTF', s: 'Time between failures', c: 't' }, { t: 'Availability', s: 'Uptime incl. repair', c: 't' }
      ], { cols: 2, title: 'Four reliability metrics' });
    },
    statTesting() {
      return flow(['Find operational profile', 'Generate test data to match it', 'Run tests, time each failure', 'Measure reliability statistically'], { color: 't', title: 'Statistical testing' });
    },
    growthCurve() {
      let b = line(50, 230, 580, 230) + line(50, 230, 50, 20) + label(315, 255, 'Testing time / fixes', 12) + `<text x="18" y="125" font-size="12" class="svg-t2" transform="rotate(-90 18 125)" text-anchor="middle">Reliability</text>`;
      b += path('M50,220 L110,220 L110,170 L170,170 L170,135 L240,135 L240,150 L290,150 L290,110 L380,110 L380,92 L480,92 L480,82 L575,82', false);
      b += label(265, 165, 'A fix added a new fault', 11, 'svg-t2');
      b += `<path d="M50,220 C150,140 300,95 575,75" fill="none" stroke="var(--text)" stroke-width="2" stroke-dasharray="5 4"/>`;
      b += label(500, 60, 'Growth slows over time', 11.5, 'svg-t2');
      return svg(600, 270, b, 'Reliability growth');
    },
    achieve() {
      return flow([['Fault avoidance', "Don't put bugs in"], ['Fault detection', 'Find bugs before delivery'], ['Fault tolerance', 'Keep running despite bugs']], { dir: 'h', colors: ['p', 't', 'c'], title: 'Three ways to reach reliability' });
    },
    faultCost() {
      let b = line(60, 220, 580, 220) + line(60, 220, 60, 20) + label(320, 245, 'Number of residual errors', 12) + label(110, 235, 'Many', 11) + label(540, 235, 'Very few', 11);
      b += `<text x="22" y="120" font-size="12" class="svg-t2" transform="rotate(-90 22 120)" text-anchor="middle">Cost per error removed</text>`;
      b += `<path d="M70,210 C300,205 470,180 560,30" fill="none" stroke="var(--text)" stroke-width="2.5"/>`;
      b += label(420, 70, 'Cost explodes near zero bugs', 12, 'svg-t', 'middle', 600);
      return svg(600, 260, b, 'Fault removal cost');
    },
    nversion() {
      let b = box(10, 100, 120, 50, 'Specification', 'x');
      ['Version 1 (team A)', 'Version 2 (team B)', 'Version 3 (team C)'].forEach((v, i) => { b += box(180, 20 + i * 80, 150, 50, v, 't'); b += line(130, 125, 178, 45 + i * 80); b += line(330, 45 + i * 80, 388, 125); });
      b += box(390, 95, 100, 60, 'Output comparator', 'a', 'Majority vote');
      b += box(520, 100, 70, 50, 'Agreed result', 'g'); b += line(490, 125, 518, 125);
      return svg(600, 270, b, 'N-version programming');
    },
    recoveryBlock() {
      let b = box(10, 20, 130, 44, 'Try algorithm 1', 't') + box(200, 20, 130, 44, 'Acceptance test', 'a') + box(420, 20, 160, 44, 'Pass: continue', 'g');
      b += line(140, 42, 198, 42) + line(330, 42, 418, 42);
      b += box(10, 110, 130, 44, 'Retry algorithm 2', 't') + box(10, 200, 130, 44, 'Retry algorithm 3', 't') + box(200, 200, 160, 44, 'All fail: raise exception', 'r');
      b += path('M265,64 L265,90 L75,90 L75,108') + label(170, 82, 'fail', 11) + path('M75,154 L75,198') + line(140, 222, 198, 222);
      b += label(460, 130, 'Weakness: writing a good', 12, 'svg-t2') + label(460, 148, 'acceptance test is hard', 12, 'svg-t2');
      return svg(600, 260, b, 'Recovery blocks');
    },
    ftSteps() {
      return flow([['1. Failure detection', 'Notice something broke'], ['2. Damage assessment', 'Which data is corrupted?'], ['3. Fault recovery', 'Go back to a safe state'], ['4. Fault repair', 'Change code (often not needed)']], { colors: ['r', 'a', 't', 'g'], title: 'Fault tolerance actions' });
    },
    recovery() {
      return compare({ title: 'Forward recovery', color: 'p', items: ['Repair the corrupted state', 'Needs domain knowledge', 'Error-correcting codes', 'Redundant pointers rebuild lists'] },
        { title: 'Backward recovery', color: 't', items: ['Roll back to a safe state', 'Simpler, more common', 'Transactions, checkpoints', 'Undo, System Restore'] }, { title: 'Forward vs backward recovery' });
    },
    hazard() {
      return flow([['Hazard', 'Sensor fails to see obstacle'], ['Accident', 'Machine injures operator'], ['Damage', 'Size of the loss']], { dir: 'h', colors: ['a', 'r', 'x'], title: 'Hazard, accident, damage' });
    },
    metricsTree() {
      return tree('Software quality metrics', [
        { label: 'Process metrics', kids: ['Quality (error density)', 'Timetable', 'Productivity', 'DRE, TER, test efficiency'] },
        { label: 'Product metrics', kids: ['Help desk services', 'Corrective maintenance', 'Size: LOC, KLOC', 'Size: function points'] }
      ], { kidColors: ['c', 'p'], title: 'Metrics classification' });
    },
    fpStages() {
      return flow([['Stage 1: CFP', 'Count + weight 5 components'], ['Stage 2: RCAF', 'Grade 14 subjects 0-5 (0-70)'], ['Stage 3: FP', 'CFP x (0.65 + 0.01 x RCAF)']], { dir: 'h', color: 'c', title: 'Function point stages' });
    },
    kloc() {
      return compare({ title: 'KLOC', color: 'x', items: ['Depends on language and style', 'Little experience needed', 'Little work', 'Little judgement', 'Only after coding'] },
        { title: 'Function points', color: 'c', items: ['Language independent', 'Needs great experience', 'Far more work', 'Subjective judgement', 'Available before project'] }, { title: 'KLOC vs FP' });
    },
    measure3() {
      return flow([['Understanding', 'Make the process visible'], ['Control', 'Predict and act on baselines'], ['Improvement', 'Change process using data']], { dir: 'h', colors: ['c', 'c', 'g'], title: 'Why we measure' });
    },
    vvPhases() {
      return flow([['Requirements V&V', 'RVM + evaluation'], ['Design V&V', 'Interfaces, trace to reqs'], ['Implementation V&V', 'Code vs design'], ['Test V&V', 'Inputs, outputs, criteria'], ['Installation V&V', 'Final V&V report']], { color: 'c', title: 'V&V phases' });
    },
    vvDiff() {
      return compare({ title: 'Verification', color: 'p', items: ['Are we building it RIGHT?', 'Phase output vs phase input', 'Reviews, inspections', 'Developer focus'] },
        { title: 'Validation', color: 'g', items: ['Are we building the RIGHT thing?', 'Product vs customer needs', 'Testing, acceptance', 'Customer focus'] }, { title: 'Verification vs validation' });
    },
    vvp() {
      return cards(['Objective', 'Schedule', 'Resources and responsibilities', 'Tools', 'Control procedures', 'Deviation procedures', 'Documents'].map((t, i) => ({ t: `${i + 1}. ${t}`, c: i % 2 ? 'c' : 'a' })), { cols: 2, h: 52, title: 'VVP contents' });
    },
    pdca() {
      return cycle([['Plan', 'Find problem, plan fix'], ['Do', 'Try it small'], ['Check / Study', 'Measure result'], ['Act', 'Standardise or redo']], { colors: ['p', 't', 'a', 'g'], center: 'Deming wheel', title: 'PDCA cycle' });
    },
    fishbone() {
      let b = line(30, 160, 470, 160) + box(475, 130, 115, 60, 'Too many bugs in release', 'r');
      const causes = [['People', 'No training', 'Rushed'], ['Process', 'No reviews', 'Late testing'], ['Tools', 'No CI', 'Old IDE'], ['Requirements', 'Unclear', 'Changing']];
      causes.forEach((c, i) => {
        const x = 110 + (i % 2) * 190, top = i < 2, y0 = top ? 40 : 280;
        b += line(x, y0, x + 70, 160, false);
        b += box(x - 50, top ? 10 : 282, 100, 30, c[0], 'a');
        b += label(x - 10 + (top ? 18 : 18), top ? 85 : 235, c[1], 11, 'svg-t2', 'end');
        b += label(x + 30, top ? 118 : 205, c[2], 11, 'svg-t2', 'end');
      });
      return svg(600, 320, b, 'Fishbone diagram');
    },
    pareto() {
      const d = [['UI', 42], ['Input check', 25], ['Database', 14], ['Network', 9], ['Docs', 6], ['Other', 4]]; let b = line(50, 240, 580, 240) + line(50, 240, 50, 20); let cum = 0, pts = [];
      d.forEach((x, i) => { const h = x[1] * 4.5, X = 70 + i * 85; b += `<g class="n-c"><rect x="${X}" y="${240 - h}" width="60" height="${h}" rx="4"/></g>` + label(X + 30, 255, x[0], 11) + label(X + 30, 232 - h, x[1] + '%', 11, 'svg-t', 'middle', 600); cum += x[1]; pts.push([X + 30, 240 - cum * 2.1]); });
      b += `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2"/>` + pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="var(--accent)"/>`).join('');
      b += label(420, 30, 'Top 2 causes = 67% of bugs', 12, 'svg-t', 'middle', 600);
      return svg(600, 270, b, 'Pareto chart');
    },
    tqmPrinciples() {
      return cards(['Voice of the customer', 'Everyone involved', 'Strive for zero defect', 'Build quality in', 'Focus on the process', 'Suppliers are partners', 'Quality is free'].map((t, i) => ({ t: `${i + 1}. ${t}`, c: 'p' })), { cols: 2, h: 50, title: 'TQM principles' });
    },
    riskParadigm() {
      return cycle([['Identify', 'Find risks early'], ['Analyze', 'Probability, impact'], ['Plan', 'Decide actions'], ['Track', 'Watch indicators'], ['Control', 'Correct deviations']], { color: 'c', center: 'RISK', title: 'Risk management paradigm' });
    },
    riskMatrix() {
      let b = ''; const cols = ['x', 'a', 'a', 'c', 'r'];
      for (let p = 0; p < 5; p++) for (let i = 0; i < 5; i++) { const s = (p + 1) * (i + 1), c = s >= 15 ? 'r' : s >= 8 ? 'c' : s >= 4 ? 'a' : 'g'; b += `<g class="n-${c}"><rect x="${110 + i * 90}" y="${10 + (4 - p) * 46}" width="86" height="42" rx="6" stroke-width=".8"/>${textBlock(153 + i * 90, 31 + (4 - p) * 46, String(s), { size: 13 })}</g>`; }
      b += label(335, 250, 'Impact (1 low to 5 catastrophic)', 12) + `<text x="70" y="120" font-size="12" class="svg-t2" transform="rotate(-90 70 120)" text-anchor="middle">Probability</text>`;
      void cols;
      return svg(600, 265, b, 'Risk matrix');
    },
    costOfError() {
      return bars([{ label: 'Requirements', v: 1, text: '$10-15' }, { label: 'Design', v: 5, text: '~5x' }, { label: 'Coding', v: 10, text: '~10x' }, { label: 'Testing', v: 25, text: '~25x' }, { label: 'After release', v: 100, text: 'up to millions' }], { color: 'r', title: 'Cost to fix an error' });
    },
    riskAreas() {
      return cards(['Missing deadlines', 'Poorly defined users', 'Creeping featurism', 'New technology', 'Non-testability', 'Low reusability', 'Personnel shortage', 'Poor training'].map(t => ({ t, c: 'c' })), { cols: 2, h: 46, title: '8 areas of risk' });
    },
    sqaEnv() {
      return cards(['Contract conditions', 'Customer-supplier relation', 'Teamwork', 'Coordinate with other teams', 'Interfaces with other systems', 'Survive staff changes', 'Long maintenance period'].map(t => ({ t, c: 'p' })), { cols: 2, h: 46, title: 'SQA environment' });
    },
    errorCauses() {
      return cards(['Faulty requirements', 'Client-developer miscommunication', 'Deliberate deviations', 'Logical design errors', 'Coding errors', 'Not following standards', 'Weak testing process', 'Procedure errors', 'Documentation errors'].map((t, i) => ({ t: `${i + 1}. ${t}`, c: i < 3 ? 'a' : i < 6 ? 'c' : 'r' })), { cols: 3, h: 56, title: 'Nine causes of software errors' });
    },
    isoComponents() {
      return cards([{ t: 'Programs', s: 'The code', c: 'p' }, { t: 'Procedures', s: 'How it is run', c: 'p' }, { t: 'Documentation', s: 'Manuals, design docs', c: 'p' }, { t: 'Data', s: 'Needed to operate', c: 'p' }], { cols: 4, title: 'ISO: 4 parts of software' });
    },
    reliabilityVsEff() {
      return compare({ title: 'More reliability', color: 't', items: ['Extra run-time checks', 'Redundant code', 'Slower but safer', 'Usually the better choice'] },
        { title: 'More efficiency', color: 'x', items: ['Fewer checks', 'Faster', 'Hardware is cheap now', 'Unreliable software is not used'] }, { title: 'Reliability vs efficiency' });
    },
    qaPlanFactors() {
      return compare({ title: 'Project factors', color: 'p', items: ['Size of project', 'Complexity and difficulty', 'Amount of reuse', 'Severity of failure'] },
        { title: 'Team factors', color: 't', items: ['Qualifications', 'Experience in this area', 'Professional support', '% of new staff'] }, { title: 'What decides how much QA' });
    },
    sqm() {
      return flow([['Project progress control', 'Schedule, budget, RMA'], ['Quality metrics', 'Productivity, fault density'], ['Quality costs', 'Prevention vs failure costs']], { dir: 'h', colors: ['p', 'c', 'a'], title: 'Software quality management' });
    },
    bigbang() {
      return compare({ title: 'Big bang testing', color: 'r', items: ['Test everything at once', 'Hard to locate errors', 'Correction is laborious', 'Fuzzy schedule'] },
        { title: 'Incremental testing', color: 'g', items: ['Unit, then integrate', 'Errors easy to locate', 'Fix within one unit', 'Planned schedule'] }, { title: 'Big bang vs incremental' });
    },
    rmmm() {
      return flow([['Mitigation', 'How can we avoid it?'], ['Monitoring', 'What signals do we track?'], ['Management', 'Contingency plan if it happens']], { dir: 'h', colors: ['t', 'a', 'r'], title: 'RMMM' });
    },
    filters() {
      return flow([['Design review / audit', 'Catches spec errors, cheap'], ['Code inspection', 'Catches coding errors'], ['Automated tests', 'Catches regressions'], ['System test', 'Catches behaviour errors'], ['Customer', 'Most expensive place to find bugs']], { colors: ['g', 'g', 'a', 'a', 'r'], title: 'Testing as filters' });
    },
    deming() {
      return cards(['Constancy of purpose', 'Adopt the new philosophy', 'Stop mass inspection', 'Fewer suppliers', 'Statistical methods', 'Train on the job', 'Better supervision', 'Drive out fear', 'Break barriers', 'No production quotas', 'Quality work standards', 'Train in statistics', 'Retrain people', 'Repeat every day'].map((t, i) => ({ t: `${i + 1}. ${t}`, c: 'p' })), { cols: 2, h: 40, title: "Deming's 14 points" });
    },
    statsLevels() {
      return compare({ title: 'Descriptive statistics', color: 'c', items: ['Mean, median, mode', 'Histograms, pie charts', 'Control charts'] },
        { title: 'Analytical statistics', color: 'p', items: ['Is the change significant?', 'Regression', 'Analysis of variance'] }, { title: 'Statistics levels' });
    }
  };

  return { flow, cycle, tree, compare, cards, bars, mindmap, special, svg, box, line, label, esc };
})();

export default D;
