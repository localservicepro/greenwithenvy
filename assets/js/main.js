/* Green With Envy — menu, quote modal, FAQ accordion, forms, cursor */
(function () {
  'use strict';

  var menu = document.getElementById('mobile-menu');
  var modal = document.getElementById('quote-modal');
  var toast = document.getElementById('toast');

  function openMenu() { if (menu) menu.hidden = false; }
  function closeMenu() { if (menu) menu.hidden = true; }
  function openModal() { closeMenu(); if (modal) modal.hidden = false; }
  function closeModal() { if (modal) modal.hidden = true; }

  document.querySelectorAll('[data-open-menu]').forEach(function (el) {
    el.addEventListener('click', openMenu);
  });
  document.querySelectorAll('[data-close-menu]').forEach(function (el) {
    el.addEventListener('click', closeMenu);
  });
  document.querySelectorAll('[data-open-quote]').forEach(function (el) {
    el.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-close-quote]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  if (menu) {
    menu.addEventListener('click', function (e) { if (e.target === menu) closeMenu(); });
    menu.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }
  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); closeModal(); }
  });

  /* FAQ accordion — answers stay in the DOM for crawlers; toggled with hidden */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        var a = document.getElementById(other.getAttribute('aria-controls'));
        if (a) a.hidden = true;
        var m = other.querySelector('.marker');
        if (m) m.textContent = '+';
      });
      if (!open && answer) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        var marker = btn.querySelector('.marker');
        if (marker) marker.textContent = '–';
      }
    });
  });

  /* Quote forms */
  var toastTimer = null;
  document.querySelectorAll('form.quote-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-submit');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
      setTimeout(function () {
        form.reset();
        if (btn) { btn.textContent = original; btn.disabled = false; }
        closeModal();
        if (toast) {
          toast.hidden = false;
          if (toastTimer) clearTimeout(toastTimer);
          toastTimer = setTimeout(function () { toast.hidden = true; }, 5000);
        }
      }, 900);
    });
  });

  /* Before / after comparison sliders */
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var range = slider.querySelector('.ba-range');
    if (!range) return;
    var update = function () { slider.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', update);
    update();
  });

  /* Custom cursor (fine pointers only) */
  var cursor = document.querySelector('.cursor');
  var cursorDot = document.querySelector('.cursor-dot');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      var t = e.target;
      var pointer = t && (t.tagName === 'A' || t.tagName === 'BUTTON' ||
        (t.closest && t.closest('a,button')));
      cursor.style.opacity = '1';
      cursor.style.transform = 'translate(' + (e.clientX - 16) + 'px, ' + (e.clientY - 16) + 'px) scale(' + (pointer ? 1.5 : 1) + ')';
      if (cursorDot) cursorDot.style.opacity = pointer ? '0' : '1';
    });
    window.addEventListener('mouseout', function () { cursor.style.opacity = '0'; });
  }
})();
