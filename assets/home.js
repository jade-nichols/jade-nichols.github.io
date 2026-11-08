// Behavior for the home and Sketching pages: the About crossfade (driven by the
// #about URL), the Projects dropdown (remembered, so returning from a project
// reopens it), and the animated move between home and /sketching/.
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('projects-toggle');
  var back = document.querySelector('.sk-back');
  var KEY = 'projects-open';

  function remember(open) {
    try { sessionStorage.setItem(KEY, open ? '1' : '0'); } catch (e) {}
  }

  function remembered() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  // "Sketching" with the down arrow glides down to the first page of sketches,
  // a little slower than the browser's own smooth scroll.
  var SCROLL_MS = 1100;
  document.querySelector('.sk-title').addEventListener('click', function (event) {
    var target = document.getElementById('sketch-1');
    if (!target) return;
    event.preventDefault();
    history.replaceState(history.state, '', '#sketch-1');
    var start = window.scrollY;
    var distance = target.getBoundingClientRect().top - parseFloat(getComputedStyle(target).scrollMarginTop || 0);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: start + distance, behavior: 'instant' });
      return;
    }
    var began = performance.now();
    function step(now) {
      var p = Math.min(1, (now - began) / SCROLL_MS);
      var eased = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  // Opened directly at /sketching/: Back is an ordinary link to home, which
  // should show the sketch with the project list closed.
  if (!toggle) {
    back.addEventListener('click', function () { remember(false); });
    return;
  }

  var link = document.getElementById('sketching-link');
  var title = document.querySelector('.sk-title');
  var word = document.querySelector('.sk-word');
  var homePath = location.pathname;
  var sketchingPath = new URL(link.href).pathname;
  var moveTimer;
  var pages = null;   // the sketches, fetched from /sketching/ ahead of time
  var fetched;

  back.href = homePath;

  function setProjects(open) {
    root.classList.toggle('projects-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  function syncAbout() {
    root.classList.toggle('about-open', location.hash === '#about');
  }

  toggle.addEventListener('click', function () {
    var open = !root.classList.contains('projects-open');
    setProjects(open);
    remember(open);
  });

  // The name returns to the sketch: drop #about without reloading the page.
  document.getElementById('home-link').addEventListener('click', function (event) {
    event.preventDefault();
    if (location.hash) {
      history.pushState(null, '', location.pathname + location.search);
    }
    syncAbout();
    window.scrollTo(0, 0);
  });

  // Vertical middle and left edge of an element, on screen.
  function spot(element) {
    var r = element.getBoundingClientRect();
    return { x: r.left, y: r.top + r.height / 2 };
  }

  function finishMove() {
    clearTimeout(moveTimer);
    moveTimer = setTimeout(function () {
      root.classList.remove('sk-moving');
      if (!root.classList.contains('sketching')) {
        title.style.transform = '';
        if (pages && pages.parentNode) pages.parentNode.removeChild(pages);
      }
    }, 950);
  }

  // Home to Sketching. The word slides from its menu position to its Sketching
  // position while the menu fades and the pencil drawing comes in.
  function enterSketching() {
    var from = spot(link);
    window.scrollTo({ top: 0, behavior: 'instant' });
    root.classList.remove('about-open');
    root.classList.add('sketching', 'sk-moving');
    var to = spot(word);
    title.style.transition = 'none';
    title.style.transform = 'translate(' + (from.x - to.x) + 'px,' + (from.y - to.y) + 'px)';
    title.getBoundingClientRect();
    title.style.transition = '';
    title.style.transform = '';
    if (pages) document.querySelector('.hero').after(pages);
    finishMove();
  }

  // Sketching to home: the same thing in reverse.
  function leaveSketching() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    var from = spot(word);
    root.classList.add('sk-moving');
    root.classList.remove('sketching');
    syncAbout();
    var to = spot(link);
    title.style.transform = 'translate(' + (to.x - from.x) + 'px,' + (to.y - from.y) + 'px)';
    finishMove();
  }

  link.addEventListener('click', function (event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
    // Without the sketches in hand, or if they could not load, fall back to
    // the real page.
    if (!pages) return;
    event.preventDefault();
    history.pushState(null, '', sketchingPath);
    enterSketching();
  });

  back.addEventListener('click', function (event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
    event.preventDefault();
    // The list closes out of sight, so it does not move the word's target.
    root.classList.add('no-anim');
    setProjects(false);
    remember(false);
    root.getBoundingClientRect();
    root.classList.remove('no-anim');
    history.pushState(null, '', homePath);
    leaveSketching();
  });

  window.addEventListener('hashchange', syncAbout);
  window.addEventListener('popstate', function () {
    var inSketching = root.classList.contains('sketching');
    if (location.pathname === sketchingPath && !inSketching) enterSketching();
    else if (location.pathname !== sketchingPath && inSketching) leaveSketching();
    else if (!inSketching) syncAbout();
  });

  // Fetch the sketches and decode the images early, so the animation never
  // waits on the network.
  function prepare() {
    fetched = fetch(link.href)
      .then(function (response) { return response.ok ? response.text() : Promise.reject(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var section = doc.querySelector('.sk-pages');
        // Inserted once the URL is /sketching/, where these paths are written for.
        section.querySelectorAll('img').forEach(function (img) {
          new Image().src = new URL(img.getAttribute('src'), link.href).href;
        });
        pages = document.importNode(section, true);
      })
      .catch(function () { pages = null; });
    var overlay = new Image();
    overlay.src = 'assets/sketching-overlay.jpg';
    if (overlay.decode) overlay.decode().catch(function () {});
  }

  // Set the starting state with no animation, then allow transitions.
  root.classList.add('no-anim');
  setProjects(remembered());
  syncAbout();
  setTimeout(function () { root.classList.remove('no-anim'); }, 50);
  if (document.readyState === 'complete') prepare();
  else window.addEventListener('load', prepare);
})();
