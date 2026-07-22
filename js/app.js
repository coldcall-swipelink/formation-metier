/*
 * app.js
 * ---------------------------------------------------------------------------
 * Logique de navigation :
 *   Plan du magasin (niveau 0)
 *     → Détail d'une zone : sous-zones + métiers (niveau 1)
 *       → Fiche métier : photo, description, exemples, passerelles (niveau 2)
 * ---------------------------------------------------------------------------
 */

(function () {
  "use strict";

  const STORE = window.STORE;

  // Index global de tous les métiers (rayon + management) pour retrouver
  // rapidement un métier par son id (utile pour les passerelles).
  const JOB_INDEX = {};
  const JOB_CONTEXT = {}; // jobId -> { zone, subZone }

  STORE.zones.forEach((zone) => {
    zone.subZones.forEach((sub) => {
      sub.jobs.forEach((job) => {
        JOB_INDEX[job.id] = job;
        JOB_CONTEXT[job.id] = { zone, subZone: sub };
      });
    });
  });
  Object.values(STORE.managementJobs || {}).forEach((job) => {
    JOB_INDEX[job.id] = job;
  });

  // Éléments du DOM
  const el = {
    storeMap: document.getElementById("store-map"),
    viewMap: document.getElementById("view-map"),
    viewZone: document.getElementById("view-zone"),
    zoneDetail: document.getElementById("zone-detail"),
    breadcrumb: document.getElementById("breadcrumb"),
    btnBackMap: document.getElementById("btn-back-map"),
    jobPanel: document.getElementById("job-panel"),
    jobPanelBody: document.getElementById("job-panel-body"),
    jobPanelClose: document.getElementById("job-panel-close"),
    jobPanelOverlay: document.getElementById("job-panel-overlay"),
  };

  let currentZone = null;

  /* --------------------------------------------------------- Utilitaires */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function jobCount(zone) {
    return zone.subZones.reduce((n, s) => n + s.jobs.length, 0);
  }

  /* ---------------------------------------------------- Niveau 0 : plan */

  function renderMap() {
    el.storeMap.innerHTML = "";
    STORE.zones.forEach((zone) => {
      const tile = document.createElement("button");
      tile.className = "zone-tile";
      tile.style.setProperty("--area", zone.area);
      tile.style.setProperty("--c1", zone.color);
      tile.style.setProperty("--c2", shade(zone.color, -28));
      tile.innerHTML = `
        <span class="zone-tile__count">${jobCount(zone)} métiers</span>
        <span class="zone-tile__icon">${zone.icon}</span>
        <span>
          <span class="zone-tile__name">${escapeHtml(zone.name)}</span>
          <span class="zone-tile__sub">${escapeHtml(zone.subtitle || "")}</span>
        </span>`;
      tile.addEventListener("click", () => openZone(zone.id));
      el.storeMap.appendChild(tile);
    });
  }

  /* --------------------------------------------- Niveau 1 : détail zone */

  function openZone(zoneId) {
    const zone = STORE.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    currentZone = zone;

    el.zoneDetail.innerHTML = `
      <div class="zone-detail__head" style="--c1:${zone.color};--c2:${shade(zone.color, -28)}">
        <span class="icon">${zone.icon}</span>
        <div>
          <h2>${escapeHtml(zone.name)}</h2>
          <p>${escapeHtml(zone.description)}</p>
        </div>
      </div>
      <div class="subzones">
        ${zone.subZones.map((sub, i) => renderSubzone(zone, sub, i)).join("")}
      </div>`;

    // Branche les clics sur les métiers
    el.zoneDetail.querySelectorAll("[data-job]").forEach((btn) => {
      btn.addEventListener("click", () => openJob(btn.getAttribute("data-job")));
    });

    switchView("zone");
    renderBreadcrumb();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderSubzone(zone, sub, index) {
    const c1 = zone.color;
    const c2 = shade(zone.color, -28);
    return `
      <div class="subzone-card" style="animation-delay:${index * 0.06}s">
        <div class="subzone-card__head">
          <span class="icon">${sub.icon}</span>
          <h3>${escapeHtml(sub.name)}</h3>
        </div>
        <p class="subzone-card__desc">${escapeHtml(sub.description || "")}</p>
        <div class="job-list">
          ${sub.jobs
            .map(
              (job) => `
            <button class="job-chip" data-job="${job.id}">
              <span class="job-chip__icon" style="--c1:${c1};--c2:${c2}">${job.photo.icon}</span>
              <span>
                <span class="job-chip__title">${escapeHtml(job.title)}</span>
                <span class="job-chip__hint">${escapeHtml(job.aliases && job.aliases[0] ? job.aliases[0] : "Voir la fiche")}</span>
              </span>
              <span class="job-chip__arrow">›</span>
            </button>`
            )
            .join("")}
        </div>
      </div>`;
  }

  /* ------------------------------------------ Niveau 2 : fiche métier */

  function openJob(jobId) {
    const job = JOB_INDEX[jobId];
    if (!job) return;

    const ctx = JOB_CONTEXT[jobId];
    const zone = ctx ? ctx.zone : currentZone;
    const accent = zone ? zone.color : "#475569";
    const [g1, g2] = job.photo.gradient;

    const passerellesHtml = (job.passerelles && job.passerelles.length)
      ? job.passerelles
          .map((pid) => {
            const p = JOB_INDEX[pid];
            if (!p) return "";
            const [pg1, pg2] = p.photo.gradient;
            const pctx = JOB_CONTEXT[pid];
            const note = pctx
              ? `${pctx.zone.name} · ${pctx.subZone.name}`
              : "Évolution / encadrement";
            return `
              <button class="passerelle" data-job="${p.id}">
                <span class="passerelle__icon" style="--c1:${pg1};--c2:${pg2}">${p.photo.icon}</span>
                <span>
                  <span class="passerelle__title">${escapeHtml(p.title)}</span><br>
                  <span class="passerelle__note">${escapeHtml(note)}</span>
                </span>
                <span class="passerelle__arrow" style="margin-left:auto">→</span>
              </button>`;
          })
          .join("")
      : `<div class="job-section--empty"><p>Poste d'aboutissement : pas de passerelle référencée pour l'instant.</p></div>`;

    el.jobPanelBody.innerHTML = `
      <div class="job-photo" style="--c1:${g1};--c2:${g2}">
        <span class="job-photo__emoji">${job.photo.icon}</span>
        <span class="job-photo__tag">📷 Photo type du rayon (placeholder)</span>
      </div>
      <div class="job-body">
        ${zone ? `<span class="job-body__zone" style="--accent:${accent}">${escapeHtml(zone.name)}</span>` : ""}
        <h2 id="job-panel-title">${escapeHtml(job.title)}</h2>

        <div class="job-aliases">
          ${(job.aliases || []).map((a) => `<span class="alias">${escapeHtml(a)}</span>`).join("")}
        </div>

        <div class="job-section">
          <h4>📝 Le métier</h4>
          <p>${escapeHtml(job.description)}</p>
        </div>

        <div class="job-section">
          <h4>🎯 Exemples concrets</h4>
          <ul class="job-examples">
            ${(job.examples || []).map((e) => `<li>${escapeHtml(e)}</li>`).join("")}
          </ul>
        </div>

        <div class="job-section">
          <h4>🔀 Métiers passerelles</h4>
          <div class="passerelles">${passerellesHtml}</div>
        </div>
      </div>`;

    // Branche les passerelles (navigation entre fiches)
    el.jobPanelBody.querySelectorAll("[data-job]").forEach((btn) => {
      btn.addEventListener("click", () => openJob(btn.getAttribute("data-job")));
    });

    openPanel();
    el.jobPanelBody.parentElement.scrollTop = 0;
  }

  /* --------------------------------------------------- Vues & panneau */

  function switchView(name) {
    if (name === "map") {
      el.viewMap.hidden = false;
      el.viewMap.classList.add("is-active");
      el.viewZone.hidden = true;
    } else {
      el.viewMap.hidden = true;
      el.viewMap.classList.remove("is-active");
      el.viewZone.hidden = false;
    }
  }

  function backToMap() {
    currentZone = null;
    switchView("map");
    renderBreadcrumb();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPanel() {
    el.jobPanel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closePanel() {
    el.jobPanel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function renderBreadcrumb() {
    const parts = [`<button data-nav="home">🏬 Magasin</button>`];
    if (currentZone) {
      parts.push(`<span class="sep">›</span>`);
      parts.push(`<span class="current">${escapeHtml(currentZone.name)}</span>`);
    }
    el.breadcrumb.innerHTML = parts.join("");
    const home = el.breadcrumb.querySelector('[data-nav="home"]');
    if (home) home.addEventListener("click", backToMap);
  }

  /* ------------------------------------------------ Couleur utilitaire */
  // Assombrit / éclaircit une couleur hex (percent négatif = plus foncé).
  function shade(hex, percent) {
    const h = hex.replace("#", "");
    const num = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    const f = (v) => Math.max(0, Math.min(255, Math.round(v + (v * percent) / 100)));
    r = f(r); g = f(g); b = f(b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /* --------------------------------------------------------- Écouteurs */
  el.btnBackMap.addEventListener("click", backToMap);
  el.jobPanelClose.addEventListener("click", closePanel);
  el.jobPanelOverlay.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (el.jobPanel.getAttribute("aria-hidden") === "false") closePanel();
      else if (currentZone) backToMap();
    }
  });

  /* ------------------------------------------------------------ Init */
  renderMap();
  renderBreadcrumb();
})();
