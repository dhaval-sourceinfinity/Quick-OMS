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
    var scrollPosition = 0;

    function focusableElements() {
      return Array.prototype.slice.call(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function openNav() {
      lastFocused = document.activeElement;
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
      panel.dataset.open = "true";
      toggle.setAttribute("aria-expanded", "true");
      document.documentElement.dataset.navOpen = "true";
      document.body.dataset.navOpen = "true";
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollPosition + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      var items = focusableElements();
      if (items.length) items[0].focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeNav() {
      panel.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
      document.documentElement.dataset.navOpen = "false";
      document.body.dataset.navOpen = "false";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollPosition);
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

    // Close automatically if the viewport grows past the mobile threshold.
    var mql = window.matchMedia("(min-width: 1180px)");
    mql.addEventListener("change", function (e) {
      if (e.matches && panel.dataset.open === "true") {
        closeNav();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Smart Tab Reveal (Reusable Project-Wide Horizontal Scroll Utility) */
  /* ------------------------------------------------------------------ */

  /**
   * Smoothly scrolls a horizontally overflowing tab strip just enough to
   * reveal the active tab with comfortable breathing room, and when space
   * permits, preserves a small peek (~24-36px) of the next tab to indicate
   * additional content.
   *
   * Priorities:
   * 1. Active tab must be 100% visible (never sacrificed for next tab peek).
   * 2. Maintain comfortable spacing around active tab.
   * 3. Preserve next-tab peek (~24-36px) when viewport space permits.
   * 4. Minimum scroll required — no unnecessary scrolling or force-centering.
   *
   * @param {HTMLElement} tab - The tab element to reveal
   * @param {Object} [options] - Options
   * @param {HTMLElement} [options.container] - Explicit scroll container
   * @param {number} [options.margin=16] - Breathing room in px from container edges
   * @param {number} [options.peek=28] - Desired peek in px of next tab
   * @param {boolean} [options.smooth=true] - Smooth native scrolling
   */
  function smartRevealTab(tab, options) {
    if (!tab || typeof tab.getBoundingClientRect !== "function") return;

    options = options || {};
    var margin = typeof options.margin === "number" ? options.margin : 16;
    var peek = typeof options.peek === "number" ? options.peek : 28;
    var smooth = options.smooth !== false;

    // Find the scrollable container (either explicit or ancestor)
    var container = options.container || findScrollableTabContainer(tab);
    if (!container) return;

    // If container doesn't overflow horizontally, all tabs fit -> no scroll needed
    if (container.scrollWidth <= container.clientWidth) return;

    var containerRect = container.getBoundingClientRect();
    var tabRect = tab.getBoundingClientRect();

    var containerWidth = container.clientWidth;
    var tabWidth = tabRect.width;

    var tabLeftRelative = tabRect.left - containerRect.left;
    var tabRightRelative = tabRect.right - containerRect.left;

    var currentScroll = container.scrollLeft;
    var maxScroll = container.scrollWidth - containerWidth;
    var targetScroll = currentScroll;

    // Find next sibling tab (if any) to calculate peek boundary
    var nextTab = getNextTabElement(tab, container);
    var desiredRightBoundary = tabRightRelative + margin;

    if (nextTab && typeof nextTab.getBoundingClientRect === "function") {
      var nextTabRect = nextTab.getBoundingClientRect();
      var nextTabLeftRelative = nextTabRect.left - containerRect.left;
      // Right boundary includes the gap to next tab + desired peek amount
      desiredRightBoundary = nextTabLeftRelative + peek;
    }

    // 1. Check if tab is clipped on the LEFT (or scrolled past)
    if (tabLeftRelative < margin) {
      // Scroll right (decrease scrollLeft) just enough to put active tab at left margin
      targetScroll = currentScroll + tabLeftRelative - margin;
    }
    // 2. Check if active tab or desired next-tab peek extends past RIGHT edge
    else if (desiredRightBoundary > containerWidth) {
      // Required scroll amount to bring desiredRightBoundary to right edge of viewport
      var scrollDelta = desiredRightBoundary - containerWidth;

      // PRIORITY 1 SAFEGUARD: Ensure scrolling does not push active tab's left edge past margin
      var maxAllowedDelta = tabLeftRelative - margin;
      if (scrollDelta > maxAllowedDelta) {
        scrollDelta = Math.max(0, maxAllowedDelta);
      }

      // Only scroll if delta is meaningful (> 2px)
      if (scrollDelta > 2) {
        targetScroll = currentScroll + scrollDelta;
      }
    }
    // 3. Tab is already comfortably visible
    else {
      return;
    }

    // Clamp target to valid range [0, maxScroll] (handles first & last tabs cleanly)
    targetScroll = Math.max(0, Math.min(maxScroll, Math.round(targetScroll)));

    // Avoid redundant micro-scroll operations
    if (Math.abs(targetScroll - currentScroll) < 1) return;

    if (smooth && typeof container.scrollTo === "function") {
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    } else {
      container.scrollLeft = targetScroll;
    }
  }

  function getNextTabElement(tab, container) {
    var tabs = Array.prototype.slice.call(
      container.querySelectorAll('[role="tab"]')
    );
    if (!tabs.length) {
      var parent = tab.parentElement;
      if (parent) {
        tabs = Array.prototype.slice.call(parent.querySelectorAll('button, [role="tab"], a'));
      }
    }
    var idx = tabs.indexOf(tab);
    if (idx !== -1 && idx < tabs.length - 1) {
      return tabs[idx + 1];
    }
    return null;
  }

  function findScrollableTabContainer(el) {
    var parent = el.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      var style = window.getComputedStyle(parent);
      var overflowX = style.overflowX;
      if (
        overflowX === "auto" ||
        overflowX === "scroll" ||
        parent.hasAttribute("data-tab-group") ||
        parent.getAttribute("role") === "tablist"
      ) {
        if (parent.scrollWidth > parent.clientWidth || overflowX === "auto" || overflowX === "scroll") {
          return parent;
        }
      }
      parent = parent.parentElement;
    }
    return el.closest('[data-tab-group], [role="tablist"]') || el.parentElement;
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

    // Per-tab accent colors (Figma Vector fill values)
    var tabAccentColors = {
      "core-tab-orders": "#9A6EE2",
      "core-tab-inventory": "#29966C",
      "core-tab-customers": "#4478EF",
      "core-tab-invoices": "#F47863"
    };

    function selectTab(tab, moveFocus) {
      if (!tab) return;
      var activePanel = null;
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) {
          // Remove any lingering animation class from previous switches
          panel.classList.remove("is-animating");
          if (selected) {
            activePanel = panel;
            panel.hidden = false;
            requestAnimationFrame(function () {
              panel.classList.add("is-active");
              // Trigger one-shot entry animation (Figma Smart Animate 400ms)
              panel.classList.add("is-animating");
              setTimeout(function () {
                panel.classList.remove("is-animating");
              }, 450); // slightly longer than 400ms to ensure animation completes
            });
          } else {
            panel.classList.remove("is-active");
            panel.hidden = true;
          }
        }
      });

      // Animate SVG checkmark fill colors to match the new tab's accent
      // (Figma: kf_1_758/754/762_background-color_0 — 400ms ease-out)
      if (activePanel) {
        var accentColor = tabAccentColors[tab.id] || "#9A6EE2";
        var checks = activePanel.querySelectorAll(".core-feature-check path");
        checks.forEach(function (path) {
          path.style.transition = "fill 400ms ease-out";
          path.style.fill = accentColor;
        });
      }

      updateIndicator(tab);

      // Smart Reveal: smoothly scroll tab container just enough to make active tab fully visible + next tab peek
      smartRevealTab(tab, { container: group, margin: 16, peek: 28 });

      if (moveFocus) tab.focus();
    }

    // Set initial indicator position
    var initialTab = group.querySelector('[role="tab"][aria-selected="true"]') || tabs[0];
    function refreshCurrent() {
      var current = group.querySelector('[role="tab"][aria-selected="true"]');
      if (current) {
        updateIndicator(current);
      }
    }
    setTimeout(refreshCurrent, 50);
    window.addEventListener("load", refreshCurrent, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshCurrent);
    }

    window.addEventListener("resize", refreshCurrent, { passive: true });

    // Initial check (non-smooth so page load is instantaneous)
    if (initialTab) {
      setTimeout(function () {
        smartRevealTab(initialTab, { container: group, margin: 16, peek: 28, smooth: false });
      }, 60);
    }

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
    document.querySelectorAll("[data-tab-group], [role=\"tablist\"]").forEach(initTabGroup);
  }

  // Expose global smart tab reveal helper for project-wide programmatic usage
  window.QuickOMS = window.QuickOMS || {};
  window.QuickOMS.smartRevealTab = smartRevealTab;

  /* ------------------------------------------------------------------ */
  /* Accordion (native disclosure semantics)                             */
  /* ------------------------------------------------------------------ */

  function initAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
      var panel = document.getElementById(
        trigger.getAttribute("aria-controls")
      );
      var card = trigger.closest(".faq-card, .accordion-item, .faq-list__item");

      // Initial state sync
      if (trigger.getAttribute("aria-expanded") === "true") {
        if (card) card.classList.add("is-open");
        if (panel) {
          panel.hidden = false;
          panel.classList.add("is-open");
        }
      }

      trigger.addEventListener("click", function () {
        var isExpanded = trigger.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          trigger.setAttribute("aria-expanded", "false");
          if (card) card.classList.remove("is-open");
          if (panel) {
            panel.classList.remove("is-open");
            setTimeout(function () {
              if (trigger.getAttribute("aria-expanded") === "false") {
                panel.hidden = true;
              }
            }, 280);
          }
        } else {
          if (panel) {
            panel.hidden = false;
            // Force reflow so browser registers 0fr starting state before applying expanded state
            panel.offsetHeight;
            panel.classList.add("is-open");
          }
          trigger.setAttribute("aria-expanded", "true");
          if (card) card.classList.add("is-open");
        }
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

    var selects = form.querySelectorAll(".form-select");
    selects.forEach(function (select) {
      function updatePlaceholderState() {
        if (!select.value) {
          select.classList.add("is-placeholder");
        } else {
          select.classList.remove("is-placeholder");
        }
      }
      updatePlaceholderState();
      select.addEventListener("change", updatePlaceholderState);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (submitBtn) submitBtn.disabled = true;
      if (success) success.hidden = false;
      form.reset();
      selects.forEach(function (select) {
        select.classList.add("is-placeholder");
      });
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

  /* ------------------------------------------------------------------ */
  /* Fallback / 404 behavior & missing route interceptor                 */
  /* ------------------------------------------------------------------ */

  function initNotFoundActions() {
    var goBackBtns = document.querySelectorAll('[data-action="go-back"]');
    goBackBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var hasHistory = window.history.length > 1;
        var isSameOrigin = false;
        try {
          if (document.referrer) {
            var refUrl = new URL(document.referrer);
            isSameOrigin = refUrl.origin === window.location.origin;
          }
        } catch (err) {
          isSameOrigin = false;
        }

        if (hasHistory && isSameOrigin) {
          window.history.back();
        } else {
          window.location.href = "index.html";
        }
      });
    });
  }

  function initMissingRouteInterceptor() {
    var missingRoutes = [
      "lite.html",
      "features.html",
      "industries.html",
      "integrations.html",
      "about.html"
    ];

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      var href = link.getAttribute("href");
      if (!href) return;

      // Ignore external, tel, mailto, in-page hash links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      var cleanPath = href.split("?")[0].split("#")[0];
      var isMissing = missingRoutes.some(function (route) {
        return cleanPath === route || cleanPath.endsWith("/" + route);
      });

      if (isMissing) {
        e.preventDefault();
        window.location.href = "404.html?from=" + encodeURIComponent(cleanPath);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initTabs();
    initAccordions();
    initHeaderScroll();
    initContactForm();
    initHorizontalCarousels();
    initNotFoundActions();
    initMissingRouteInterceptor();
  });
})();

