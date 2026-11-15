// The home figure: a multi-agent architecture at work. Robots are agents; the other
// shapes are what they use (a router, shared memory, a store, documents, tools).
// Decorative and self-contained: no AI service is called. Without JavaScript or with
// reduced motion the static SVG in templates/graphics/agents.svg stays.
(() => {
  const host = document.querySelector('[data-agents]');
  const svg = host && host.querySelector('svg');
  if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const NS = 'http://www.w3.org/2000/svg';
  const W = 520, SHORE = 440, MAX_CUSTOM = 3;
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

  // A face: eyes that look at whoever the robot is talking to, and blink.
  const face = (n, g, eyeY, mouth) => {
    const r = n.r, dark = n.ink === 'sole' ? 'eye-dark' : 'eye';
    if (n.eyes === 'visor') el('rect', { class: dark, x: -r * 0.64, y: eyeY - r * 0.25, width: r * 1.28, height: r * 0.5 }, g);
    n.eyeY = eyeY;
    n.eyesG = el('g', { transform: `translate(0 ${eyeY})` }, g);
    const pupil = n.eyes === 'visor' ? (n.ink === 'sole' ? 'eye' : 'ink-ink') : dark;
    for (const side of [-1, 1]) {
      if (n.eyes === 'squares') el('rect', { class: pupil, x: side * r * 0.4 - r * 0.17, y: -r * 0.17, width: r * 0.34, height: r * 0.34 }, n.eyesG);
      else el('circle', { class: pupil, cx: side * r * (n.eyes === 'visor' ? 0.3 : 0.4), r: r * (n.eyes === 'visor' ? 0.12 : 0.19) }, n.eyesG);
    }
    if (mouth) el('rect', { class: dark, x: -r * 0.3, y: eyeY + r * mouth, width: r * 0.6, height: r * 0.11 }, g);
  };
  const shapes = {
    dome(n, g) {
      el('path', { d: `M${-n.r} 0a${n.r} ${n.r} 0 0 1 ${n.r * 2} 0z` }, g);
      face(n, g, -n.r * 0.56, 0.3);
    },
    robot(n, g) {
      const r = n.r, half = r * 0.86;
      const top = n.head === 'circle' ? -r : n.head === 'arch' ? -half * 0.1 - r : -half;
      el('line', { class: 'wire', x1: 0, y1: top, x2: 0, y2: top - r * 0.42 }, g);
      el('circle', { class: 'ink-ink', cy: top - r * 0.5, r: r * 0.17 }, g);
      if (n.head === 'circle') el('circle', { r }, g);
      else if (n.head === 'arch') el('path', { d: `M${-r} ${half}V${-half * 0.1}a${r} ${r} 0 0 1 ${r * 2} 0V${half}z` }, g);
      else {
        el('rect', { x: -r * 1.2, y: -r * 0.28, width: r * 2.4, height: r * 0.5 }, g);
        el('rect', { x: -r, y: -half, width: r * 2, height: half * 2 }, g);
      }
      face(n, g, n.head === 'arch' ? -r * 0.22 : -r * 0.12, r > 26 ? 0.46 : 0);
    },
    tool: (n, g) => el('rect', { class: 'outline', x: -n.r, y: -n.r, width: n.r * 2, height: n.r * 2 }, g),
    ring: (n, g) => el('circle', { class: 'outline', r: n.r }, g),
    router: (n, g) => el('path', { d: `M0 ${-n.r}L${n.r} 0 0 ${n.r} ${-n.r} 0z` }, g),
    memory(n, g) {
      const points = [0, 1, 2, 3, 4, 5].map(i => `${(n.r * Math.cos(Math.PI / 3 * i)).toFixed(2)} ${(n.r * Math.sin(Math.PI / 3 * i)).toFixed(2)}`);
      el('path', { d: `M${points.join('L')}z` }, g);
      el('circle', { class: 'ink-ink', r: n.r * 0.26 }, g);
    },
    store(n, g) {
      el('rect', { class: 'eye', x: -18, y: -16, width: 36, height: 32 }, g);
      for (const y of [-16, -4.5, 7]) el('rect', { x: -18, y, width: 36, height: 9 }, g);
    },
    // On the shore: tasks waiting to go in, and the way out.
    queue(n, g) { for (const x of [-25, -8, 9]) el('rect', { x, y: -13, width: 13, height: 13 }, g); },
    exit: (n, g) => el('path', { d: 'M-9 -22 10 -11 -9 0z' }, g),
    docs(n, g) {
      el('rect', { class: 'outline', x: -8, y: -19, width: 25, height: 31 }, g);
      el('rect', { class: 'outline', x: -17, y: -12, width: 25, height: 31 }, g);
      for (const y of [-4, 3.5, 11]) el('line', { class: 'wire', x1: -11.5, y1: y, x2: y > 10 ? -3 : 2.5, y2: y }, g);
    },
  };

  let wall = 0;
  const nodes = [];
  const edges = [];
  const addNode = spec => {
    const node = { scale: 0.82, vs: 0, rot: 0, vr: 0, rotTo: 0, alpha: 0, born: 0, lift: false, tx: spec.x, ty: spec.y,
      lookX: 0, lookY: 0, toX: 0, toY: 0, lookUntil: 0, blinkAt: -1e9, nextBlink: rand(1500, 5000), ...spec };
    node.outer = el('g', node.kind === 'dome' ? { 'clip-path': 'url(#above-shore)' } : {}, nodeLayer);
    node.g = el('g', { class: `node ink-${node.ink || 'ink'}` }, node.outer);
    // Small shapes get a finger-sized target.
    if (node.r < 30) el('circle', { class: 'grip', r: 30 }, node.g);
    shapes[node.kind](node, node.g);
    node.g.addEventListener('pointerdown', event => startDrag(event, node));
    nodes.push(node);
    return node;
  };
  const link = (a, b, delay) => edges.push({ a, b, born: delay, line: el('line', {}, edgeLayer) });
  const anchor = n => (n.kind === 'dome' ? { x: n.x, y: n.y - n.r * 0.42 } : n);
  const onShore = n => n.kind === 'dome' || n.rail;
  const pointOf = n => (n.point ? n.point() : anchor(n));
  // Messages travel the visible part of a line: they leave from under one shape and slip under the next.
  const cover = n => (n.point ? n.cover || 0 : n.rail ? 0 : n.r * (n.kind === 'dome' ? 0.5 : 0.72));

  const orch = addNode({ name: 'orchestrator', kind: 'dome', x: 260, y: SHORE, r: 96, ink: 'vino', born: 0 });
  const router = addNode({ name: 'router', kind: 'router', x: 260, y: 300, r: 14, turn: 90, born: 220 });
  const pine = addNode({ name: 'pine robot', kind: 'robot', head: 'square', eyes: 'dots', x: 88, y: 262, r: 34, ink: 'pino', born: 300 });
  const cobalt = addNode({ name: 'cobalt robot', kind: 'robot', head: 'circle', eyes: 'dots', x: 260, y: 200, r: 34, ink: 'cielo', born: 380 });
  const sun = addNode({ name: 'sun robot', kind: 'robot', head: 'arch', eyes: 'squares', x: 432, y: 260, r: 34, ink: 'sole', born: 470 });
  const wine = addNode({ name: 'small wine robot', kind: 'robot', head: 'circle', eyes: 'visor', x: 168, y: 100, r: 24, ink: 'vino', born: 590 });
  const leaf = addNode({ name: 'small pine robot', kind: 'robot', head: 'square', eyes: 'squares', x: 354, y: 104, r: 24, ink: 'pino', born: 660 });
  const memory = addNode({ name: 'memory', kind: 'memory', x: 262, y: 42, r: 22, ink: 'sole', turn: 60, born: 760 });
  const toolA = addNode({ name: 'tool', kind: 'tool', x: 28, y: 156, r: 10, turn: 90, born: 820 });
  const toolB = addNode({ name: 'tool', kind: 'ring', x: 34, y: 366, r: 11, born: 870 });
  const store = addNode({ name: 'store', kind: 'store', x: 492, y: 150, r: 18, ink: 'cielo', born: 920 });
  const docs = addNode({ name: 'documents', kind: 'docs', x: 486, y: 366, r: 18, born: 970 });
  const toolC = addNode({ name: 'tool', kind: 'ring', x: 62, y: 40, r: 11, born: 1020 });
  const toolD = addNode({ name: 'tool', kind: 'tool', x: 462, y: 44, r: 10, turn: 90, born: 1060 });
  const queue = addNode({ name: 'queue', kind: 'queue', rail: true, x: 96, y: SHORE, r: 25, ink: 'cielo', born: 1120 });
  const exit = addNode({ name: 'exit', kind: 'exit', rail: true, x: 428, y: SHORE, r: 12, ink: 'pino', born: 1180 });
  pine.uses = [toolA, toolB];
  sun.uses = [store, docs];
  wine.uses = [memory, toolC];
  leaf.uses = [memory, toolD];
  // Leads take work from the orchestrator through the router; every robot can talk to its neighbours.
  const leads = [pine, cobalt, sun];
  const robots = [pine, cobalt, sun, wine, leaf];
  [[orch, router, 420], [router, pine, 520], [router, cobalt, 560], [router, sun, 620], [pine, cobalt, 700], [cobalt, sun, 750],
    [cobalt, wine, 800], [cobalt, leaf, 850], [pine, wine, 900], [sun, leaf, 950], [wine, leaf, 1000], [wine, memory, 1050],
    [leaf, memory, 1090], [pine, toolA, 1130], [pine, toolB, 1160], [sun, store, 1190], [sun, docs, 1220], [wine, toolC, 1250],
    [leaf, toolD, 1280]].forEach(([a, b, delay]) => link(a, b, delay));

  // Simulation clock: stops when paused, hidden or off-screen, so nothing piles up.
  let clock = 0;
  const timers = [];
  const messages = [];
  const wait = ms => new Promise(resolve => timers.push({ at: clock + ms, resolve }));
  const trace = document.querySelector('[data-trace]');
  const pad = n => String(n).padStart(2, '0');
  // The readout holds each line long enough to read; when hops outrun it, it skips to the latest.
  let shownAt = -1e9, pending = null;
  const say = text => { if (text) pending = text; };
  const flushTrace = () => {
    if (!trace || pending === null || wall - shownAt < 650) return;
    trace.textContent = pending;
    pending = null;
    shownAt = wall;
  };

  const bump = node => { node.vs += 1.4 + 40 / node.r; };
  const react = node => {
    bump(node);
    if (node.turn) node.rotTo += node.turn;
    else if (node.eyesG && node.kind !== 'dome') node.vr += (Math.random() < 0.5 ? -1 : 1) * 80;
    node.blinkAt = wall;
  };
  const think = async node => { react(node); await wait(rand(280, 480)); };
  const lookAt = (node, other) => {
    if (!node.eyesG || !other.x) return;
    const dx = other.x - node.x, dy = anchor(other).y - anchor(node).y, d = Math.hypot(dx, dy) || 1;
    node.toX = dx / d; node.toY = dy / d; node.lookUntil = wall + 1100;
  };
  const hop = (from, to, ink, label) => new Promise(resolve => {
    const a = pointOf(from), b = pointOf(to);
    const length = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    const start = Math.min(0.45, cover(from) / length);
    say(label);
    lookAt(from, to); lookAt(to, from);
    messages.push({ from, to, t: 0, duration: clamp((length - cover(from) - cover(to)) * 4.2, 340, 1700), resolve,
      dot: el('circle', { class: 'ink-' + ink, r: 6.5, cx: a.x + (b.x - a.x) * start, cy: a.y + (b.y - a.y) * start }, dotLayer) });
  });

  const edgePoint = side => ({ point: () => {
    const box = svg.getBoundingClientRect();
    const unit = W / box.width;
    return { x: side < 0 ? -box.left * unit - 12 : (innerWidth - box.left) * unit + 12, y: SHORE };
  } });
  const enter = edgePoint(-1), leave = edgePoint(1);
  const base = { cover: 70, point: () => ({ x: orch.x, y: SHORE }) };
  const neighbours = node => edges.filter(e => e.a === node || e.b === node)
    .map(e => (e.a === node ? e.b : e.a)).filter(n => robots.includes(n));
  const consult = async (agent, tag) => {
    const thing = pick(agent.uses);
    await hop(agent, thing, agent.ink, `${tag}${agent.name} → ${thing.name}`);
    await think(thing);
    await hop(thing, agent, thing.ink || 'ink', `${tag}${thing.name} → ${agent.name}`);
    await think(agent);
  };

  const delegate = async (lead, delay, tag) => {
    await wait(delay);
    await hop(orch, router, orch.ink, `${tag}orchestrator → ${lead.name}`);
    react(router);
    await hop(router, lead, orch.ink);
    await think(lead);
    const peers = neighbours(lead);
    for (let round = Math.random() < 0.35 ? 2 : 1; peers.length && round > 0; round--) {
      const peer = pick(peers);
      await hop(lead, peer, lead.ink, `${tag}${lead.name} → ${peer.name}`);
      await think(peer);
      if (peer.uses && Math.random() < 0.65) await consult(peer, tag);
      await hop(peer, lead, peer.ink, `${tag}${peer.name} → ${lead.name}`);
      await think(lead);
    }
    if (lead.uses && Math.random() < 0.7) await consult(lead, tag);
    await hop(lead, router, lead.ink, `${tag}${lead.name} → orchestrator`);
    react(router);
    await hop(router, orch, lead.ink);
  };

  let count = 0, running = 0;
  const task = async () => {
    const tag = `task ${pad(++count)} · `;
    running++;
    await hop(enter, queue, 'ink', `${tag}in`);
    react(queue);
    await hop(queue, base, 'ink');
    await think(orch);
    const team = [...leads].sort(() => Math.random() - 0.5).slice(0, Math.random() < 0.5 ? 2 : 3);
    leads.filter(w => w.fresh && !team.includes(w)).forEach(w => team.push(w));
    team.forEach(w => { w.fresh = false; });
    await Promise.all(team.map((lead, i) => delegate(lead, i * 190, tag)));
    await think(orch);
    await hop(base, exit, orch.ink, `${tag}done`);
    react(exit);
    await hop(exit, leave, orch.ink);
    running--;
  };
  // Two tasks may overlap, so the system always has something in flight.
  (async () => {
    await wait(1600);
    for (;;) {
      if (running < 2) task();
      await wait(rand(3200, 4400));
    }
  })();

  // Visitors can add up to three robots of their own; a fourth press moves the oldest.
  const customKinds = [['circle', 'dots', 'sole'], ['square', 'visor', 'cielo'], ['arch', 'dots', 'vino']];
  const customs = [];
  const toLocal = event => {
    const box = svg.getBoundingClientRect();
    return { x: (event.clientX - box.left) * (W / box.width), y: (event.clientY - box.top) * (W / box.width) };
  };
  const place = point => {
    const x = clamp(point.x, 26, W - 26), y = clamp(point.y, 34, SHORE - 34);
    const near = nodes.find(n => Math.hypot(anchor(n).x - x, anchor(n).y - y) < n.r + 30 && !(n.kind === 'dome' && y < SHORE - n.r - 20));
    if (near) { react(near); return; }
    let agent;
    if (customs.length < MAX_CUSTOM) {
      const [head, eyes, ink] = customKinds[customs.length];
      agent = addNode({ name: 'your robot', kind: 'robot', head, eyes, ink, x, y, r: 19, born: wall });
      agent.scale = 0.7;
      const closest = robots.slice().sort((p, q) => Math.hypot(p.x - x, p.y - y) - Math.hypot(q.x - x, q.y - y))[0];
      leads.push(agent);
      robots.push(agent);
      link(router, agent, wall);
      link(closest, agent, wall + 120);
    } else {
      agent = customs.shift();
      agent.tx = x; agent.ty = y;
    }
    customs.push(agent);
    agent.fresh = true;
    (async () => {
      await wait(260);
      await hop(orch, router, orch.ink, 'orchestrator → your robot');
      react(router);
      await hop(router, agent, orch.ink);
      await think(agent);
      await hop(agent, router, agent.ink, 'your robot → orchestrator');
      react(router);
      await hop(router, orch, agent.ink);
      react(orch);
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
    if (!onShore(n)) n.y = n.ty = clamp(p.y + drag.dy, n.r + 14, SHORE - n.r - 12);
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
      if (n.eyesG) {
        if (!paused && wall > n.nextBlink) { n.blinkAt = wall; n.nextBlink = wall + rand(2200, 6000); }
        const looking = wall < n.lookUntil ? 1 : 0, ease = Math.min(1, dt * 10);
        n.lookX += (n.toX * looking - n.lookX) * ease;
        n.lookY += (n.toY * looking - n.lookY) * ease;
        const b = (wall - n.blinkAt) / 150, lid = b < 1 ? 0.12 + 0.88 * Math.abs(1 - 2 * b) : 1;
        n.eyesG.setAttribute('transform', `translate(${n.lookX * n.r * 0.1} ${n.eyeY + n.lookY * n.r * 0.08}) scale(1 ${lid})`);
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
