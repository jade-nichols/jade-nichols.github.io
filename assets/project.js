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
