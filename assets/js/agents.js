// The home figure: a small multi-agent system at work. Decorative and self-contained;
// no AI service is called. Without JavaScript or with reduced motion the static SVG stays.
(() => {
  const host = document.querySelector('[data-agents]');
  const svg = host && host.querySelector('svg');
  if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const NS = 'http://www.w3.org/2000/svg';
  const W = 480, SHORE = 440, MAX_CUSTOM = 3;
  const el = (name, attrs, parent) => {
    const node = document.createElementNS(NS, name);
    for (const key in attrs) node.setAttribute(key, attrs[key]);
    if (parent) parent.append(node);
    return node;
  };
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 4);

  svg.replaceChildren();
  const clip = el('clipPath', { id: 'above-shore' }, el('defs', {}, svg));
  el('rect', { x: -4000, y: -400, width: 8000, height: 400 + SHORE }, clip);
  const hit = el('rect', { class: 'hit', width: W, height: SHORE - 6 }, svg);
  const edgeLayer = el('g', { class: 'edges' }, svg);
  const dotLayer = el('g', { class: 'dots' }, svg);
  const nodeLayer = el('g', { class: 'nodes' }, svg);

  const shapes = {
    dome: n => el('path', { d: `M${-n.r} 0a${n.r} ${n.r} 0 0 1 ${n.r * 2} 0z` }),
    square: n => el('rect', { x: -n.r, y: -n.r, width: n.r * 2, height: n.r * 2 }),
    circle: n => el('circle', { r: n.r }),
    triangle: n => el('path', { d: `M0 ${-n.r} ${n.r * 0.866} ${n.r / 2}H${-n.r * 0.866}z` }),
  };

  const nodes = [];
  const edges = [];
  let wall = 0;
  const addNode = spec => {
    const node = { scale: 0.82, vs: 0, rot: 0, vr: 0, rotTo: 0, alpha: 0, born: 0, lift: false, tx: spec.x, ty: spec.y, ...spec };
    node.outer = el('g', node.kind === 'dome' ? { 'clip-path': 'url(#above-shore)' } : {}, nodeLayer);
    node.g = el('g', { class: `node ${node.tool ? 'tool' : 'ink-' + node.ink}` }, node.outer);
    // Small shapes get a finger-sized target.
    if (node.r < 30) el('circle', { class: 'grip', r: 30 }, node.g);
    node.g.append(shapes[node.kind](node));
    node.g.addEventListener('pointerdown', event => startDrag(event, node));
    nodes.push(node);
    return node;
  };
  const link = (a, b, delay) => edges.push({ a, b, born: delay, line: el('line', {}, edgeLayer) });
  const anchor = n => (n.kind === 'dome' ? { x: n.x, y: n.y - n.r * 0.42 } : n);
  const pointOf = n => (n.point ? n.point() : anchor(n));
  // Messages travel the visible part of a line: they leave from under one shape and slip under the next.
  const cover = n => (n.point ? n.cover || 0 : n.r * (n.kind === 'dome' ? 0.5 : 0.72));

  const orch = addNode({ name: 'orchestrator', kind: 'dome', x: 250, y: SHORE, r: 112, ink: 'vino', born: 0 });
  const square = addNode({ name: 'pine square', kind: 'square', x: 80, y: 282, r: 32, ink: 'pino', turn: 90, born: 260 });
  const circle = addNode({ name: 'cobalt circle', kind: 'circle', x: 200, y: 160, r: 38, ink: 'cielo', born: 340 });
  const triangle = addNode({ name: 'sun triangle', kind: 'triangle', x: 400, y: 236, r: 46, ink: 'sole', turn: 120, born: 430 });
  const dot = addNode({ name: 'wine circle', kind: 'circle', x: 322, y: 72, r: 22, ink: 'vino', born: 540 });
  const wedge = addNode({ name: 'pine triangle', kind: 'triangle', x: 88, y: 98, r: 27, ink: 'pino', turn: 120, born: 600 });
  const toolA = addNode({ name: 'tool', kind: 'square', tool: true, x: 30, y: 190, r: 11, turn: 90, born: 720 });
  const toolB = addNode({ name: 'tool', kind: 'circle', tool: true, x: 446, y: 346, r: 13, born: 770 });
  const toolC = addNode({ name: 'tool', kind: 'square', tool: true, x: 440, y: 104, r: 11, turn: 90, born: 830 });
  square.uses = toolA;
  triangle.uses = toolB;
  dot.uses = toolC;
  // Leads take work from the orchestrator; every agent can talk to its neighbours.
  const leads = [square, circle, triangle];
  const agents = [square, circle, triangle, dot, wedge];
  [[orch, square, 520], [orch, circle, 580], [orch, triangle, 660], [square, circle, 740], [circle, triangle, 800],
    [circle, dot, 860], [circle, wedge, 910], [dot, triangle, 960], [wedge, square, 1010],
    [square, toolA, 1060], [triangle, toolB, 1100], [dot, toolC, 1140]].forEach(([a, b, delay]) => link(a, b, delay));

  // Simulation clock: stops when paused, hidden or off-screen, so nothing piles up.
  let clock = 0;
  const timers = [];
  const messages = [];
  const wait = ms => new Promise(resolve => timers.push({ at: clock + ms, resolve }));
  const trace = document.querySelector('[data-trace]');
  const pad = n => String(n).padStart(2, '0');
  // The readout holds each line long enough to read; when hops outrun it, it skips to the latest.
  let shownAt = -1e9, pending = null;
  const say = text => { pending = text; };
  const flushTrace = () => {
    if (!trace || pending === null || wall - shownAt < 650) return;
    trace.textContent = pending;
    pending = null;
    shownAt = wall;
  };

  const bump = node => { node.vs += 1.4 + 40 / node.r; };
  const think = async node => {
    bump(node);
    if (node.turn) node.rotTo += node.turn;
    await wait(rand(280, 480));
  };
  const hop = (from, to, ink, label) => new Promise(resolve => {
    const a = pointOf(from), b = pointOf(to);
    const distance = Math.hypot(a.x - b.x, a.y - b.y) - cover(from) - cover(to);
    const start = Math.min(0.45, cover(from) / (Math.hypot(a.x - b.x, a.y - b.y) || 1));
    say(label);
    messages.push({ from, to, t: 0, duration: clamp(distance * 4.2, 520, 1700), resolve,
      dot: el('circle', { class: 'ink-' + ink, r: 6.5, cx: a.x + (b.x - a.x) * start, cy: a.y + (b.y - a.y) * start }, dotLayer) });
  });

  const edgePoint = side => ({ point: () => {
    const box = svg.getBoundingClientRect();
    const unit = W / box.width;
    return { x: side < 0 ? -box.left * unit - 12 : (innerWidth - box.left) * unit + 12, y: SHORE };
  } });
  const enter = edgePoint(-1), leave = edgePoint(1);
  const base = { cover: 66, point: () => ({ x: orch.x, y: SHORE }) };
  const neighbours = node => edges.filter(e => e.a === node || e.b === node)
    .map(e => (e.a === node ? e.b : e.a)).filter(n => agents.includes(n));
  const callTool = async (agent, tag) => {
    await hop(agent, agent.uses, agent.ink, `${tag}${agent.name} → tool`);
    await think(agent.uses);
    await hop(agent.uses, agent, 'ink', `${tag}tool → ${agent.name}`);
    await think(agent);
  };

  const delegate = async (lead, delay, tag) => {
    await wait(delay);
    await hop(orch, lead, orch.ink, `${tag}orchestrator → ${lead.name}`);
    await think(lead);
    const peers = neighbours(lead);
    for (let round = Math.random() < 0.35 ? 2 : 1; peers.length && round > 0; round--) {
      const peer = pick(peers);
      await hop(lead, peer, lead.ink, `${tag}${lead.name} → ${peer.name}`);
      await think(peer);
      if (peer.uses && Math.random() < 0.6) await callTool(peer, tag);
      await hop(peer, lead, peer.ink, `${tag}${peer.name} → ${lead.name}`);
      await think(lead);
    }
    if (lead.uses && Math.random() < 0.7) await callTool(lead, tag);
    await hop(lead, orch, lead.ink, `${tag}${lead.name} → orchestrator`);
  };

  let count = 0, running = 0;
  const task = async () => {
    const tag = `task ${pad(++count)} · `;
    running++;
    await hop(enter, base, 'ink', `${tag}in`);
    await think(orch);
    const team = [...leads].sort(() => Math.random() - 0.5).slice(0, Math.random() < 0.5 ? 2 : 3);
    leads.filter(w => w.fresh && !team.includes(w)).forEach(w => team.push(w));
    team.forEach(w => { w.fresh = false; });
    await Promise.all(team.map((lead, i) => delegate(lead, i * 170, tag)));
    await think(orch);
    await hop(base, leave, orch.ink, `${tag}done`);
    running--;
  };
  // Two tasks may overlap, so the system always has something in flight.
  (async () => {
    await wait(1450);
    for (;;) {
      if (running < 2) task();
      await wait(rand(3200, 4400));
    }
  })();

  // Visitors can add up to three agents of their own; a fourth click moves the oldest.
  const customKinds = [['circle', 'sole', 0], ['square', 'vino', 90], ['triangle', 'cielo', 120]];
  const customs = [];
  const toLocal = event => {
    const box = svg.getBoundingClientRect();
    return { x: (event.clientX - box.left) * (W / box.width), y: (event.clientY - box.top) * (W / box.width) };
  };
  const place = point => {
    const x = clamp(point.x, 24, W - 24), y = clamp(point.y, 24, SHORE - 34);
    const near = nodes.find(n => Math.hypot(anchor(n).x - x, anchor(n).y - y) < n.r + 30 && !(n.kind === 'dome' && y < SHORE - n.r - 20));
    if (near) { bump(near); return; }
    let agent;
    if (customs.length < MAX_CUSTOM) {
      const [kind, ink, turn] = customKinds[customs.length];
      agent = addNode({ name: 'your agent', kind, ink, turn, x, y, r: 20, born: wall });
      agent.scale = 0.7;
      leads.push(agent);
      agents.push(agent);
      const closest = agents.filter(w => w !== agent)
        .sort((p, q) => Math.hypot(p.x - x, p.y - y) - Math.hypot(q.x - x, q.y - y))[0];
      link(orch, agent, wall);
      link(closest, agent, wall + 120);
    } else {
      agent = customs.shift();
      agent.tx = x; agent.ty = y;
    }
    customs.push(agent);
    agent.fresh = true;
    (async () => {
      await wait(260);
      await hop(orch, agent, orch.ink, 'orchestrator → your agent');
      await think(agent);
      await hop(agent, orch, agent.ink, 'your agent → orchestrator');
      bump(orch);
    })();
  };

  let drag = null;
  let press = null;
  function startDrag(event, node) {
    if (drag || event.button > 0) return;
    const p = toLocal(event);
    drag = { node, id: event.pointerId, dx: node.x - p.x, dy: node.y - p.y };
    node.lift = true;
    node.g.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
    wake();
  }
  svg.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const p = toLocal(event), n = drag.node;
    n.x = n.tx = clamp(p.x + drag.dx, n.r + 4, W - n.r - 4);
    if (n.kind !== 'dome') n.y = n.ty = clamp(p.y + drag.dy, n.r + 4, SHORE - n.r - 12);
  });
  const endDrag = event => {
    if (!drag || event.pointerId !== drag.id) return;
    drag.node.lift = false;
    drag = null;
  };
  svg.addEventListener('pointerup', endDrag);
  svg.addEventListener('pointercancel', endDrag);
  hit.addEventListener('pointerdown', event => { press = { x: event.clientX, y: event.clientY }; });
  hit.addEventListener('pointerup', event => {
    if (press && Math.hypot(event.clientX - press.x, event.clientY - press.y) < 8) { place(toLocal(event)); wake(); }
    press = null;
  });

  // Frame loop.
  let paused = false, visible = true, frame = null, last = 0;
  const step = time => {
    const dt = Math.min(0.034, (time - last) / 1000 || 0.016);
    last = time;
    wall += dt * 1000;
    flushTrace();
    if (!paused) {
      clock += dt * 1000;
      for (let i = timers.length - 1; i >= 0; i--) {
        if (timers[i].at <= clock) timers.splice(i, 1)[0].resolve();
      }
    }
    for (const n of nodes) {
      const age = wall - n.born;
      if (age < 0) { n.outer.setAttribute('opacity', 0); continue; }
      n.alpha = Math.min(1, age / 200);
      const rest = n.lift ? 1.07 : 1;
      n.vs += (-260 * (n.scale - rest) - 15 * n.vs) * dt;
      n.scale += n.vs * dt;
      n.vr += (-150 * (n.rot - n.rotTo) - 17 * n.vr) * dt;
      n.rot += n.vr * dt;
      if (!n.lift) { n.x += (n.tx - n.x) * Math.min(1, dt * 9); n.y += (n.ty - n.y) * Math.min(1, dt * 9); }
      n.outer.setAttribute('opacity', n.alpha);
      if (n.kind === 'dome') {
        const rise = (1 - easeOut(Math.min(1, age / 850))) * n.r;
        n.g.setAttribute('transform', `translate(${n.x} ${n.y + rise}) scale(${2 - n.scale} ${n.scale})`);
      } else {
        n.g.setAttribute('transform', `translate(${n.x} ${n.y}) rotate(${n.rot}) scale(${n.scale})`);
      }
    }
    for (const e of edges) {
      const a = anchor(e.a), b = anchor(e.b);
      const k = easeOut(clamp((wall - e.born) / 520, 0, 1));
      e.line.setAttribute('x1', a.x); e.line.setAttribute('y1', a.y);
      e.line.setAttribute('x2', a.x + (b.x - a.x) * k); e.line.setAttribute('y2', a.y + (b.y - a.y) * k);
    }
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (!paused) m.t += (dt * 1000) / m.duration;
      const a = pointOf(m.from), b = pointOf(m.to);
      const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const from = Math.min(0.45, cover(m.from) / length), to = Math.min(0.45, cover(m.to) / length);
      const k = from + (1 - from - to) * easeInOut(Math.min(1, m.t));
      m.dot.setAttribute('cx', a.x + (b.x - a.x) * k);
      m.dot.setAttribute('cy', a.y + (b.y - a.y) * k);
      if (m.t >= 1) { m.dot.remove(); messages.splice(i, 1); m.resolve(); }
    }
    frame = visible ? requestAnimationFrame(step) : null;
  };
  function wake() { if (!frame && visible) { last = performance.now(); frame = requestAnimationFrame(step); } }

  let onScreen = true;
  const refresh = () => { visible = onScreen && !document.hidden; wake(); };
  new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; refresh(); }).observe(host);
  document.addEventListener('visibilitychange', refresh);

  const run = document.querySelector('[data-run]');
  if (run) {
    run.hidden = false;
    const toggle = run.querySelector('button');
    toggle.addEventListener('click', () => {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute('aria-label', paused ? 'Play the animation' : 'Pause the animation');
    });
  }
  host.dataset.live = '';
  wake();
})();
