// Project pages: More glides down until the cover image is completely out of
// view and the title is the first thing on screen. Normal scrolling still works.
(function () {
  var more = document.querySelector('.more');
  var title = document.getElementById('title');
  var cover = document.querySelector('.cover-image');
  var back = document.querySelector('.back');
  if (!more || !title || !cover) return;

  // On phones Back is a bar across the top, and the cover must end beneath it.
  function topInset() {
    var b = back.getBoundingClientRect();
    var c = cover.getBoundingClientRect();
    return b.right > c.left ? b.bottom : 0;
  }

  // A new click, or the reader scrolling, takes over from a glide in progress.
  var glide = 0;
  ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
    window.addEventListener(type, function () { glide++; }, { passive: true });
  });

  more.addEventListener('click', function (event) {
    event.preventDefault();
    var mine = ++glide;
    var start = window.scrollY;
    var distance = cover.getBoundingClientRect().bottom - topInset();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: start + distance, behavior: 'instant' });
      return;
    }
    var began = performance.now();
    function step(now) {
      if (mine !== glide) return;
      var p = Math.min(1, (now - began) / 1100);
      var eased = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
})();

// Magnifying lens: hovering an image marked data-zoom="<large image>" shows a
// round lens that follows the cursor with that spot enlarged. The large image
// only loads on first hover. Mouse and trackpad only; touch screens skip it.
(function () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var ZOOM = 4;
  document.querySelectorAll('img[data-zoom]').forEach(function (img) {
    var lens = null;
    function show(event) {
      if (!lens) {
        lens = document.createElement('div');
        lens.className = 'pj-lens';
        lens.setAttribute('aria-hidden', 'true');
        lens.style.backgroundImage = 'url("' + img.src + '"), url("' + img.dataset.zoom + '")';
        // The sharp image goes on top once it has loaded.
        var big = new Image();
        big.onload = function () { lens.style.backgroundImage = 'url("' + img.dataset.zoom + '")'; };
        big.src = img.dataset.zoom;
        document.body.appendChild(lens);
      }
      move(event);
      lens.classList.add('on');
    }
    function move(event) {
      var r = img.getBoundingClientRect();
      var x = event.clientX - r.left, y = event.clientY - r.top;
      var size = lens.offsetWidth;
      lens.style.transform = 'translate(' + (event.clientX - size / 2) + 'px,' + (event.clientY - size / 2) + 'px)';
      lens.style.backgroundSize = (r.width * ZOOM) + 'px ' + (r.height * ZOOM) + 'px';
      lens.style.backgroundPosition = (size / 2 - x * ZOOM) + 'px ' + (size / 2 - y * ZOOM) + 'px';
    }
    img.addEventListener('mouseenter', show);
    img.addEventListener('mousemove', function (e) { if (lens) move(e); });
    img.addEventListener('mouseleave', function () { if (lens) lens.classList.remove('on'); });
    img.style.cursor = 'zoom-in';
  });
})();
