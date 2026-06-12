/* IMP Modal Pop-up Controller
   Usage: <button data-modal="my-modal-id">Open</button>
          <div class="imp-modal" id="my-modal-id">...</div>
*/
(function () {
  'use strict';

  function openModal(id) {
    var modal = document.getElementById(id);
    var backdrop = document.getElementById('imp-modal-backdrop');
    if (!modal || !backdrop) return;
    modal.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.classList.add('imp-modal-open');
    // Move focus into the modal for accessibility
    var closeBtn = modal.querySelector('.imp-modal-close');
    if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
  }

  function closeAll() {
    document.querySelectorAll('.imp-modal.is-open').forEach(function (m) {
      m.classList.remove('is-open');
    });
    var backdrop = document.getElementById('imp-modal-backdrop');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.classList.remove('imp-modal-open');
  }

  // Inject backdrop once on load
  function ensureBackdrop() {
    if (document.getElementById('imp-modal-backdrop')) return;
    var backdrop = document.createElement('div');
    backdrop.id = 'imp-modal-backdrop';
    backdrop.className = 'imp-modal-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.addEventListener('click', closeAll);
    document.body.appendChild(backdrop);
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureBackdrop();

    // Bind any data-modal trigger
    document.querySelectorAll('[data-modal]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var id = el.getAttribute('data-modal');
        openModal(id);
      });
      // Make focusable + accessible
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    });

    // Close handlers
    document.querySelectorAll('.imp-modal-close').forEach(function (btn) {
      btn.addEventListener('click', closeAll);
    });

    // ESC key closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  });
})();
