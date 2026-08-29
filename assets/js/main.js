// Quick OMS — vanilla JS behavior: mobile nav, tabs, accordion.
// No framework/build step (plain HTML/CSS/JS site).

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                   */
  /* ------------------------------------------------------------------ */

  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.querySelector("[data-nav-panel]");
    var closeBtn = document.querySelector("[data-nav-close]");
    if (!toggle || !panel) return;

    var lastFocused = null;

    function focusableElements() {
      return Array.prototype.slice.call(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function openNav() {
      lastFocused = document.activeElement;
      panel.dataset.open = "true";
      toggle.setAttribute("aria-expanded", "true");
      document.body.dataset.navOpen = "true";
      var items = focusableElements();
      if (items.length) items[0].focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeNav() {
      panel.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
      document.body.dataset.navOpen = "false";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused) lastFocused.focus();
    }

    function onKeydown(event) {
      if (event.key === "Escape") {
        closeNav();
        return;
      }
      if (event.key === "Tab") {
        var items = focusableElements();
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    toggle.addEventListener("click", function () {
      var isOpen = panel.dataset.open === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeNav);
    }

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    // Close automatically if the viewport grows past the mobile threshold.
    var mql = window.matchMedia("(min-width: 1180px)");
    mql.addEventListener("change", function (e) {
      if (e.matches && panel.dataset.open === "true") {
        closeNav();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Tabs (WAI-ARIA tabs pattern, horizontal, manual activation)         */
  /* ------------------------------------------------------------------ */

  function initTabGroup(group) {
    var tabs = Array.prototype.slice.call(
      group.querySelectorAll('[role="tab"]')
    );
    if (!tabs.length) return;

    var indicator = group.querySelector(".core-tabs-indicator");

    function updateIndicator(activeTab) {
      if (!indicator || !activeTab) return;
      var tabRect = activeTab.getBoundingClientRect();
      var groupRect = group.getBoundingClientRect();
      var leftOffset = tabRect.left - groupRect.left + group.scrollLeft;
      indicator.style.width = tabRect.width + "px";
      indicator.style.transform = "translateX(" + leftOffset + "px)";
    }

    function selectTab(tab, moveFocus) {
      if (!tab) return;
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) {
          if (selected) {
            panel.hidden = false;
            requestAnimationFrame(function () {
              panel.classList.add("is-active");
            });
          } else {
            panel.classList.remove("is-active");
            panel.hidden = true;
          }
        }
      });
      updateIndicator(tab);
      if (moveFocus) tab.focus();
    }

    // Set initial indicator position
    var initialTab = group.querySelector('[role="tab"][aria-selected="true"]') || tabs[0];
    function refreshCurrent() {
      var current = group.querySelector('[role="tab"][aria-selected="true"]');
      if (current) updateIndicator(current);
    }
    setTimeout(refreshCurrent, 50);
    window.addEventListener("load", refreshCurrent, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshCurrent);
    }

    window.addEventListener("resize", refreshCurrent, { passive: true });

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectTab(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var newIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          newIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          newIndex = 0;
        } else if (event.key === "End") {
          newIndex = tabs.length - 1;
        }
        if (newIndex !== null) {
          event.preventDefault();
          selectTab(tabs[newIndex], true);
        }
      });
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tab-group]").forEach(initTabGroup);
  }

  /* ------------------------------------------------------------------ */
  /* Accordion (native disclosure semantics)                             */
  /* ------------------------------------------------------------------ */

  function initAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var panel = document.getElementById(
          trigger.getAttribute("aria-controls")
        );
        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (panel) panel.hidden = expanded;
      });
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var isHidden = false;

    function handleScroll() {
      var currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      var diff = currentScrollY - lastScrollY;

      // 1. Scrolled styling
      if (currentScrollY > 20) {
        header.setAttribute("data-scrolled", "true");
      } else {
        header.removeAttribute("data-scrolled");
      }

      // 2. Prevent hide when mobile navigation is open
      if (document.body.dataset.navOpen === "true") {
        if (isHidden) {
          header.classList.remove("header--hidden");
          isHidden = false;
        }
        lastScrollY = currentScrollY;
        return;
      }

      // 3. Near top of page: always show
      if (currentScrollY <= 40) {
        if (isHidden) {
          header.classList.remove("header--hidden");
          isHidden = false;
        }
      } else if (diff > 6) {
        // Scrolling DOWN past header height -> slide up and hide
        if (!isHidden && currentScrollY > 80) {
          header.classList.add("header--hidden");
          isHidden = true;
        }
      } else if (diff < -4) {
        // Scrolling UP even slightly from ANY section -> slide down and appear immediately
        if (isHidden) {
          header.classList.remove("header--hidden");
          isHidden = false;
        }
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* ------------------------------------------------------------------ */
  /* Contact form (no backend to submit to — relies on native HTML5       */
  /* validation via required/type attributes, then shows an inline        */
  /* confirmation in place of a real async submit/response)                */
  /* ------------------------------------------------------------------ */

  /* Business Type ships a disabled placeholder option so the closed field
     can show "Select business type" text; that placeholder must never
     read as a real, submittable choice. Swaps its native validation
     bubble for an inline message instead of changing what counts as
     valid — the field is still required, still empty until chosen. */
  function initBusinessTypeValidation(form) {
    var select = form.querySelector("#cf-business-type");
    var error = document.getElementById("cf-business-type-error");
    if (!select || !error) return;

    select.addEventListener("invalid", function (event) {
      event.preventDefault();
      error.hidden = false;
      select.setAttribute("aria-invalid", "true");
    });

    select.addEventListener("change", function () {
      if (select.checkValidity()) {
        error.hidden = true;
        select.removeAttribute("aria-invalid");
      }
    });
  }

  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var success = document.getElementById("contact-form-success");
    var submitBtn = form.querySelector('button[type="submit"]');

    initBusinessTypeValidation(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (submitBtn) submitBtn.disabled = true;
      if (success) success.hidden = false;
      form.reset();
      if (submitBtn) submitBtn.disabled = false;
      if (success && typeof success.focus === "function") success.focus();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Horizontal Carousel / Slider (Mouse drag, scroll fades & keyboard)  */
  /* ------------------------------------------------------------------ */

  function initHorizontalCarousels() {
    var carousels = document.querySelectorAll("[data-carousel]");
    carousels.forEach(function (carousel) {
      var isDown = false;
      var startX;
      var scrollLeft;
      var parent = carousel.parentElement;
      var leftFade = parent ? parent.querySelector('[data-scroll-fade="left"]') : null;
      var rightFade = parent ? parent.querySelector('[data-scroll-fade="right"]') : null;

      function updateFades() {
        var currentScroll = carousel.scrollLeft;
        var maxScroll = carousel.scrollWidth - carousel.clientWidth;
        var threshold = 8;

        if (leftFade) {
          leftFade.setAttribute("data-visible", currentScroll > threshold ? "true" : "false");
        }
        if (rightFade) {
          rightFade.setAttribute("data-visible", currentScroll < maxScroll - threshold ? "true" : "false");
        }
      }

      carousel.addEventListener("scroll", updateFades, { passive: true });
      window.addEventListener("resize", updateFades, { passive: true });
      // Initial state evaluation
      setTimeout(updateFades, 50);

      carousel.addEventListener("mousedown", function (e) {
        isDown = true;
        carousel.classList.add("is-dragging");
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener("mouseleave", function () {
        isDown = false;
        carousel.classList.remove("is-dragging");
      });

      carousel.addEventListener("mouseup", function () {
        isDown = false;
        carousel.classList.remove("is-dragging");
      });

      carousel.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - carousel.offsetLeft;
        var walk = (x - startX) * 1.4;
        carousel.scrollLeft = scrollLeft - walk;
        updateFades();
      });

      carousel.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") {
          carousel.scrollBy({ left: 350, behavior: "smooth" });
        } else if (e.key === "ArrowLeft") {
          carousel.scrollBy({ left: -350, behavior: "smooth" });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initTabs();
    initAccordions();
    initHeaderScroll();
    initContactForm();
    initHorizontalCarousels();
  });
})();
