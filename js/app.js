/*
 * app.js
 * ---------------------------------------------------------------------------
 * Logique de navigation :
 *   Plan du magasin en vue de dessus (niveau 0, dessiné en SVG)
 *     → Détail d'une zone : sous-zones + métiers (niveau 1)
 *       → Fiche métier : photo, description, exemples, passerelles (niveau 2)
 * ---------------------------------------------------------------------------
 */

(function () {
  "use strict";

  const STORE = window.STORE;

  /* ---------------------------------------------------------- Index métiers */
  const JOB_INDEX = {};
  const JOB_CONTEXT = {}; // jobId -> { zone, subZone }
  const ZONE_INDEX = {};  // zoneId -> zone
  const SUB_INDEX = {};   // subId  -> { sub, zone }

  STORE.zones.forEach((zone) => {
    ZONE_INDEX[zone.id] = zone;
    zone.subZones.forEach((sub) => {
      SUB_INDEX[sub.id] = { sub, zone };
      sub.jobs.forEach((job) => {
        JOB_INDEX[job.id] = job;
        JOB_CONTEXT[job.id] = { zone, subZone: sub };
      });
    });
  });
  Object.values(STORE.managementJobs || {}).forEach((job) => {
    JOB_INDEX[job.id] = job;
  });

  // Départements (grandes catégories) + contexte des managers.
  // Un département est défini par une liste de rayons (subZones) -> chevauchements
  // possibles (ex : un rayon PGC peut relever de l'alimentaire ou du non-alim).
  const DEPT_INDEX = STORE.departments || {};              // deptId -> department
  const DEPT_BY_MANAGER = {};                              // managerJobId -> department
  Object.values(DEPT_INDEX).forEach((d) => {
    DEPT_BY_MANAGER[d.manager] = d;
    d._subSet = new Set(d.subZones || []);
  });

  // Départements auxquels appartient (au moins un rayon de) la zone
  function departmentsOfZone(zone) {
    const subIds = zone.subZones.map((s) => s.id);
    return Object.values(DEPT_INDEX).filter((d) => subIds.some((id) => d._subSet.has(id)));
  }
  // La zone est-elle entièrement dans le département ?
  function zoneFullyInDept(zone, dept) {
    return zone.subZones.every((s) => dept._subSet.has(s.id));
  }

  // Rattache chaque manager de secteur à sa zone (pour l'affichage de sa fiche)
  STORE.zones.forEach((zone) => {
    if (zone.manager && JOB_INDEX[zone.manager]) {
      JOB_CONTEXT[zone.manager] = { zone, subZone: null };
    }
  });

  // Note affichée pour une passerelle (contexte du métier cible)
  function jobNote(jobId) {
    const ctx = JOB_CONTEXT[jobId];
    if (ctx && ctx.subZone) return `${ctx.zone.name} · ${ctx.subZone.name}`;
    if (ctx && ctx.zone) return `Encadrement · ${ctx.zone.name}`;
    if (DEPT_BY_MANAGER[jobId]) return `Département ${DEPT_BY_MANAGER[jobId].name}`;
    return "Évolution / encadrement";
  }

  /* ------------------------------------------------------------------- DOM */
  const el = {
    storeMap: document.getElementById("store-map"),
    deptBar: document.getElementById("dept-bar"),
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

  /* ====================================================================== */
  /*  PLAN DU MAGASIN (vue de dessus, SVG)                                   */
  /* ====================================================================== */
  /*
   * Chaque zone est une "pièce" du magasin. On y place des "cellules"
   * (les rayons / sous-zones) dessinées avec un motif évocateur :
   *   gondola  = rayons libre-service (gondoles centrales)
   *   counter  = comptoirs (frais traditionnel)
   *   fridge   = meubles froids (frais LS)
   *   bins     = bacs / îlots (fruits & légumes)
   *   racks    = portants / présentoirs (textile, culturel)
   *   checkout = ligne de caisses
   */
  const PLAN = {
    vb: [0, 0, 1340, 820],
    // Entrée du magasin (rendue à part, en façade)
    entrance: { x: 1180, y: 726, w: 124, h: 80 },
    zones: [
      // Fond de magasin : comptoirs frais traditionnel (pleine largeur)
      {
        id: "frais-trad",
        x: 36, y: 34, w: 1268, h: 140,
        cells: [
          { sub: "boucherie",   x: 52,  y: 74, w: 297, h: 84, pattern: "counter" },
          { sub: "poissonnerie",x: 365, y: 74, w: 297, h: 84, pattern: "counter" },
          { sub: "boulangerie", x: 678, y: 74, w: 297, h: 84, pattern: "counter" },
          { sub: "coupe",       x: 991, y: 74, w: 297, h: 84, pattern: "counter" },
        ],
      },
      // Colonne GAUCHE : Frais LS (haut) + Fruits & Légumes (bas)
      {
        id: "frais-ls",
        x: 36, y: 194, w: 250, h: 256,
        cells: [
          { sub: "cremerie-ls",    x: 52, y: 234, w: 218, h: 58, pattern: "fridge" },
          { sub: "charcuterie-ls", x: 52, y: 306, w: 218, h: 58, pattern: "fridge" },
          { sub: "surgeles",       x: 52, y: 378, w: 218, h: 58, pattern: "fridge" },
        ],
      },
      {
        id: "fl",
        x: 36, y: 470, w: 250, h: 236,
        cells: [
          { sub: "fl-sub", x: 52, y: 510, w: 218, h: 180, pattern: "bins" },
        ],
      },
      // Centre : PGC (4 rayons)
      {
        id: "pgc",
        x: 306, y: 194, w: 560, h: 512,
        cells: [
          { sub: "epicerie", x: 322, y: 236, w: 256, h: 210, pattern: "gondola" },
          { sub: "liquides", x: 594, y: 236, w: 256, h: 210, pattern: "gondola" },
          { sub: "dph",      x: 322, y: 470, w: 256, h: 220, pattern: "gondola" },
          { sub: "bazar",    x: 594, y: 470, w: 256, h: 220, pattern: "gondola" },
        ],
      },
      // Colonne DROITE : Espace Culturel (haut) + Textile & Maison (bas)
      {
        id: "culturel",
        x: 886, y: 194, w: 230, h: 256,
        cells: [
          { sub: "librairie",  x: 902, y: 234, w: 198, h: 96, pattern: "racks" },
          { sub: "multimedia", x: 902, y: 346, w: 198, h: 96, pattern: "racks" },
        ],
      },
      {
        id: "textile-maison",
        x: 886, y: 470, w: 230, h: 236,
        cells: [
          { sub: "textile", x: 902, y: 510, w: 198, h: 92, pattern: "racks" },
          { sub: "maison",  x: 902, y: 614, w: 198, h: 76, pattern: "racks" },
        ],
      },
      // Colonne EXTRÊME DROITE : Bricolage (nouveau secteur)
      {
        id: "bricolage",
        x: 1136, y: 194, w: 168, h: 512,
        cells: [
          { sub: "outillage", x: 1152, y: 236, w: 136, h: 150, pattern: "gondola" },
          { sub: "jardin",    x: 1152, y: 400, w: 136, h: 150, pattern: "bins" },
          { sub: "peinture",  x: 1152, y: 564, w: 136, h: 126, pattern: "gondola" },
        ],
      },
      // Façade : Caisses & Accueil (gauche) — Drive détaché — Entrée (droite)
      {
        id: "caisses",
        x: 36, y: 726, w: 700, h: 80,
        cells: [
          { sub: "ligne-caisses", x: 52,  y: 740, w: 432, h: 52, pattern: "checkout" },
          { sub: "accueil",       x: 500, y: 740, w: 220, h: 52, pattern: "plain" },
        ],
      },
      {
        id: "drive",
        x: 760, y: 726, w: 248, h: 80,
        cells: [
          { sub: "drive-prep", x: 776, y: 740, w: 216, h: 52, pattern: "drive" },
        ],
      },
    ],
  };

  /* ------------------------------------------------------- Couleurs utils */
  function parseHex(hex) {
    const h = hex.replace("#", "");
    const s = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const n = parseInt(s, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function toHex(r, g, b) {
    const f = (v) => Math.max(0, Math.min(255, Math.round(v)));
    return "#" + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
  }
  // Mélange une couleur vers une cible (t=0 => hex, t=1 => target)
  function mix(hex, target, t) {
    const a = parseHex(hex), b = parseHex(target);
    return toHex(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
  }
  const light = (c, t = 0.84) => mix(c, "#ffffff", t);
  const dark = (c, t = 0.28) => mix(c, "#000000", t);
  function shade(hex, percent) { return mix(hex, percent < 0 ? "#000000" : "#ffffff", Math.abs(percent) / 100); }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ------------------------------------------------------- Briques SVG */
  function rr(x, y, w, h, rx, attrs) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${attrs}/>`;
  }
  // Largeur estimée d'une pastille (icône + texte)
  function pillWidth(text, icon, fs) {
    const iconW = icon ? 21 : 0;
    return 12 + iconW + text.length * (fs * 0.62) + 14;
  }
  // Étiquette (pastille) : icône + texte. Largeur estimée ; si opts.maxW est
  // fourni, la taille de police est réduite pour que le texte tienne.
  function pill(x, y, text, icon, color, opts = {}) {
    let fs = opts.fs || 12.5;
    const iconW = icon ? 21 : 0;
    const padL = 12, padR = 14;
    const est = (f) => padL + iconW + text.length * (f * 0.62) + padR;
    if (opts.maxW && est(fs) > opts.maxW) {
      fs = Math.max(9, fs * (opts.maxW - padL - iconW - padR) / (text.length * fs * 0.62));
    }
    const w = est(fs);
    const h = opts.h || 24;
    const txtColor = opts.txtColor || "#fff";
    let out = `<g pointer-events="none">`;
    out += rr(x, y, w, h, h / 2, `fill="${color}"`);
    if (icon) out += `<text x="${x + 12}" y="${y + h / 2 + 5}" font-size="15">${icon}</text>`;
    out += `<text x="${x + 12 + iconW}" y="${y + h / 2 + 4.5}" font-size="${fs.toFixed(1)}" font-weight="700" fill="${txtColor}">${escapeHtml(text)}</text>`;
    out += `</g>`;
    return out;
  }

  /* ------------------------------------------- Motifs décoratifs par cellule */
  function decor(cell, color) {
    const stroke = dark(color, 0.15);
    const fill = light(color, 0.55);
    const { x, y, w, h } = cell;
    const g = (s) => `<g pointer-events="none">${s}</g>`;
    const labelH = 26; // espace réservé à l'étiquette en haut

    switch (cell.pattern) {
      case "gondola": {
        // Rayons = barres de gondoles horizontales
        const top = y + labelH + 6;
        const avail = h - labelH - 14;
        const rows = 3;
        const gap = avail / rows;
        let s = "";
        for (let i = 0; i < rows; i++) {
          const ry = top + i * gap;
          s += rr(x + 12, ry, w - 24, gap * 0.52, 4, `fill="${fill}" stroke="${stroke}" stroke-width="1.5"`);
          s += `<line x1="${x + w / 2}" y1="${ry}" x2="${x + w / 2}" y2="${ry + gap * 0.52}" stroke="${stroke}" stroke-width="1"/>`;
        }
        return g(s);
      }
      case "counter": {
        // Comptoir : bloc plein + vitrine
        const cy = y + labelH + 4;
        const ch = h - labelH - 12;
        let s = rr(x + 10, cy, w - 20, ch, 8, `fill="${fill}" stroke="${stroke}" stroke-width="1.5"`);
        s += rr(x + 10, cy + ch - 12, w - 20, 12, 4, `fill="${mix(color, "#ffffff", 0.35)}"`);
        return g(s);
      }
      case "fridge": {
        // Meuble froid : portes verticales
        let s = rr(x + 8, y + 6, w - 16, h - 12, 6, `fill="${fill}" stroke="${stroke}" stroke-width="1.5"`);
        const doors = 6;
        for (let i = 1; i < doors; i++) {
          const dx = x + 8 + ((w - 16) / doors) * i;
          s += `<line x1="${dx}" y1="${y + 8}" x2="${dx}" y2="${y + h - 8}" stroke="${stroke}" stroke-width="1"/>`;
        }
        return g(s);
      }
      case "bins": {
        // Îlots fruits & légumes : grille de bacs arrondis
        const cols = 3, rows = 3;
        const top = y + labelH + 8;
        const bw = (w - 24 - (cols - 1) * 10) / cols;
        const bh = (h - labelH - 20 - (rows - 1) * 10) / rows;
        let s = "";
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            s += rr(x + 12 + c * (bw + 10), top + r * (bh + 10), bw, bh, 8,
              `fill="${fill}" stroke="${stroke}" stroke-width="1.5"`);
        return g(s);
      }
      case "racks": {
        // Portants / présentoirs : rails verticaux
        const top = y + labelH + 4;
        const bh = h - labelH - 12;
        let s = "";
        const bars = 4;
        for (let i = 0; i < bars; i++) {
          const bx = x + 16 + ((w - 32) / bars) * (i + 0.5) - 5;
          s += rr(bx, top, 10, bh, 5, `fill="${fill}" stroke="${stroke}" stroke-width="1.5"`);
        }
        return g(s);
      }
      case "checkout": {
        // Ligne de caisses : tapis + tills
        const lanes = 8;
        const step = (w - 8) / lanes;
        let s = "";
        for (let i = 0; i < lanes; i++) {
          const lx = x + 6 + i * step;
          s += rr(lx, y + 8, step * 0.34, h - 16, 3, `fill="${fill}" stroke="${stroke}" stroke-width="1.3"`);
          s += `<line x1="${lx + step * 0.5}" y1="${y + 10}" x2="${lx + step * 0.5}" y2="${y + h - 10}" stroke="${stroke}" stroke-width="6" stroke-linecap="round" opacity="0.35"/>`;
        }
        return g(s);
      }
      case "drive": {
        // Drive : places de retrait (voitures)
        const slots = 3;
        const step = (w - 20) / slots;
        let s = "";
        for (let i = 0; i < slots; i++) {
          const sx = x + 12 + i * step;
          s += rr(sx, y + h - 26, step - 10, 18, 5, `fill="${fill}" stroke="${stroke}" stroke-width="1.3"`);
          s += `<text x="${sx + (step - 10) / 2}" y="${y + h - 12}" text-anchor="middle" font-size="12">🚗</text>`;
        }
        return g(s);
      }
      default:
        return "";
    }
  }

  /* ------------------------------------------------------ Rendu d'une cellule */
  function renderCell(cell, zone) {
    const meta = SUB_INDEX[cell.sub];
    const sub = meta ? meta.sub : { name: cell.sub, icon: "" };
    const color = zone.color;
    const bg = light(color, 0.9);
    const border = mix(color, "#ffffff", 0.35);

    let s = `<g class="plan-cell" data-zone="${zone.id}" data-sub="${cell.sub}" tabindex="0" role="button" aria-label="${escapeHtml(sub.name)}">`;
    // fond cliquable de la cellule
    s += rr(cell.x, cell.y, cell.w, cell.h, 12, `class="hoverable" fill="${bg}" stroke="${border}" stroke-width="1.5"`);
    // décor du rayon
    s += decor(cell, color);
    // étiquette du rayon (icône + nom), ajustée à la largeur de la cellule
    s += pill(cell.x + 10, cell.y + 8, sub.name, sub.icon, dark(color, 0.12), { maxW: cell.w - 8 });
    s += `</g>`;
    return s;
  }

  /* --------------------------------------------------------- Rendu d'une zone */
  function renderZone(zplan) {
    const zone = ZONE_INDEX[zplan.id];
    const color = zone.color;
    let s = `<g class="plan-zone">`;

    // "Pièce" = fond de zone, cliquable (ouvre la zone sans focus rayon)
    s += `<g class="plan-cell" data-zone="${zone.id}" tabindex="0" role="button" aria-label="${escapeHtml(zone.name)}">`;
    s += rr(zplan.x, zplan.y, zplan.w, zplan.h, 16,
      `class="hoverable" fill="${light(color, 0.94)}" stroke="${mix(color, "#ffffff", 0.2)}" stroke-width="2"`);
    s += `</g>`;

    // Titre de la zone (pastille posée sur le bord haut)
    const title = zone.name.toUpperCase();
    s += pill(zplan.x + 14, zplan.y - 13, title, zone.icon, color, { fs: 13, h: 28 });

    // Badge "département" sur le plan : uniquement les départements marqués
    // showOnPlan qui contiennent entièrement la zone (ex : le Frais / flocon).
    const planDepts = Object.values(DEPT_INDEX).filter((d) => d.showOnPlan && zoneFullyInDept(zone, d));
    let bx = zplan.x + 14 + pillWidth(title, zone.icon, 13) + 16;
    const by = zplan.y - 13 + 14;
    planDepts.forEach((dep) => {
      s += `<g class="plan-dept" data-dept="${dep.id}" tabindex="0" role="button" aria-label="Département ${escapeHtml(dep.name)}">`;
      s += `<title>Département ${escapeHtml(dep.name)} — cliquez pour voir</title>`;
      s += `<circle class="hoverable" cx="${bx}" cy="${by}" r="14" fill="${dep.color}" stroke="#fff" stroke-width="2"/>`;
      s += `<text x="${bx}" y="${by + 5}" text-anchor="middle" font-size="15" pointer-events="none">${dep.icon}</text>`;
      s += `</g>`;
      bx += 32;
    });

    // Cellules (rayons)
    zplan.cells.forEach((c) => { s += renderCell(c, zone); });

    s += `</g>`;
    return s;
  }

  // Entrée du magasin (façade)
  function renderEntrance() {
    const e = PLAN.entrance;
    if (!e) return "";
    let s = `<g pointer-events="none">`;
    s += rr(e.x, e.y, e.w, e.h, 12, `fill="#dcfce7" stroke="#22c55e" stroke-width="2" stroke-dasharray="6 5"`);
    s += `<text x="${e.x + e.w / 2}" y="${e.y + 32}" text-anchor="middle" font-size="22">🚪</text>`;
    s += `<text x="${e.x + e.w / 2}" y="${e.y + 54}" text-anchor="middle" font-size="12" font-weight="700" fill="#15803d">ENTRÉE</text>`;
    s += `<text x="${e.x + e.w / 2}" y="${e.y + 72}" text-anchor="middle" font-size="16" fill="#16a34a">▲</text>`;
    s += `</g>`;
    return s;
  }

  /* ---------------------------------------------- Barre des grandes catégories */
  function renderDeptBar() {
    if (!el.deptBar) return;
    const deps = Object.values(DEPT_INDEX);
    if (!deps.length) { el.deptBar.innerHTML = ""; return; }
    el.deptBar.innerHTML =
      `<span class="dept-bar__label">Grandes catégories :</span>` +
      deps
        .map((d) => `<button class="dept-chip" data-dept="${d.id}" style="--dc:${d.color}">
            <span class="dept-chip__icon">${d.icon}</span>${escapeHtml(d.name)}
          </button>`)
        .join("");
    el.deptBar.querySelectorAll("[data-dept]").forEach((b) =>
      b.addEventListener("click", () => openDepartment(b.getAttribute("data-dept"))));
  }

  /* ------------------------------------------------------------ Rendu du plan */
  function renderMap() {
    const [, , W, H] = PLAN.vb;
    let svg = `<svg class="plan-svg" viewBox="${PLAN.vb.join(" ")}" role="img"
      aria-label="Plan du magasin vu de dessus" preserveAspectRatio="xMidYMid meet">`;

    // Sol + murs extérieurs
    svg += rr(8, 8, W - 16, H - 16, 22, `fill="#eef1f6" stroke="#cbd5e1" stroke-width="2"`);
    svg += rr(16, 16, W - 32, H - 32, 18, `fill="none" stroke="#334155" stroke-width="6"`);

    // Zones
    PLAN.zones.forEach((z) => { svg += renderZone(z); });
    // Entrée
    svg += renderEntrance();

    svg += `</svg>`;
    el.storeMap.innerHTML = svg;

    // Interactions : badges "département" (avant les cellules pour priorité)
    el.storeMap.querySelectorAll(".plan-dept").forEach((g) => {
      const deptId = g.getAttribute("data-dept");
      const go = (e) => { e.stopPropagation(); openDepartment(deptId); };
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(e); }
      });
    });

    // Interactions : zones / rayons
    el.storeMap.querySelectorAll(".plan-cell").forEach((g) => {
      const zoneId = g.getAttribute("data-zone");
      const subId = g.getAttribute("data-sub");
      const go = () => openZone(zoneId, subId);
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
  }

  /* ====================================================================== */
  /*  NIVEAU 1 : détail d'une zone                                          */
  /* ====================================================================== */
  function openZone(zoneId, focusSubId) {
    const zone = ZONE_INDEX[zoneId];
    if (!zone) return;
    currentZone = zone;

    // Bandeaux départements (grandes catégories) auxquels appartient la zone.
    // Une zone peut relever de plusieurs départements (ex : PGC = alimentaire
    // pour épicerie/liquides ET non-alimentaire pour DPH/bazar).
    const deps = departmentsOfZone(zone);
    const depBanner = deps.length
      ? `<div class="dept-banners">` + deps.map((dep) => {
          const full = zoneFullyInDept(zone, dep);
          const txt = full
            ? `Fait partie du département <strong>${escapeHtml(dep.name)}</strong>`
            : `Certains rayons relèvent du département <strong>${escapeHtml(dep.name)}</strong>`;
          return `<button class="dept-banner" data-dept="${dep.id}" style="--dc:${dep.color}">
             <span class="dept-banner__icon">${dep.icon}</span>
             <span class="dept-banner__text">${txt}</span>
             <span class="dept-banner__cta">Voir →</span>
           </button>`;
        }).join("") + `</div>`
      : "";

    // Carte du responsable de secteur (métier de la grande catégorie)
    const mgr = zone.manager ? JOB_INDEX[zone.manager] : null;
    const mgrCard = mgr
      ? `<button class="manager-card" data-job="${mgr.id}" style="--c1:${zone.color};--c2:${shade(zone.color, -28)}">
           <span class="manager-card__icon">${mgr.photo.icon}</span>
           <span class="manager-card__text">
             <span class="manager-card__label">Responsable du secteur</span>
             <span class="manager-card__title">${escapeHtml(mgr.title)}</span>
           </span>
           <span class="manager-card__arrow">›</span>
         </button>`
      : "";

    el.zoneDetail.innerHTML = `
      <div class="zone-detail__head" style="--c1:${zone.color};--c2:${shade(zone.color, -28)}">
        <span class="icon">${zone.icon}</span>
        <div>
          <h2>${escapeHtml(zone.name)}</h2>
          <p>${escapeHtml(zone.description)}</p>
        </div>
      </div>
      ${depBanner}
      ${mgrCard}
      <div class="subzones">
        ${zone.subZones.map((sub, i) => renderSubzone(zone, sub, i)).join("")}
      </div>`;

    el.zoneDetail.querySelectorAll("[data-job]").forEach((btn) => {
      btn.addEventListener("click", () => openJob(btn.getAttribute("data-job")));
    });
    el.zoneDetail.querySelectorAll("[data-dept]").forEach((btn) => {
      btn.addEventListener("click", () => openDepartment(btn.getAttribute("data-dept")));
    });

    switchView("zone");
    renderBreadcrumb();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Met en avant le rayon cliqué sur le plan
    if (focusSubId) {
      const card = document.getElementById("sub-" + focusSubId);
      if (card) {
        card.classList.add("is-focus");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => card.classList.remove("is-focus"), 2200);
      }
    }
  }

  function renderSubzone(zone, sub, index) {
    const c1 = zone.color;
    const c2 = shade(zone.color, -28);
    return `
      <div class="subzone-card" id="sub-${sub.id}" style="animation-delay:${index * 0.06}s">
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

  /* ====================================================================== */
  /*  NIVEAU 2 : fiche métier                                               */
  /* ====================================================================== */
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
            const note = jobNote(pid);
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

    el.jobPanelBody.querySelectorAll("[data-job]").forEach((btn) => {
      btn.addEventListener("click", () => openJob(btn.getAttribute("data-job")));
    });

    openPanel();
    el.jobPanelBody.parentElement.scrollTop = 0;
  }

  /* ====================================================================== */
  /*  Département (grande catégorie) — fiche dans le panneau                */
  /* ====================================================================== */
  function openDepartment(deptId) {
    const dep = DEPT_INDEX[deptId];
    if (!dep) return;
    const mgr = dep.manager ? JOB_INDEX[dep.manager] : null;
    const [g1, g2] = mgr ? mgr.photo.gradient : [dep.color, shade(dep.color, -28)];

    // Regroupe les rayons membres par zone (gère l'appartenance partielle)
    const byZone = {};
    (dep.subZones || []).forEach((sid) => {
      const m = SUB_INDEX[sid];
      if (!m) return;
      (byZone[m.zone.id] = byZone[m.zone.id] || { zone: m.zone, subs: [] }).subs.push(m.sub);
    });
    const zonesHtml = Object.values(byZone)
      .map((g) => {
        const full = g.zone.subZones.length === g.subs.length;
        const note = full ? "Tout le secteur" : g.subs.map((s) => s.name).join(" · ");
        return `
          <button class="passerelle" data-zone="${g.zone.id}" data-sub="${g.subs[0].id}">
            <span class="passerelle__icon" style="--c1:${g.zone.color};--c2:${shade(g.zone.color, -28)}">${g.zone.icon}</span>
            <span>
              <span class="passerelle__title">${escapeHtml(g.zone.name)}</span><br>
              <span class="passerelle__note">${escapeHtml(note)}</span>
            </span>
            <span class="passerelle__arrow" style="margin-left:auto">→</span>
          </button>`;
      })
      .join("");

    el.jobPanelBody.innerHTML = `
      <div class="job-photo" style="--c1:${g1};--c2:${g2}">
        <span class="job-photo__emoji">${dep.icon}</span>
        <span class="job-photo__tag">Grande catégorie · département</span>
      </div>
      <div class="job-body">
        <span class="job-body__zone" style="--accent:${dep.color}">Département</span>
        <h2 id="job-panel-title">${escapeHtml(dep.name)}</h2>
        <div class="job-section">
          <h4>📝 Le département</h4>
          <p>${escapeHtml(dep.description)}</p>
        </div>
        ${mgr ? `
        <div class="job-section">
          <h4>🧑‍💼 À la tête du département</h4>
          <button class="manager-card" data-job="${mgr.id}" style="--c1:${dep.color};--c2:${shade(dep.color, -28)}">
            <span class="manager-card__icon">${mgr.photo.icon}</span>
            <span class="manager-card__text">
              <span class="manager-card__label">Le responsable</span>
              <span class="manager-card__title">${escapeHtml(mgr.title)}</span>
            </span>
            <span class="manager-card__arrow">›</span>
          </button>
        </div>` : ""}
        <div class="job-section">
          <h4>🗂️ Les secteurs regroupés</h4>
          <div class="passerelles">${zonesHtml}</div>
        </div>
      </div>`;

    el.jobPanelBody.querySelectorAll("[data-job]").forEach((b) =>
      b.addEventListener("click", () => openJob(b.getAttribute("data-job"))));
    el.jobPanelBody.querySelectorAll("[data-zone]").forEach((b) =>
      b.addEventListener("click", () => { closePanel(); openZone(b.getAttribute("data-zone"), b.getAttribute("data-sub")); }));

    openPanel();
    el.jobPanelBody.parentElement.scrollTop = 0;
  }

  /* ====================================================================== */
  /*  Vues, panneau, fil d'ariane                                          */
  /* ====================================================================== */
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
  renderDeptBar();
  renderMap();
  renderBreadcrumb();
})();
