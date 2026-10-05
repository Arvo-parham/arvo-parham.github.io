// ===========================================================
// ARVO — site behavior
//
// Project data lives in projects.json, not in this file.
// index.html renders cards from it. project.html reads the
// ?slug= value from the URL (URLSearchParams) and fetches
// the matching project to build its case-study page.
// That means adding a new project later is just adding a new
// object to projects.json — no new HTML file needed.
// ===========================================================

async function loadProjects() {
  const res = await fetch("projects.json");
  if (!res.ok) throw new Error("Could not load projects.json");
  return res.json();
}

/* ---------- Render project cards (index.html) ---------- */
function projectPreviewHTML(p) {
  switch (p.preview) {
    case "calculator":
      return `
        <div class="mock-screen calculator-preview">
          <div class="mock-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="mock-display">128 + 47</div>

          <div class="mock-grid">
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span class="accent">÷</span>

            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span class="accent">×</span>

            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span class="accent">−</span>

            <span>0</span>
            <span>.</span>
            <span>=</span>
            <span class="accent">+</span>
          </div>
        </div>
      `;

    case "todo":
      return `
        <div class="mock-screen todo-preview">
          <div class="mock-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="todo-title">My Tasks</div>

          <div class="todo-item completed">
            <span class="todo-check">✓</span>
            <span>Learn JavaScript</span>
          </div>

          <div class="todo-item">
            <span class="todo-check"></span>
            <span>Build Todo App</span>
          </div>

          <div class="todo-item">
            <span class="todo-check"></span>
            <span>Practice React</span>
          </div>
        </div>
      `;

      
      case "weather":
        return `
          <div class="mock-screen weather-preview">
            <div class="mock-topbar">
              <span></span>
              <span></span>
              <span></span>
            </div>
      
            <div class="weather-search">
              <span class="search-icon">⌕</span>
              <span>Search city...</span>
            </div>
      
            <div class="weather-main">
              <div class="weather-location">
                <span class="location-dot">●</span>
                <span>Tehran</span>
              </div>
      
              <div class="weather-icon">☀</div>
      
              <div class="weather-temperature">
                24<span>°C</span>
              </div>
      
              <div class="weather-condition">
                Clear Sky
              </div>
            </div>
      
            <div class="weather-stats">
              <div>
                <span>💧</span>
                <small>Humidity</small>
                <strong>42%</strong>
              </div>
      
              <div>
                <span>💨</span>
                <small>Wind</small>
                <strong>12 km/h</strong>
              </div>
      
              <div>
                <span>🌡</span>
                <small>Feels like</small>
                <strong>23°C</strong>
              </div>
            </div>
          </div>
        `;
      

  case "github":
     return `
    <div class="mock-screen github-preview">
      <div class="mock-topbar">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="github-search">
        <span class="github-search-icon">⌕</span>
        <span>Search GitHub username...</span>
        <button>Search</button>
      </div>

      <div class="github-profile">
        <div class="github-avatar">
          <span>GH</span>
        </div>

        <div class="github-user-info">
          <strong>octocat</strong>
          <span>@octocat</span>
        </div>
      </div>

      <div class="github-bio">
        GitHub profile explorer
      </div>

      <div class="github-stats">
        <div>
          <strong>8</strong>
          <span>Repos</span>
        </div>

        <div>
          <strong>12</strong>
          <span>Followers</span>
        </div>

        <div>
          <strong>7</strong>
          <span>Following</span>
        </div>
      </div>

      <div class="github-details">
        <span>⌖ San Francisco</span>
        <span>● github.com/octocat</span>
      </div>
    </div>
  `;

    case "shop":
      return `
        <div class="mock-screen shop-preview">
  <div class="mock-topbar">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div class="shop-header">
    <span>Shop Explorer</span>
    <span>🛒</span>
  </div>

  <div class="shop-controls">
    <span>All</span>
    <span>Price ↑</span>
  </div>

  <div class="product-grid">
    <span>👟</span>
    <span>🎧</span>
    <span>⌚</span>
    <span>📷</span>
  </div>

  <div class="cart-bar">
    🛒 Cart
  </div>
</div>
`;

    default:
      return `
        <div class="mock-screen">
          <div class="mock-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="mock-placeholder">
            Project Preview
          </div>
        </div>
      `;
  }
}

