/* HeyJulia main bundle
   - Custom cursor (5 states)
   - Live ET clock (America/New_York) at 8xl
   - Primary button reflex-sweep tracker (--reflextX)
   - Solution projector (3 cards, tab-switch + scroll-sync)
   - Hero stats odometer
   - Smooth-scroll anchors + nav bg on scroll
   - Respect prefers-reduced-motion */

(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ------------------------------------------------------- */
  /* Custom cursor                                            */
  /* ------------------------------------------------------- */
  const cursor = document.querySelector(".cursor");
  if (cursor && fine) {
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    // state swapping via [data-cursor] attrs
    document.addEventListener("mouseover", (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) document.body.dataset.cursor = el.dataset.cursor || "default";
    });
    document.addEventListener("mouseout", (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) document.body.dataset.cursor = "";
    });
  }

  /* ------------------------------------------------------- */
  /* Reflex-sweep tracker on primary buttons                  */
  /* ------------------------------------------------------- */
  document.querySelectorAll(".btn--primary").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left;
      // map cursor-x → --reflextX (-40 .. r.width + 40)
      btn.style.setProperty("--reflextX", `${x - 40}px`);
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.setProperty("--reflextX", `-40px`);
    });
  });

  /* ------------------------------------------------------- */
  /* Live ET clock                                            */
  /* ------------------------------------------------------- */
  const timeEl = document.querySelector("[data-time]");
  const ampmEl = document.querySelector("[data-ampm]");
  const clockEl = document.getElementById("clock");

  function tickClock() {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const parts = fmt.formatToParts(new Date());
    const h = parts.find(p => p.type === "hour").value;
    const m = parts.find(p => p.type === "minute").value;
    const s = parts.find(p => p.type === "second").value;
    const dp = parts.find(p => p.type === "dayPeriod").value.toUpperCase();
    if (timeEl) timeEl.textContent = `${h}:${m}:${s}`;
    if (ampmEl) ampmEl.textContent = `${dp} · ET`;
    if (clockEl) clockEl.dateTime = `${h}:${m}:${s}`;
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ------------------------------------------------------- */
  /* Solution projector                                       */
  /* ------------------------------------------------------- */
  const cards = Array.from(document.querySelectorAll(".sol-card"));
  const tabs = Array.from(document.querySelectorAll(".solution__nav button"));
  function setCard(i) {
    cards.forEach((c, idx) => {
      c.setAttribute("aria-current", idx === i ? "true" : "false");
      c.style.order = idx === i ? "0" : String(idx + 1);
    });
    tabs.forEach((t, idx) => t.setAttribute("aria-selected", idx === i ? "true" : "false"));
  }
  tabs.forEach((t) => t.addEventListener("click", () => setCard(Number(t.dataset.go))));

  // auto-advance on scroll through the section
  const solution = document.querySelector(".solution");
  if (solution && !reduce) {
    const io = new IntersectionObserver((entries) => {
      // measure position of section relative to viewport to pick active card
      const s = solution.getBoundingClientRect();
      const vh = window.innerHeight;
      if (s.top < vh * 0.5 && s.bottom > vh * 0.5) {
        const localP = (vh * 0.5 - s.top) / s.height;
        const idx = Math.min(cards.length - 1, Math.max(0, Math.floor(localP * cards.length)));
        setCard(idx);
      }
    });
    // use scroll listener instead of IO for smooth sync
    io.disconnect();

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const s = solution.getBoundingClientRect();
        const vh = window.innerHeight;
        if (s.top < vh && s.bottom > 0) {
          const localP = Math.min(1, Math.max(0, (vh * 0.45 - s.top) / (s.height - vh * 0.4)));
          const idx = Math.min(cards.length - 1, Math.floor(localP * cards.length));
          setCard(idx);
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ------------------------------------------------------- */
  /* Hero stats odometer (one-time count-up on view)          */
  /* ------------------------------------------------------- */
  const stats = document.querySelectorAll("[data-odometer]");
  if (stats.length && !reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (!ent.isIntersecting) return;
        const el = ent.target;
        const end = Number(el.dataset.odometer);
        const unit = el.querySelectorAll(".stat__unit");
        const units = Array.from(unit).map(u => u.outerHTML).join("");
        const start = performance.now();
        const DUR = 900;
        const initial = el.textContent;
        function step(t) {
          const k = Math.min(1, (t - start) / DUR);
          const eased = 1 - Math.pow(1 - k, 3);
          const val = Math.round(end * eased);
          el.innerHTML = `${initial.match(/^\D*/)[0] || ""}${val}${units}`;
          if (k < 1) requestAnimationFrame(step); else el.innerHTML = initial; // restore original rich markup
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    stats.forEach(s => io.observe(s));
  }

  /* ------------------------------------------------------- */
  /* How-it-works — rail-progress driven step swap            */
  /* ------------------------------------------------------- */
  const howRail = document.querySelector(".how__rail");
  const howSteps = Array.from(document.querySelectorAll(".how-step"));
  const howDots = Array.from(document.querySelectorAll(".how__progress li"));
  if (howRail && howSteps.length) {
    let activeIdx = -1;
    function setActive(idx) {
      if (idx === activeIdx) return;
      activeIdx = idx;
      howSteps.forEach((s, i) => s.classList.toggle("is-active", i === idx));
      howDots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }
    setActive(0);

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = howRail.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 when rail top hits viewport top, 1 when rail bottom hits viewport bottom
        const total = Math.max(1, r.height - vh);
        const p = Math.max(0, Math.min(1, -r.top / total));
        // map progress to step idx 0..N-1; bias slightly so transitions feel timed
        const idx = Math.min(howSteps.length - 1, Math.floor(p * howSteps.length * 0.999));
        setActive(idx);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------- */
  /* Nav bg dim on scroll                                     */
  /* ------------------------------------------------------- */
  const nav = document.querySelector(".nav__inner");
  window.addEventListener("scroll", () => {
    if (!nav) return;
    const y = window.scrollY;
    if (y > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }, { passive: true });

  /* ------------------------------------------------------- */
  /* Hamburger (mobile open/close nav links)                  */
  /* ------------------------------------------------------- */
  const burger = document.querySelector(".nav__hamburger");
  const links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      links.classList.toggle("is-open", !open);
    });
  }
})();
