/* MedControl - vanilla JS para menu mobile, FAQ accordion e ano dinâmico */
(function () {
  "use strict";

  // -----------------------------------------------------------
  // Menu mobile
  // -----------------------------------------------------------
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    // Fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Fecha com tecla ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // -----------------------------------------------------------
  // FAQ accordion (acessível)
  // -----------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    const btn = item.querySelector(".faq__q");
    const ans = item.querySelector(".faq__a");
    if (!btn || !ans) return;

    btn.addEventListener("click", function () {
      const open = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", String(!open));
      btn.setAttribute("aria-expanded", String(!open));
      ans.setAttribute("aria-hidden", String(open));
    });
  });

  // -----------------------------------------------------------
  // Ano dinâmico no footer
  // -----------------------------------------------------------
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // -----------------------------------------------------------
  // Nav principal: scrollspy (destaca a seção visível)
  // -----------------------------------------------------------
  const primaryNav = document.getElementById("primary-nav");
  if (primaryNav && "IntersectionObserver" in window) {
    const anchorLinks = Array.from(
      primaryNav.querySelectorAll('.nav__list a[href^="#"]')
    );
    const navSections = anchorLinks
      .map(function (a) {
        const id = a.getAttribute("href").slice(1);
        const el = id ? document.getElementById(id) : null;
        return el ? { id: id, el: el, link: a } : null;
      })
      .filter(Boolean);

    if (navSections.length) {
      const visibleNav = new Map();
      function setNavActive(id) {
        anchorLinks.forEach(function (a) {
          if (a.getAttribute("href") === "#" + id) {
            a.setAttribute("aria-current", "location");
          } else {
            a.removeAttribute("aria-current");
          }
        });
      }

      const navObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              visibleNav.set(entry.target.id, entry.intersectionRatio);
            } else {
              visibleNav.delete(entry.target.id);
            }
          });
          let activeId = null;
          for (let i = 0; i < navSections.length; i++) {
            if (visibleNav.has(navSections[i].id)) {
              activeId = navSections[i].id;
              break;
            }
          }
          if (!activeId) {
            const headerH = parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue("--header-h")
            ) || 72;
            for (let i = navSections.length - 1; i >= 0; i--) {
              const rect = navSections[i].el.getBoundingClientRect();
              if (rect.top - headerH - 24 <= 0) { activeId = navSections[i].id; break; }
            }
          }
          if (activeId) setNavActive(activeId);
        },
        {
          rootMargin: "-90px 0px -55% 0px",
          threshold: [0, 0.1, 0.5, 1],
        }
      );

      navSections.forEach(function (s) { navObserver.observe(s.el); });
    }
  }

  // -----------------------------------------------------------
  // Páginas legais: TOC colapsável (mobile/tablet) + active link
  // -----------------------------------------------------------
  const toc = document.querySelector("[data-toc]");
  if (toc) {
    const tocHeader = toc.querySelector(".legal__toc-header");
    const tocLinks = Array.from(toc.querySelectorAll(".legal__toc-list a"));
    const mobileMQ = window.matchMedia("(max-width: 639px)");

    // Estado inicial reflete o data-open do HTML
    if (tocHeader) {
      tocHeader.setAttribute(
        "aria-expanded",
        toc.getAttribute("data-open") === "true" ? "true" : "false"
      );
    }

    if (tocHeader) {
      tocHeader.addEventListener("click", function () {
        const open = toc.getAttribute("data-open") === "true";
        toc.setAttribute("data-open", String(!open));
        tocHeader.setAttribute("aria-expanded", String(!open));
      });
    }

    // Em mobile, fecha o TOC ao escolher uma seção (libera viewport)
    tocLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (mobileMQ.matches) {
          toc.setAttribute("data-open", "false");
          if (tocHeader) tocHeader.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Destaque da seção ativa via IntersectionObserver
    const sections = tocLinks
      .map(function (a) {
        const id = a.getAttribute("href");
        if (!id || !id.startsWith("#")) return null;
        const el = document.getElementById(id.slice(1));
        return el ? { id: id.slice(1), el: el, link: a } : null;
      })
      .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
      const visible = new Map();
      function setActive(id) {
        tocLinks.forEach(function (a) {
          if (a.getAttribute("href") === "#" + id) {
            a.setAttribute("aria-current", "location");
          } else {
            a.removeAttribute("aria-current");
          }
        });
      }

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            const id = entry.target.id;
            if (entry.isIntersecting) {
              visible.set(id, entry.intersectionRatio);
            } else {
              visible.delete(id);
            }
          });
          // escolhe a primeira seção (na ordem) que esteja visível
          let activeId = null;
          for (let i = 0; i < sections.length; i++) {
            if (visible.has(sections[i].id)) {
              activeId = sections[i].id;
              break;
            }
          }
          // fallback: última seção acima do topo da viewport
          if (!activeId) {
            const headerH = parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue("--header-h")
            ) || 72;
            for (let i = sections.length - 1; i >= 0; i--) {
              const rect = sections[i].el.getBoundingClientRect();
              if (rect.top - headerH - 24 <= 0) { activeId = sections[i].id; break; }
            }
          }
          if (activeId) setActive(activeId);
        },
        {
          rootMargin: "-90px 0px -65% 0px",
          threshold: [0, 0.1, 0.5, 1],
        }
      );

      sections.forEach(function (s) { observer.observe(s.el); });
    }
  }
})();
