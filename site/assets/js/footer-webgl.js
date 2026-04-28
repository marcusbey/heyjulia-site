/* HeyJulia footer WebGL — periwinkle dot-matrix shader.
   Performance budget:
   - mediump precision, antialias off (fullscreen shader needs none)
   - DPR capped at 1.5 desktop / 1 mobile
   - rAF gated by IntersectionObserver + Page Visibility API
   - pointermove throttled to one update per frame
   - resize debounced via rAF
   - graceful no-op if Three or WebGL unavailable */
(() => {
  if (typeof THREE === "undefined") return;
  const canvas = document.getElementById("webgl-canvas");
  if (!canvas) return;

  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      depth: false,
      stencil: false,
    });
  } catch (e) { return; }

  const DPR_CAP = isMobile ? 1 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_CAP));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);

  const uniforms = {
    u_time:       { value: 0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_pointer:    { value: new THREE.Vector2(0.5, 0.5) },
    u_density:    { value: isMobile ? 26.0 : 38.0 },
  };

  const material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms,
    vertexShader: /* glsl */`
      void main() { gl_Position = vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */`
      precision mediump float;
      uniform float u_time;
      uniform vec2  u_resolution;
      uniform vec2  u_pointer;
      uniform float u_density;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0,0.0));
        float c = hash(i + vec2(0.0,1.0));
        float d = hash(i + vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv - 0.5;
        float aspect = u_resolution.x / u_resolution.y;
        p.x *= aspect;

        vec2 toP = (u_pointer - 0.5);
        toP.x *= aspect;
        float drift = exp(-length(p - toP) * 2.5) * 0.06;

        float t = u_time * 0.18;
        vec2 wp = p + vec2(
          sin(p.y * 2.4 + t) * 0.05,
          cos(p.x * 2.0 - t * 0.8) * 0.04
        );
        wp += drift * normalize(p - toP + 1e-4);

        vec2 grid = wp * u_density;
        vec2 gi = floor(grid);
        vec2 gf = fract(grid) - 0.5;

        float n = noise(gi * 0.35 + t * 0.4);
        float radius = 0.10 + 0.18 * n;

        float d = length(gf);
        float dot = smoothstep(radius, radius - 0.08, d);

        float depth = 1.0 - smoothstep(0.0, 0.95, length(p) * 1.05);
        float keep = step(0.45, n);
        dot *= keep;

        vec3 night    = vec3(0.039, 0.039, 0.055);
        vec3 dotCol   = vec3(1.000, 0.537, 0.012);
        vec3 accentA  = vec3(1.000, 0.420, 0.000);
        vec3 accentB  = vec3(0.243, 0.247, 0.494);

        float accT = smoothstep(0.55, 0.95, n);
        vec3 dotMix = mix(dotCol, mix(accentA, accentB, fract(t * 0.3 + uv.x)), accT * 0.45);

        float warm = smoothstep(0.0, 1.0, uv.x * 0.5 + uv.y * 0.5);
        vec3 base = mix(night, night + accentB * 0.18, warm);

        vec3 col = mix(base, dotMix, dot * depth * 0.95);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  scene.add(new THREE.Mesh(geometry, material));

  let needsResize = true;
  function scheduleResize() { needsResize = true; }
  function applyResize() {
    if (!needsResize) return;
    needsResize = false;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    renderer.setSize(w, h, false);
    uniforms.u_resolution.value.set(w, h);
  }

  let pendingPointer = null;
  function onPointer(e) {
    pendingPointer = e;
  }
  function applyPointer() {
    if (!pendingPointer) return;
    const e = pendingPointer; pendingPointer = null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    uniforms.u_pointer.value.set(
      (e.clientX - rect.left) / rect.width,
      1 - (e.clientY - rect.top) / rect.height
    );
  }

  // gate rendering: must be in viewport AND tab visible AND user hasn't requested reduced motion-stop
  let inView = true;
  let pageVisible = !document.hidden;
  let rafId = 0;
  let last = performance.now();

  function shouldRun() {
    return inView && pageVisible;
  }

  function tick(now) {
    rafId = 0;
    if (!shouldRun()) return;
    applyResize();
    applyPointer();
    const dt = (now - last) / 1000;
    last = now;
    if (!prefersReduce) uniforms.u_time.value += Math.min(dt, 0.05);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId || !shouldRun()) return;
    last = performance.now();
    rafId = requestAnimationFrame(tick);
  }
  function stop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  // viewport gate
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      if (inView) start(); else stop();
    }, { rootMargin: "200px 0px" });
    io.observe(canvas);
  }

  // visibility gate
  document.addEventListener("visibilitychange", () => {
    pageVisible = !document.hidden;
    if (pageVisible) start(); else stop();
  });

  // resize gate (debounced via rAF flag)
  window.addEventListener("resize", scheduleResize, { passive: true });

  // pointer (passive, no work in handler — applied per-frame)
  window.addEventListener("pointermove", onPointer, { passive: true });

  // init: render one frame even if observer hasn't fired yet
  applyResize();
  renderer.render(scene, camera);
  start();
})();
