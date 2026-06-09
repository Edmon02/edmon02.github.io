(function () {
  'use strict';

  var btn = document.getElementById('scroll-top');
  if (!btn) return;

  var visible = false;

  function toggleButton() {
    var show = window.scrollY > 400;
    if (show === visible) return;
    visible = show;
    btn.classList.toggle('is-visible', show);
  }

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();
})();
