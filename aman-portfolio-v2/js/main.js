(() => {
  "use strict";
  const root = document.documentElement;
  const { email, github, linkedin, resume, roles } = window.SITE;
  const { PROJECTS, SKILLS, JOURNEY, EDUCATION } = window;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const ul = (a) => `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

  /* ============ RENDER: projects ============ */
  function details(p) {
    const feats = p.features.length ? ul(p.features) : `<p class="none">Feature list will be added as the project is documented.</p>`;
    const stack = p.stack.length ? `<div class="chips">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>` : `<p class="none">Stack details coming soon.</p>`;
    return `<div class="details"><div class="inner">
      <div><h4>Problem</h4><p>${esc(p.problem)}</p></div>
      <div><h4>Solution</h4><p>${esc(p.solution)}</p></div>
      <div><h4>Key features</h4>${feats}</div>
      <div><h4>Tech stack</h4>${stack}</div></div></div>`;
  }
  const linksHtml = (p) => {
    const l = p.links || {}, out = [];
    if (l.github) out.push(`<a class="btn sm ghost mag" href="${esc(l.github)}" target="_blank" rel="noopener"><span>GitHub</span><em>↗</em></a>`);
    if (l.demo) out.push(`<a class="btn sm mag" href="${esc(l.demo)}" target="_blank" rel="noopener"><span>Visit live site</span><em>↗</em></a>`);
    return out.length ? `<div class="links">${out.join("")}</div>` : "";
  };
  const statusHtml = (p) => `<span class="status ${esc(p.statusType)}">${esc(p.status)}</span>`;

  function compactCard(p, k) {
    const el = document.createElement("article");
    el.className = `card glass tilt${p.live ? " live-card" : ""}`;
    el.style.setProperty("--k", k);
    el.innerHTML = `${statusHtml(p)}<div><h3>${esc(p.name)}</h3><p class="kind">${esc(p.kind)}</p></div>
      <p class="desc">${esc(p.description)}</p>
      <button class="toggle" aria-expanded="false">Show details +</button>${details(p)}${linksHtml(p)}`;
    const t = $(".toggle", el);
    t.addEventListener("click", () => {
      const open = el.classList.toggle("open");
      t.setAttribute("aria-expanded", open);
      t.textContent = open ? "Hide details −" : "Show details +";
    });
    return el;
  }
  function flagshipCard(p) {
    const visual = p.image
      ? `<div class="phone"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" width="540" height="1200" loading="lazy"></div>`
      : `<div class="orb" role="img" aria-label="${esc(p.name)} tagline">${esc(p.tagline)}</div>`;
    const el = document.createElement("article");
    el.className = "flag glass reveal";
    el.innerHTML = `<div class="body">${statusHtml(p)}<p class="kind">${esc(p.kind)}</p><h3>${esc(p.name)}</h3>
      <p class="tagline">${esc(p.tagline)}</p><p class="desc">${esc(p.description)}</p>${details(p)}${linksHtml(p)}</div>
      <div class="visual">${visual}</div>`;
    return el;
  }
  function liveCard(p, i) {
    const el = document.createElement("article");
    el.className = "card glass live-card tilt reveal";
    el.style.setProperty("--d", `${i * 90}ms`);
    el.innerHTML = `${statusHtml(p)}<div><h3>${esc(p.name)}</h3><p class="kind">${esc(p.kind)}</p></div>
      <p class="tagline">${esc(p.tagline)}</p><p class="desc">${esc(p.description)}</p>${details(p)}${linksHtml(p)}`;
    return el;
  }
  const fill = (sel, nodes) => { const c = $(sel); nodes.forEach((n) => c.appendChild(n)); };
  fill("#featured-list", PROJECTS.filter((p) => p.flagship).map(flagshipCard));
  fill("#live-list", PROJECTS.filter((p) => p.live).map(liveCard));

  /* skills */
  const usedIn = (s) => PROJECTS.filter((p) => p.stack.includes(s)).map((p) => p.name);
  $("#skills-grid").innerHTML = SKILLS.map((g, i) => `<div class="sk glass tilt reveal" style="--d:${i * 80}ms"><h3>${esc(g.group)}</h3><div class="chips">${g.items.map((s) => {
    const u = usedIn(s);
    return `<span class="chip${u.length ? " used" : ""}"${u.length ? ` title="Used in: ${esc(u.join(", "))}"` : ""}>${esc(s)}</span>`;
  }).join("")}</div></div>`).join("");

  /* marquee content (all derived from data) */
  const allSkills = [...new Set(SKILLS.flatMap((g) => g.items))];
  const mqHtml = (arr) => arr.map((x) => `<span class="item">${esc(x)}</span>`).join("");
  const half = (arr, n) => arr.filter((_, i) => i % 2 === n);
  const dup = (h) => h + h; // doubled so the loop is seamless
  $("#strip-track").innerHTML = dup(mqHtml(["Software Developer", "Full-Stack", "AI Builder", "Product Builder", "Flutter", "Next.js", "FastAPI", "Firebase"]));
  $("#mq1").innerHTML = dup(mqHtml(half(allSkills, 0)));
  $("#mq2").innerHTML = dup(mqHtml(half(allSkills, 1)));

  /* filters */
  const FILTERS = [["all", "All"], ["personal", "Personal"], ["live", "Live"], ["web", "Web"], ["mobile", "Mobile"], ["ai", "AI"], ["fullstack", "Full-Stack"]];
  const fWrap = $("#filters"), grid = $("#grid"), count = $("#count");
  fWrap.innerHTML = FILTERS.map(([k, l]) => `<button class="fbtn mag" data-f="${k}" aria-pressed="false">${l}</button>`).join("");
  function applyFilter(f) {
    $$(".fbtn", fWrap).forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === f));
    const list = PROJECTS.filter((p) => f === "all" || p.tags.includes(f));
    grid.replaceChildren(...list.map((p, i) => compactCard(p, i)));
    count.textContent = `Showing ${list.length} of ${PROJECTS.length} projects · ${FILTERS.find((x) => x[0] === f)[1]}`;
  }
  fWrap.addEventListener("click", (e) => { const b = e.target.closest(".fbtn"); if (b) applyFilter(b.dataset.f); });
  applyFilter("personal");

  /* journey + education */
  const tl = $("#timeline");
  JOURNEY.forEach((j) => {
    const li = document.createElement("li");
    li.className = "glass reveal";
    li.innerHTML = `<span class="nd"></span><h3>${esc(j.t)}</h3><p>${esc(j.d)}</p>`;
    tl.appendChild(li);
  });
  $("#edu").innerHTML = EDUCATION.map((e, i) => `<div class="edu glass tilt reveal" style="--d:${i * 100}ms"><h3>${esc(e.t)}</h3><p>${esc(e.s)}</p>${e.n ? `<p class="n">${esc(e.n)}</p>` : ""}</div>`).join("");

  /* stats (derived from data, nothing invented) */
  const stats = [[PROJECTS.length, "Projects built"], [PROJECTS.filter((p) => p.live).length, "Live college projects"], [allSkills.length, "Technologies"]];
  $("#stats").innerHTML = stats.map(([n, l]) => `<li><b data-count="${n}">0</b><span>${l}</span></li>`).join("");

  /* links */
  ["#gh-hero", "#gh-main"].forEach((s) => ($(s).href = github));
  $("#gh-gut").href = PROJECTS.find((p) => p.id === "grab-ur-ticket").links.github;
  const mail = $("#mail");
  mail.href = `mailto:${email}`; mail.textContent = email;
  const toast = $("#toast");
  let tt;
  const say = (m) => { toast.textContent = m; toast.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("show"), 2400); };
  $("#contact-cta").innerHTML = `<a class="btn mag" href="mailto:${esc(email)}"><span>Email me</span><em>→</em></a><button class="btn ghost mag" id="copy"><span>Copy email</span></button><a class="btn ghost mag" href="${esc(github)}" target="_blank" rel="noopener"><span>GitHub</span></a>`
    + (linkedin ? `<a class="btn ghost mag" href="${esc(linkedin)}" target="_blank" rel="noopener"><span>LinkedIn</span></a>` : "");
  $("#copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(email); say("Email copied ✓"); } catch { say(email); }
  });
  $$("[data-resume]").forEach((a) => {
    if (resume) { a.href = resume; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("download", ""); return; }
    a.classList.add("off");
    a.title = "Resume file not added yet";
    a.addEventListener("click", () => {
      $("#resume-note").textContent = "Resume coming soon: add your PDF to /assets and set SITE.resume in js/data.js.";
      say("Resume coming soon");
    });
  });
  $("#yr").textContent = new Date().getFullYear();

  /* ============ HERO: split letters ============ */
  let li = 0;
  $$("[data-split]").forEach((el) => {
    el.innerHTML = [...el.dataset.split].map((ch) => `<span class="ch" aria-hidden="true" style="--i:${li++}">${ch}</span>`).join("");
  });

  /* ============ TEXT SCRAMBLE ============ */
  const GL = "!<>-_\\/[]{}=+*^?#ABCDEFGHJKLMNOPQRSTUVWXYZ";
  function scramble(el, final, dur = 700) {
    if (reduce) { el.textContent = final; return; }
    const start = performance.now(), len = final.length;
    (function step(now) {
      const t = Math.min(1, (now - start) / dur);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = final[i];
        if (ch === " " || i < t * len * 1.15 - 2) out += ch;
        else out += GL[(Math.random() * GL.length) | 0];
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(step); else el.textContent = final;
    })(start);
  }
  $$("[data-scramble]").forEach((el) => { el.dataset.final = el.textContent; });

  /* ============ REVEAL + COUNTERS + SCRAMBLE ON VIEW ============ */
  function countUp(el) {
    const to = +el.dataset.count;
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), d = 1400;
    (function f(now) {
      const t = Math.min(1, (now - t0) / d);
      el.textContent = Math.round(to * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(f);
    })(t0);
  }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    const s = $("[data-scramble]", el);
    if (s) scramble(s, s.dataset.final, 800);
    io.unobserve(el);
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
  const cio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { $$("[data-count]", e.target).forEach(countUp); cio.disconnect(); } }), { threshold: 0.4 });
  cio.observe($("#stats"));

  /* ============ ROLE: scramble-swap ============ */
  const roleEl = $("#role");
  roleEl.textContent = roles[0];
  if (!reduce) {
    let r = 0;
    setInterval(() => { r = (r + 1) % roles.length; scramble(roleEl, roles[r], 650); }, 2600);
  }

  /* ============ THEME (circular reveal) ============ */
  const themeBtn = $("#theme");
  const setTheme = (t) => {
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch {}
    $('meta[name="theme-color"]').content = t === "light" ? "#faf8f4" : "#0e0f12";
    readColors();
  };
  themeBtn.addEventListener("click", (e) => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (!document.startViewTransition || reduce) return setTheme(next);
    const x = e.clientX, y = e.clientY, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => setTheme(next));
    vt.ready.then(() => root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 750, easing: "cubic-bezier(.2,.8,.2,1)", pseudoElement: "::view-transition-new(root)" }));
  });

  /* ============ NAV / BURGER / PROGRESS / ACTIVE LINK ============ */
  const nav = $("#nav"), burger = $("#burger"), menu = $("#menu"), prog = $("#progress");
  const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
  burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  const links = $$("a[href^='#']", menu);
  const secs = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const fillEl = $("#tl-fill");
  const tlItems = $$("li", tl);
  let lastY = scrollY, vel = 0;
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("stuck", y > 20);
    vel = y - lastY; lastY = y;
    let cur = null;
    secs.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id; });
    links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
    // timeline progress
    const r = tl.getBoundingClientRect(), line = innerHeight * 0.6;
    fillEl.style.height = Math.max(0, Math.min(r.height, line - r.top)) + "px";
    tlItems.forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < line));
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ============ SPOTLIGHT + TILT + MAGNETIC ============ */
  let cx = innerWidth / 2, cy = innerHeight / 2;
  document.addEventListener("pointermove", (e) => {
    cx = e.clientX; cy = e.clientY;
    const g = e.target.closest && e.target.closest(".glass");
    if (g) { const r = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - r.left + "px"); g.style.setProperty("--my", e.clientY - r.top + "px"); }
    if (!fine || reduce) return;
    const t = e.target.closest && e.target.closest(".tilt");
    if (t && !t.classList.contains("flag")) {
      const r = t.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      t.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateZ(0)`;
      t._on = true;
    }
    const m = e.target.closest && e.target.closest(".mag");
    if (m) {
      const r = m.getBoundingClientRect();
      m.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * 0.28).toFixed(1)}px,${((e.clientY - (r.top + r.height / 2)) * 0.35).toFixed(1)}px)`;
      m._on = true;
    }
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest && e.target.closest(".tilt,.mag");
    if (el && el._on && !el.contains(e.relatedTarget)) { el.style.transform = ""; el._on = false; }
  });

  /* ============ CUSTOM CURSOR ============ */
  if (fine && !reduce) {
    root.classList.add("cur");
    const cur = $("#cursor"), dot = $(".c-dot", cur), ring = $(".c-ring", cur);
    let rx = cx, ry = cy;
    (function loop() {
      rx = lerp(rx, cx, 0.16); ry = lerp(ry, cy, 0.16);
      dot.style.transform = `translate(${cx}px,${cy}px)`;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => cur.classList.toggle("hot", !!(e.target.closest && e.target.closest("a,button,.chip,.tilt"))));
    document.addEventListener("pointerdown", () => cur.classList.add("down"));
    document.addEventListener("pointerup", () => cur.classList.remove("down"));
  }

  /* ============ MARQUEES (speed reacts to scroll) ============ */
  const rows = $$(".mq").map((el) => ({ el, tr: $(".mq-track", el), dir: +el.dataset.dir, sp: +el.dataset.speed, x: 0, w: 0 }));
  const measure = () => rows.forEach((r) => { r.w = r.tr.scrollWidth / 2; });
  measure(); addEventListener("resize", measure);
  if (document.fonts) document.fonts.ready.then(measure);
  let sv = 0;
  if (!reduce) (function mq() {
    sv = lerp(sv, vel, 0.08); vel *= 0.9;
    rows.forEach((r) => {
      if (!r.w) return;
      r.x -= r.dir * (r.sp + Math.abs(sv) * 0.35);
      if (r.x <= -r.w) r.x += r.w;
      if (r.x > 0) r.x -= r.w;
      r.tr.style.transform = `translate3d(${r.x}px,0,0)`;
    });
    requestAnimationFrame(mq);
  })();

  /* ============ CANVAS: code-symbol field that dodges the cursor ============ */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, parts = [], col = "#f2b84b", col2 = "#e9835a";
  function readColors() { const s = getComputedStyle(root); col = s.getPropertyValue("--a").trim(); col2 = s.getPropertyValue("--b").trim(); }
  readColors();
  const SYM = ["{", "}", "</>", "()", "=>", "[]", ";", "0", "1", "#", "*", "&&", "//", "fn", "<>"];
  function sizeCanvas() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(70, (W * H) / 34000));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H, vx: 0, vy: -(0.1 + Math.random() * 0.35),
      s: 12 + Math.random() * 22, t: SYM[(Math.random() * SYM.length) | 0], a: 0.04 + Math.random() * 0.08, k: Math.random() < 0.25,
    }));
  }
  sizeCanvas(); addEventListener("resize", sizeCanvas);
  if (!reduce) (function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      const dx = p.x - cx, dy = p.y - cy, d2 = dx * dx + dy * dy;
      if (d2 < 22000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 148) * 1.6; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
      p.vx *= 0.94; p.vy = lerp(p.vy, -0.25, 0.02);
      p.x += p.vx; p.y += p.vy;
      if (p.y < -30) { p.y = H + 30; p.x = Math.random() * W; }
      if (p.x < -40) p.x = W + 40; if (p.x > W + 40) p.x = -40;
      ctx.globalAlpha = p.a + (d2 < 22000 ? 0.25 : 0);
      ctx.fillStyle = p.k ? col2 : col;
      ctx.font = `600 ${p.s}px "JetBrains Mono",monospace`;
      ctx.fillText(p.t, p.x, p.y);
    }
    requestAnimationFrame(draw);
  })();

  /* fit the giant footer name to the viewport whatever font loads */
  const giant = $(".giant");
  const fitGiant = () => { giant.style.fontSize = "100px"; giant.style.display = "inline-block"; const w = giant.scrollWidth; giant.style.display = ""; giant.style.fontSize = Math.min(300, (100 * (innerWidth - 24)) / w) + "px"; };
  fitGiant(); addEventListener("resize", fitGiant); if (document.fonts) document.fonts.ready.then(fitGiant);

  /* ============ PRELOADER ============ */
  const preNum = $("#pre-num"), preBar = $("#pre-bar"), preLine = $("#pre-line");
  const msgs = ["> booting aman.dev ...", "> loading projects ...", "> compiling skills ...", "> ready."];
  let done = false;
  function finish() { if (done) return; done = true; document.body.classList.add("loaded"); setTimeout(() => $("#pre").remove(), 1400); }
  if (reduce) finish();
  else {
    const t0 = performance.now(), D = 1500;
    (function p(now) {
      const t = Math.min(1, (now - t0) / D), v = Math.round(100 * (1 - Math.pow(1 - t, 2.2)));
      preNum.textContent = v; preBar.style.width = v + "%";
      preLine.textContent = msgs[Math.min(msgs.length - 1, Math.floor(t * msgs.length))];
      if (t < 1) requestAnimationFrame(p); else setTimeout(finish, 250);
    })(t0);
    setTimeout(finish, 4000); // failsafe
  }

  /* ============ EASTER EGG: Konami = party mode ============ */
  const K = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let ki = 0;
  addEventListener("keydown", (e) => {
    ki = e.key === K[ki] ? ki + 1 : (e.key === K[0] ? 1 : 0);
    if (ki === K.length) { ki = 0; const on = root.classList.toggle("party"); say(on ? "🎮 Party mode unlocked" : "Party mode off"); }
  });
})();
