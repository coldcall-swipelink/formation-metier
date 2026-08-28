/*
 * enseignes.js
 * ---------------------------------------------------------------------------
 * Onglet "Enseignes" : explorateur interactif.
 *   - une grille de toutes les enseignes (tuile logo + statut + priorité)
 *   - au clic : une fiche qui se découvre PAS À PAS (identité -> statut ->
 *     vocabulaire -> modèle -> prospection -> réseau), avec un "stepper".
 *
 * Les logos sont pour l'instant des tuiles de marque (couleur + nom stylisé).
 * Pour mettre de vrais logos : renseigner le champ `logo` d'une enseigne avec
 * le chemin de l'image (ex : "assets/logos/leclerc.svg") — le rendu bascule
 * automatiquement sur l'image.
 * ---------------------------------------------------------------------------
 */

window.Enseignes = (function () {
  "use strict";

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const STATUTS = {
    independant: { label: "Indépendant", cls: "st-indep", icon: "👤" },
    hybride: { label: "Hybride", cls: "st-hybride", icon: "⚗️" },
    integre: { label: "Intégré", cls: "st-integre", icon: "🏢" },
    mixte: { label: "Mixte — à vérifier", cls: "st-mixte", icon: "🔀" },
  };
  const PRIOS = {
    haute: { label: "⭐ Cible prioritaire", cls: "pr-haute" },
    moyenne: { label: "Priorité moyenne", cls: "pr-moyenne" },
    faible: { label: "Faible priorité", cls: "pr-faible" },
    verifier: { label: "À qualifier", cls: "pr-verifier" },
  };

  /* --------------------------------------------------------------- DONNÉES */
  // Chaque enseigne : identité + blocs de contenu (vocab / modele / prospection /
  // reseau). Les chapitres de la fiche sont assemblés par buildChapters().
  const ENSEIGNES = [
    {
      id: "leclerc", name: "E.Leclerc", wordmark: "Leclerc", group: "Mouvement E.Leclerc",
      color: "#0055a4", statut: "independant", prio: "haute", pdm: "≈ 24-25 % (n°1 français)",
      formats: "Hypers, supermarchés (Leclerc Express), drive",
      pitch: "Le n°1 du marché, 100 % indépendants. Notre cible n°1.",
      vocab: { term: "Adhérent", warn: "jamais « franchisé »", note: "Propriétaire de sa société, souvent une SAS." },
      modele: [
        "Trois étages sans lien capitalistique : <strong>ACDLec</strong> (association loi 1901, tête politique, possède la marque), <strong>Galec</strong> (centrale de référencement nationale) et surtout <strong>16 coopératives régionales (SCA)</strong> qui gèrent l'essentiel des achats et toute la logistique.",
        "Les SCA sont <strong>dirigées par des adhérents élus par leurs pairs</strong> : les adhérents d'une région se gouvernent entre eux.",
        "<strong>Parrainage obligatoire</strong> pour s'installer : il faut être parrainé, faire ses preuves, passer un comité d'agrément. Le parrain prend une <strong>part minoritaire au capital du filleul</strong> — des liens personnels et financiers réels.",
      ],
      prospection: [
        "Un <strong>patron qui décide vite</strong>, mais qui dépense son argent : viser le ROI immédiat, éviter les engagements longs.",
        "Entrer chez un adhérent Leclerc est difficile, mais y entrer c'est <strong>accéder à toute une lignée</strong> (parrain → filleuls).",
      ],
      reseau: "Réseau très dense (SCA régionales, assemblées, chaîne parrain/filleul). <strong>La recommandation d'un parrain vers ses filleuls est le levier le plus puissant du secteur.</strong> Densifier par zone.",
    },
    {
      id: "intermarche", name: "Intermarché", wordmark: "Intermarché", group: "Les Mousquetaires",
      logo: "assets/logos/mousquetaires.webp",
      color: "#e2001a", statut: "independant", prio: "haute", pdm: "≈ 17-18 % (avec Netto)",
      formats: "Supermarchés, Intermarché Contact / Express, hypers",
      pitch: "Chefs d'entreprise indépendants qui co-dirigent leur groupement.",
      vocab: { term: "Adhérent", warn: "", note: "Ou « chef d'entreprise ». Personne physique, propriétaire de sa société d'exploitation." },
      modele: [
        "Groupement <strong>Les Mousquetaires</strong> (Intermarché, Netto, Bricomarché, Roady…). <strong>ITM Entreprises</strong> détient les enseignes et les concède aux sociétés d'exploitation.",
        "Spécificité clé : <strong>chaque adhérent consacre ≈ un tiers de son temps (souvent 2 jours/semaine) à gérer le groupement</strong> — achats, logistique, publicité, usines agroalimentaires. C'est « l'indépendance dans l'interdépendance ».",
      ],
      prospection: [
        "⚠️ L'adhérent est <strong>souvent absent plusieurs jours/semaine</strong> : un directeur ou un adjoint tient la boutique. <strong>Identifier qui signe</strong> avant d'avancer.",
        "Même logique que Leclerc : patron qui décide, budget serré, ROI rapide.",
      ],
      reseau: "Les adhérents <strong>se croisent en permanence</strong> dans les instances du groupement et les bases régionales : interconnaissance extrêmement élevée. Le groupement recrute des centaines de nouveaux chefs d'entreprise/an (souvent d'anciens salariés du réseau).",
    },
    {
      id: "u", name: "Coopérative U", wordmark: "U", group: "Coopérative U",
      color: "#c8102e", statut: "independant", prio: "haute", pdm: "≈ 12-13 %",
      formats: "Hyper U, Super U, U Express, Utile",
      pitch: "Associés-coopérateurs très attachés à leur indépendance.",
      vocab: { term: "Associé", warn: "avec une majuscule", note: "Le mot « associé » a du sens pour eux — employez-le." },
      modele: [
        "Ex-Système U. Repose sur <strong>quatre coopératives régionales — Ouest, Nord-Ouest, Est, Sud</strong> — dont chaque magasin est associé-coopérateur. Depuis 2017, les fonctions commerciales/support sont regroupées dans <strong>U Enseigne</strong>.",
        "Fonctionnement purement coopératif : <strong>« un homme, une voix »</strong>, quel que soit le poids du magasin. Un Utile de 300 m² pèse autant qu'un Hyper U dans les votes.",
        "Les structures <strong>Expan U</strong> facilitent l'installation via le parrainage financier — encore des liens personnels durables.",
      ],
      prospection: [
        "Patron indépendant qui décide, priorité haute.",
        "<strong>Culturel :</strong> l'implication dans le groupement est un pilier identitaire. Valoriser leur statut d'indépendant.",
      ],
      reseau: "Coopératives régionales, assemblées et votes, parrainage financier : des liens durables entre associés. La reco entre associés d'une même coopérative porte fort.",
    },
    {
      id: "netto", name: "Netto", wordmark: "Netto", group: "Les Mousquetaires",
      logo: "assets/logos/mousquetaires.webp",
      color: "#e2001a", statut: "independant", prio: "moyenne", pdm: "inclus dans Les Mousquetaires",
      formats: "Maxidiscompte (petits formats)",
      pitch: "Format discount des Mousquetaires : même modèle adhérent, effectifs plus réduits.",
      vocab: { term: "Adhérent", warn: "", note: "Ou « chef d'entreprise », comme Intermarché." },
      modele: [
        "Enseigne maxidiscompte du groupement <strong>Les Mousquetaires</strong>, exploitée par des adhérents indépendants (même cadre qu'Intermarché).",
      ],
      prospection: [
        "Même logique adhérent qu'Intermarché, mais <strong>petits formats et effectifs réduits</strong> → besoins de recrutement plus limités, priorité moyenne.",
      ],
      reseau: "Même réseau très interconnecté que les Mousquetaires.",
    },
    {
      id: "carrefour-prox", name: "Carrefour Market / Contact", wordmark: "Carrefour Market", group: "Carrefour",
      color: "#2563eb", statut: "independant", prio: "haute", pdm: "part du groupe Carrefour ≈ 21-22 %",
      formats: "Supermarchés (Market), proximité (Contact, City, Express)",
      pitch: "Très majoritairement exploités par des franchisés indépendants — une vraie cible.",
      vocab: { term: "Franchisé", warn: "", note: "Chef d'entreprise indépendant qui exploite le magasin sous enseigne Carrefour." },
      modele: [
        "La proximité et les supermarchés Carrefour (Market, Contact, City, Express) sont <strong>très majoritairement en franchise</strong> : exploités par des <strong>franchisés indépendants</strong> qui recrutent et décident chez eux.",
      ],
      prospection: [
        "<strong>Cible :</strong> le franchisé est un patron indépendant — décision rapide, budget serré, ROI immédiat, comme un adhérent.",
        "Vérifier tout de même que le point de vente est bien franchisé (une minorité reste intégrée).",
      ],
      reseau: "Réseau de franchisés moins fédéré que les coopératives, mais les franchisés d'une zone se connaissent : la recommandation joue.",
    },
    {
      id: "carrefour-hyper", name: "Carrefour (hypermarché)", wordmark: "Carrefour", group: "Carrefour",
      color: "#1e40af", statut: "hybride", prio: "moyenne", pdm: "part du groupe ≈ 21-22 %",
      formats: "Hypermarchés",
      pitch: "Modèle hybride : une partie intégrée, une part croissante en franchise / location-gérance.",
      vocab: { term: "Franchisé ou directeur", warn: "selon le magasin", note: "Franchise/location-gérance = un indépendant décide ; intégré = un directeur salarié." },
      modele: [
        "Le parc d'hypers Carrefour est <strong>hybride</strong> : certains restent <strong>intégrés</strong> (directeur salarié, décisions au siège), une <strong>part croissante passe en franchise ou location-gérance</strong>, confiée à des exploitants indépendants.",
      ],
      prospection: [
        "<strong>À qualifier :</strong> identifier si l'hyper est intégré ou en franchise/location-gérance.",
        "Si exploité par un indépendant : décideur autonome, bonne cible. Si intégré : cycle long, faible autonomie en magasin.",
      ],
      reseau: null,
    },
    {
      id: "auchan", name: "Auchan", wordmark: "Auchan", group: "Auchan Retail", client: true,
      color: "#d43f2a", statut: "integre", prio: "faible", pdm: "≈ 7-8 %",
      formats: "Hypers, supermarchés, proximité",
      pitch: "Groupe intégré : RH interne, décisions centralisées.",
      vocab: null,
      modele: [
        "Groupe <strong>intégré</strong> : magasins détenus par le groupe, directeurs salariés, RH interne, décisions centralisées.",
      ],
      prospection: [
        "<strong>Faible priorité :</strong> pas de décideur autonome en magasin sur nos sujets, cycle long.",
      ],
      reseau: null,
    },
    {
      id: "lidl", name: "Lidl", wordmark: "Lidl", group: "Schwarz Groupe",
      color: "#0050aa", statut: "integre", prio: "faible", pdm: "≈ 8 %",
      formats: "Hard discount",
      pitch: "Hard discount intégré : tout est centralisé.",
      vocab: null,
      modele: [
        "Enseigne <strong>intégrée</strong> et centralisée : achats et RH pilotés en interne. Effectifs réduits, polyvalence maximale.",
      ],
      prospection: [
        "<strong>Faible priorité :</strong> aucune autonomie d'achat en magasin, tout remonte à la centrale.",
      ],
      reseau: null,
    },
    {
      id: "aldi", name: "Aldi", wordmark: "Aldi", group: "Aldi",
      color: "#00457c", statut: "integre", prio: "faible", pdm: "hard discount",
      formats: "Hard discount",
      pitch: "Hard discount intégré, même logique que Lidl.",
      vocab: null,
      modele: [
        "Enseigne <strong>intégrée</strong> et centralisée, effectifs réduits et très polyvalents.",
      ],
      prospection: [
        "<strong>Faible priorité :</strong> décisions centralisées, pas d'interlocuteur autonome en magasin.",
      ],
      reseau: null,
    },
    {
      id: "casino", name: "Monoprix / Franprix / Casino", wordmark: "Casino", group: "Groupe Casino", client: true,
      color: "#6d6e71", statut: "integre", prio: "faible", pdm: "résiduel et en recul",
      formats: "Supermarchés, proximité urbaine",
      pitch: "Groupe intégré en recul ; quelques proximités en franchise.",
      vocab: null,
      modele: [
        "Groupe <strong>intégré</strong> (Monoprix, Franprix, Casino), avec de la <strong>franchise en proximité</strong>. Groupe fragilisé et en recul — beaucoup de magasins ont changé de mains récemment.",
      ],
      prospection: [
        "<strong>Faible priorité</strong> sur les intégrés. Les proximités franchisées sont à qualifier au cas par cas.",
      ],
      reseau: null,
    },
  ];

  /* ------------------------------------------------------------- Couleurs */
  function parseHex(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function contrast(hex) {
    const [r, g, b] = parseHex(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? "#111827" : "#ffffff";
  }

  // Rend une tuile de marque (nom stylisé). Si un vrai fichier logo existe dans
  // assets/logos/, hydrateLogos() le détecte et remplace la tuile par l'image.
  function logoTile(e, big) {
    const cls = "ens-logo ens-logo--wm" + (big ? " ens-logo--big" : "");
    const src = e.logo ? ` data-logo-src="${e.logo}"` : "";
    return `<span class="${cls}" style="--bc:${e.color};color:${contrast(e.color)}" data-logo-id="${e.id}"${src}>${esc(e.wordmark || e.name)}</span>`;
  }

  // Cherche un logo image pour chaque tuile (assets/logos/<id>.svg puis .png,
  // ou le chemin `logo` explicite) et remplace la tuile texte s'il existe.
  function hydrateLogos() {
    root.querySelectorAll(".ens-logo[data-logo-id]").forEach((tile) => {
      const id = tile.getAttribute("data-logo-id");
      const explicit = tile.getAttribute("data-logo-src");
      const candidates = explicit
        ? [explicit]
        : ["assets/logos/" + id + ".webp", "assets/logos/" + id + ".svg", "assets/logos/" + id + ".png"];
      let i = 0;
      const probe = new Image();
      probe.onload = () => {
        tile.classList.remove("ens-logo--wm");
        tile.classList.add("ens-logo--img");
        tile.textContent = "";
        const img = document.createElement("img");
        img.src = probe.src;
        img.alt = id;
        tile.appendChild(img);
      };
      probe.onerror = () => { i += 1; if (i < candidates.length) probe.src = candidates[i]; };
      probe.src = candidates[0];
    });
  }

  /* ------------------------------------------------- Chapitres d'une fiche */
  function buildChapters(e) {
    const st = STATUTS[e.statut];
    const pr = PRIOS[e.prio];
    const ch = [];

    // 1. Carte d'identité
    ch.push({
      icon: "🪪", title: "Carte d'identité",
      html: `
        <ul class="ens-facts">
          <li><span>Groupe</span><strong>${esc(e.group)}</strong></li>
          <li><span>Statut</span><strong>${st.icon} ${st.label}</strong></li>
          <li><span>Formats</span><strong>${esc(e.formats)}</strong></li>
          <li><span>Part de marché</span><strong>${esc(e.pdm)}</strong></li>
          <li><span>Priorité commerciale</span><strong>${pr.label}</strong></li>
        </ul>
        <p class="ens-pitch">${esc(e.pitch)}</p>`,
    });

    // 2. Intégré ou indépendant
    const statutText = {
      independant: "Le magasin appartient à une <strong>personne</strong> : un entrepreneur qui a investi son argent, recrute qui il veut et <strong>décide seul</strong>. On parle à un <strong>patron qui décide</strong> — un « oui » peut tomber dès le premier rendez-vous, mais il regarde le prix de près.",
      integre: "Le magasin appartient au <strong>groupe</strong>. Le patron est un <strong>salarié</strong> qui applique une stratégie décidée ailleurs et fait valider ses achats par des services centraux. On parle à un <strong>directeur qui exécute</strong> — cycle long, faible autonomie.",
      hybride: "Le parc est <strong>mixte</strong> : une partie est intégrée (directeur salarié), une part est confiée à des <strong>indépendants</strong> (franchise, location-gérance) qui décident chez eux. <strong>À qualifier au cas par cas</strong> — mais il y a de vraies cibles.",
      mixte: "Selon le magasin, il peut être <strong>intégré</strong> (exploité par le groupe) ou <strong>franchisé</strong> (exploité par un indépendant). <strong>Ce n'est pas la même conversation</strong> : il faut qualifier le statut avant d'appeler.",
    }[e.statut];
    ch.push({
      icon: st.icon, title: "Intégré ou indépendant ?",
      html: `<div class="ens-statut ens-statut--${e.statut}"><strong>${st.label}.</strong> ${statutText}</div>`,
    });

    // 3. Vocabulaire
    if (e.vocab) {
      ch.push({
        icon: "🗣️", title: "Le bon vocabulaire",
        html: `
          <p>Comment appeler le dirigeant :</p>
          <div class="ens-term"><span class="ens-term__badge" style="--bc:${e.color};color:${contrast(e.color)}">${esc(e.vocab.term)}</span>${e.vocab.warn ? `<span class="ens-term__warn">${esc(e.vocab.warn)}</span>` : ""}</div>
          ${e.vocab.note ? `<p class="ens-muted">${e.vocab.note}</p>` : ""}
          <div class="ens-callout ens-callout--warn"><span>🚫</span><p>Se tromper de terme signale qu'on ne connaît pas le secteur — et ça coûte cher.</p></div>`,
      });
    }

    // 4. Le modèle
    if (e.modele && e.modele.length) {
      ch.push({
        icon: "⚙️", title: "Le modèle & l'organisation",
        html: e.modele.map((p) => `<p>${p}</p>`).join(""),
      });
    }

    // 5. Prospection
    if (e.prospection && e.prospection.length) {
      ch.push({
        icon: "🧭", title: "Comment prospecter",
        html: `<ul class="ens-list">${e.prospection.map((p) => `<li>${p}</li>`).join("")}</ul>`,
      });
    }

    // 6. Effet réseau
    if (e.reseau) {
      ch.push({
        icon: "🔗", title: "Effet réseau",
        html: `<p>${e.reseau}</p>`,
      });
    }

    return ch;
  }

  /* --------------------------------------------------------------- ÉTAT */
  let root = null;
  let filter = "tous";
  let current = null; // enseigne ouverte
  let step = 0;

  const FILTERS = [
    ["tous", "Toutes"],
    ["independant", "👤 Indépendants (cibles)"],
    ["hybride", "⚗️ Hybrides"],
    ["integre", "🏢 Intégrés"],
  ];

  /* ------------------------------------------------------------- GRILLE */
  function renderGrid() {
    const list = ENSEIGNES.filter((e) => filter === "tous" || e.statut === filter);
    const cards = list.map((e) => {
      const st = STATUTS[e.statut], pr = PRIOS[e.prio];
      return `
        <button class="ens-card${e.client ? " ens-card--client" : ""}" data-open="${e.id}">
          ${logoTile(e)}
          <div class="ens-card__body">
            <div class="ens-card__name">${esc(e.name)}</div>
            <div class="ens-card__group">${esc(e.group)}</div>
            <div class="ens-card__badges">
              <span class="ens-badge ${st.cls}">${st.icon} ${st.label}</span>
              <span class="ens-badge ${pr.cls}">${pr.label}</span>
              ${e.client ? `<span class="ens-badge ens-badge--client">✅ Déjà client</span>` : ""}
            </div>
          </div>
          <span class="ens-card__go">›</span>
        </button>`;
    }).join("");

    return `
      <div class="ens-wrap">
        <div class="ens-hero">
          <h1>🏷️ Explorateur d'enseignes</h1>
          <p>Cliquez une enseigne pour découvrir pas à pas son statut, son modèle, le bon vocabulaire et la façon de la prospecter.</p>
        </div>
        <div class="ens-filters">
          ${FILTERS.map((f) => `<button class="ens-filter${filter === f[0] ? " is-active" : ""}" data-filter="${f[0]}">${esc(f[1])}</button>`).join("")}
        </div>
        <div class="ens-grid">${cards}</div>
      </div>`;
  }

  /* -------------------------------------------------------------- FICHE */
  function renderDetail(e) {
    const chapters = buildChapters(e);
    const total = chapters.length;
    step = Math.max(0, Math.min(step, total - 1));
    const c = chapters[step];
    const st = STATUTS[e.statut], pr = PRIOS[e.prio];

    const dots = chapters.map((_, i) =>
      `<span class="ens-dot${i === step ? " is-active" : ""}${i < step ? " is-done" : ""}"></span>`).join("");
    const pills = chapters.map((ch, i) =>
      `<button class="ens-pill${i === step ? " is-active" : ""}" data-step="${i}">${ch.icon} ${esc(ch.title)}</button>`).join("");

    return `
      <div class="ens-wrap">
        <button class="ens-back" data-back>← Toutes les enseignes</button>
        <div class="ens-detail${e.client ? " ens-detail--client" : ""}" style="--ec:${e.color}">
          <header class="ens-detail__head">
            ${logoTile(e, true)}
            <div>
              <h2>${esc(e.name)}</h2>
              <div class="ens-detail__group">${esc(e.group)}</div>
              <div class="ens-card__badges">
                <span class="ens-badge ${st.cls}">${st.icon} ${st.label}</span>
                <span class="ens-badge ${pr.cls}">${pr.label}</span>
                ${e.client ? `<span class="ens-badge ens-badge--client">✅ Déjà client</span>` : ""}
              </div>
            </div>
          </header>

          <div class="ens-stepper">
            <div class="ens-stepper__top">
              <span class="ens-step-count">Étape ${step + 1} / ${total}</span>
              <div class="ens-dots">${dots}</div>
            </div>
            <div class="ens-pills">${pills}</div>
          </div>

          <article class="ens-chapter">
            <h3>${c.icon} ${esc(c.title)}</h3>
            <div class="ens-chapter__body">${c.html}</div>
          </article>

          <div class="ens-nav">
            <button class="ens-nav__btn" data-step="${step - 1}" ${step === 0 ? "disabled" : ""}>← Précédent</button>
            <span class="ens-nav__label">${esc(c.title)}</span>
            <button class="ens-nav__btn ens-nav__btn--primary" data-step="${step + 1}" ${step === total - 1 ? "disabled" : ""}>Suivant →</button>
          </div>
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------- RENDU + WIRE */
  function paint() {
    root.innerHTML = current ? renderDetail(current) : renderGrid();
    wire();
    hydrateLogos();
  }

  function wire() {
    if (!current) {
      root.querySelectorAll("[data-filter]").forEach((b) =>
        b.addEventListener("click", () => { filter = b.getAttribute("data-filter"); paint(); }));
      root.querySelectorAll("[data-open]").forEach((b) =>
        b.addEventListener("click", () => {
          current = ENSEIGNES.find((e) => e.id === b.getAttribute("data-open"));
          step = 0; paint();
          root.scrollIntoView({ behavior: "smooth", block: "start" });
        }));
    } else {
      const back = root.querySelector("[data-back]");
      if (back) back.addEventListener("click", () => { current = null; paint(); });
      root.querySelectorAll("[data-step]").forEach((b) =>
        b.addEventListener("click", () => {
          if (b.hasAttribute("disabled")) return;
          const n = parseInt(b.getAttribute("data-step"), 10);
          if (!isNaN(n)) { step = n; paint(); }
        }));
    }
  }

  function render(container) {
    root = container;
    // (ré)initialise sur la grille à chaque première ouverture de l'onglet
    if (!root.dataset.init) { current = null; filter = "tous"; step = 0; root.dataset.init = "1"; }
    paint();
  }

  return { render };
})();