function projectCardHTML(p) {
  return `
    <article class="project-card reveal">

      <div class="project-preview">
        ${projectPreviewHTML(p)}
      </div>

      <div class="project-body">

        <h3 class="project-name">${p.name}</h3>

        <p class="project-desc">
          ${p.description}
        </p>

        <ul class="project-tags">
          ${p.tech
            .map((t) => `<li class="tag">${t}</li>`)
            .join("")}
        </ul>

        <div class="project-actions">
          <a
            href="project.html?slug=${encodeURIComponent(p.slug)}"
            class="btn btn-primary btn-small"
          >
            Case Study
          </a>

          <a
            href="${p.codeUrl}"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost btn-small"
          >
            GitHub
          </a>
        </div>

        ${
          p.next
            ? `<p class="project-next">
                Next up: <strong>${p.next}</strong>
              </p>`
            : ""
        }

      </div>
    </article>
  `;
}

async function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  try {
    const projects = await loadProjects();
    grid.innerHTML = projects.map(projectCardHTML).join("");
    markRevealTargets();
    initReveal();
  } catch (err) {
    grid.innerHTML = `<p class="project-desc">Projects couldn't be loaded right now.</p>`;
    console.error(err);
  }
}

/* ---------- Render case study (project.html) ---------- */
function caseSectionHTML(heading, content) {
  if (!content) return "";
  const body = Array.isArray(content)
    ? `<ul>${content.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : `<p>${content}</p>`;
  return `
    <section class="case-block">
      <h2>${heading}</h2>
      ${body}
    </section>`;
}

async function renderCaseStudy() {
  const titleEl = document.getElementById("cs-title");
  const tagsEl = document.getElementById("cs-tags");
  const bodyEl = document.getElementById("cs-body");
  if (!titleEl || !bodyEl) return;

  // Read the project slug straight from the URL, e.g. project.html?slug=calculator
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  try {
    const projects = await loadProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
      titleEl.textContent = "Project not found";
      bodyEl.innerHTML = `<section class="case-block" style="border-top:none;padding-top:0;">
        <p>This project doesn't exist yet. <a href="index.html#work">Back to work →</a></p>
      </section>`;
      return;
    }

    document.title = `${project.name} — ARVO`;
    titleEl.textContent = project.name;
    tagsEl.innerHTML = project.tech.map((t) => `<span class="tag">${t}</span>`).join("");

    const cs = project.caseStudy || {};
    bodyEl.innerHTML = [
      caseSectionHTML("Problem", cs.problem),
      caseSectionHTML("Approach", cs.approach),
      caseSectionHTML("Implementation", cs.implementation),
      caseSectionHTML("Challenges", cs.challenges),
      caseSectionHTML("What I Learned", cs.learned),
      caseSectionHTML("Result", cs.result),
    ].join("");

    // remove the top border on the first block so it doesn't double up with the hero
    const first = bodyEl.querySelector(".case-block");
    if (first) { first.style.borderTop = "none"; first.style.paddingTop = "0"; }
  } catch (err) {
    titleEl.textContent = "Something went wrong";
    console.error(err);
  }
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNav() {
  const navLinks = document.querySelectorAll("[data-nav]");
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Mark static reveal targets ---------- */
function markRevealTargets() {
  document
    .querySelectorAll(
      ".project-card, .skill-group, .commit, .about-text, .contact"
    )
    .forEach((el) => el.classList.add("reveal"));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();       // no-op on project.html (no #project-grid there)
  renderCaseStudy();      // no-op on index.html (no #cs-title there)
  markRevealTargets();
  initNavToggle();
  initActiveNav();
  initReveal();
});
