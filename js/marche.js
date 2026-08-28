/*
 * marche.js
 * ---------------------------------------------------------------------------
 * Onglet "Formation Marché" : page pédagogique sur les spécificités du marché
 * de la grande distribution (intégré vs indépendant, adhérents, centrales
 * régionales, comportement des décisionnaires, effet réseau, etc.).
 *
 * Tout le contenu est centralisé ici pour être facile à modifier.
 * ---------------------------------------------------------------------------
 */

(function () {
  "use strict";

  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ====================================================================== */
  /*  CONTENU                                                               */
  /* ====================================================================== */

  // 1.1 Parts de marché (Worldpanel / NielsenIQ, début 2026)
  const SHARES = [
    { g: "E.Leclerc", pct: 24.5, label: "~24-25 %", statut: "Indépendants (coopérative)", color: "#0055a4", indep: true },
    { g: "Groupe Carrefour", pct: 21.5, label: "~21-22 %", statut: "Mixte : intégré + franchisés", color: "#2563eb", indep: false },
    { g: "Les Mousquetaires (Intermarché, Netto)", pct: 17.5, label: "~17-18 %", statut: "Indépendants (commerce associé)", color: "#e2001a", indep: true },
    { g: "Coopérative U", pct: 12.5, label: "~12-13 %", statut: "Indépendants (coopérative)", color: "#c8102e", indep: true },
    { g: "Lidl", pct: 8, label: "~8 %", statut: "Intégré", color: "#0050aa", indep: false },
    { g: "Auchan", pct: 7.5, label: "~7-8 %", statut: "Intégré", color: "#d43f2a", indep: false },
    { g: "Casino / Monoprix / Franprix", pct: 3, label: "résiduel, en recul", statut: "Intégré", color: "#6d6e71", indep: false },
  ];

  const RECOMPO = [
    "La chute de <strong>Casino</strong> a libéré des centaines de magasins, repris par Intermarché, Auchan et Carrefour.",
    "<strong>Carrefour</strong> a absorbé <strong>Cora et Match</strong> — ce qui consolide sa place de dauphin.",
    "<strong>Intermarché</strong> a repris le parc <strong>Colruyt France</strong>.",
    "<strong>U</strong> a intégré <strong>Schiever</strong>.",
  ];

  const FORMATS = [
    { icon: "🏬", name: "Hypermarché", surf: "> 2 500 m²", desc: "150 à 400 salariés, structure la plus lourde, souvent un RH dédié.", target: false },
    { icon: "🛒", name: "Supermarché", surf: "400 – 2 500 m²", desc: "40 à 120 salariés, pas de RH : le directeur décide.", target: true },
    { icon: "🏪", name: "Proximité / supérette", surf: "< 400 m²", desc: "5 à 20 salariés, très peu de moyens.", target: false },
    { icon: "🚗", name: "Drive", surf: "—", desc: "Accolé ou déporté, forte main-d'œuvre, turnover record.", target: false },
    { icon: "🏷️", name: "Hard discount", surf: "800 – 1 400 m²", desc: "Lidl, Aldi, Netto. Effectifs réduits, polyvalence maximale.", target: false },
  ];

  const CARACT = [
    { icon: "📉", t: "Marges nettes très faibles", d: "On raisonne en pourcentages à un chiffre, souvent bas. Le métier se joue sur les volumes et la maîtrise des coûts. Toute dépense est examinée à la loupe — y compris la nôtre." },
    { icon: "⚔️", t: "Guerre des prix permanente", d: "Les enseignes se comparent en continu. Ce climat déteint sur les négociations : le prospect négociera, par réflexe culturel." },
    { icon: "👥", t: "Intensité de main-d'œuvre extrême", d: "Le personnel est le premier poste de coût variable après la marchandise. Un poste vacant, c'est du chiffre d'affaires perdu immédiatement." },
    { icon: "📍", t: "Business hyper-local", d: "Chaque magasin vit sur sa zone de chalandise. Le directeur connaît sa ville, ses concurrents, son bassin d'emploi. Il ne raisonne pas « national »." },
    { icon: "📅", t: "Forte saisonnalité", d: "Fêtes de fin d'année, été, rentrée. Ces pics dictent l'agenda du magasin — et donc les bons et les mauvais moments pour l'appeler." },
  ];

  // 3. Intégré vs indépendant — tableau comparatif
  const VS_ROWS = [
    ["Propriétaire", "Le groupe", "Un entrepreneur, personne physique"],
    ["Dirigeant", "Directeur salarié", "Le propriétaire lui-même, ou un directeur qu'il salarie"],
    ["Qui décide d'un achat logiciel", "Siège / DRH régionale / achats", "Le propriétaire, seul"],
    ["Cycle de décision", "3 à 12 mois, appels d'offres, juridique, sécurité", "1 à 3 rendez-vous, parfois une seule réunion"],
    ["Outils", "Imposés par le groupe", "Libre choix total, mais conseils du siège"],
    ["Budget", "Ligne budgétaire dédiée, plus confortable", "Serré, c'est son argent personnel"],
    ["Sensibilité au prix", "Moyenne", "Très forte"],
    ["Notre approche", "Long, difficile, faible taux de conversion", "Notre cible prioritaire"],
    ["Enseignes", "Hypers Carrefour, Auchan, Lidl, Monoprix, Franprix", "Leclerc, Intermarché, Netto, U, Carrefour Market/Contact franchisés"],
  ];

  const VOCAB = [
    ["E.Leclerc", "Adhérent", "jamais « franchisé »"],
    ["Intermarché / Netto", "Adhérent", "ou « chef d'entreprise »"],
    ["Coopérative U", "Associé", "avec une majuscule dans leur communication"],
    ["Carrefour Market / Contact", "Franchisé", ""],
  ];

  const QUALIF = [
    ["L'adhérent est en magasin tous les jours", "Lui, directement. Aucun intermédiaire."],
    ["Plusieurs magasins, un directeur par site", "Le directeur a une délégation opérationnelle, <strong>mais rarement sur les engagements financiers</strong>. Il faut son accord, puis celui du propriétaire."],
    ["Le directeur est un « bras droit » historique", "Son avis est décisif. C'est un prescripteur, à traiter comme un décideur."],
  ];

  const INDEP_LIBRE = [
    "<strong>Le recrutement</strong> — ses effectifs, ses profils, ses méthodes, ses prestataires",
    "<strong>Ses fournisseurs de services</strong> — logiciels, intérim, cabinets, maintenance, sécurité, énergie",
    "<strong>Ses investissements</strong> — travaux, matériel, outils",
    "<strong>Son assortiment local</strong>, ses producteurs locaux, une partie de sa politique prix",
    "<strong>Son organisation interne</strong> — horaires, planning, management",
  ];

  const BUDGET = [
    "<strong>Pas de budget « transformation RH » ou « innovation ».</strong> Notre dépense doit se substituer à une dépense existante ou se justifier par un gain immédiat.",
    "<strong>Il compare à ce qu'il connaît :</strong> le coût d'une annonce Indeed, le coefficient de l'intérim, les honoraires d'un cabinet, le temps passé par son adjoint.",
    "<strong>Il veut du ROI visible et rapide</strong>, pas une projection à 18 mois.",
    "<strong>Il se méfie des abonnements et engagements longs.</strong> Le 24/36 mois est un point de friction majeur : il préfère tester d'abord.",
    "<strong>Il négociera</strong>, quasi systématiquement. C'est culturel, ce n'est pas un signal de désintérêt.",
  ];

  // 5. Centrales régionales
  const CENTRALES = [
    {
      ens: "E.Leclerc", color: "#0055a4", sub: "Le mouvement le plus structuré",
      body: [
        "Trois étages sans lien capitalistique : l'<strong>ACDLec</strong> (association loi 1901) est la tête politique et possède la marque ; le <strong>Galec</strong> est la centrale de référencement nationale ; et surtout <strong>16 sociétés coopératives régionales (SCA)</strong> assurent l'essentiel des achats et toute la logistique.",
        "Ces 16 SCA sont <strong>dirigées par des adhérents élus par leurs pairs</strong> : les adhérents d'une même région se gouvernent entre eux, en assemblées et commissions régionales.",
        "<strong>Le parrainage :</strong> on ne devient pas adhérent en achetant un magasin. Il faut être parrainé, avoir fait ses preuves, passer un comité d'agrément. Le parrain prend une participation minoritaire au capital du filleul. Le réseau est fait de liens personnels et financiers réels.",
      ],
      pin: "Entrer chez un adhérent Leclerc est difficile, mais y entrer c'est accéder à toute une lignée. La reco d'un parrain vers ses filleuls est le levier le plus puissant du secteur.",
    },
    {
      ens: "Intermarché", color: "#e2001a", sub: "Les Mousquetaires — la co-direction",
      body: [
        "Le <strong>Groupement Les Mousquetaires</strong> (Intermarché, Netto, Bricomarché, Roady…) rassemble plus de 3 000 chefs d'entreprise indépendants. <strong>ITM Entreprises</strong> détient les enseignes et les concède aux sociétés d'exploitation.",
        "Spécificité clé : <strong>chaque adhérent consacre une partie de son temps (≈ un tiers, souvent 2 jours/semaine) à la gestion du groupement</strong> — achats, logistique, publicité, informatique, usines agroalimentaires. C'est « l'indépendance dans l'interdépendance ».",
        "Conséquences terrain : l'adhérent est <strong>souvent absent plusieurs jours/semaine</strong> (un directeur ou adjoint tient la boutique — identifier lequel), et ces adhérents <strong>se croisent en permanence</strong> : interconnaissance extrêmement élevée.",
      ],
      pin: "Groupement structuré en régions, chacune pilotée par un adhérent élu. Il recrute plusieurs centaines de nouveaux chefs d'entreprise par an, souvent d'anciens salariés du réseau.",
    },
    {
      ens: "Coopérative U", color: "#c8102e", sub: "Le modèle coopératif de l'associé",
      body: [
        "Ex-Système U. Repose sur <strong>quatre coopératives régionales — Ouest, Nord-Ouest, Est, Sud</strong> — dont chaque magasin est associé-coopérateur. Depuis 2017, les fonctions commerciales/support sont regroupées dans <strong>U Enseigne</strong>.",
        "Fonctionnement purement coopératif : <strong>« un homme, une voix »</strong>, quel que soit le poids du magasin. Un Utile de 300 m² pèse autant qu'un Hyper U dans les votes.",
        "Enseignes : <strong>Hyper U, Super U, U Express, Utile</strong>. Les structures <strong>Expan U</strong> facilitent l'installation via le parrainage financier — encore des liens personnels durables.",
      ],
      pin: "Culturel : l'implication des associés est un pilier identitaire. Ils sont très attachés au statut d'indépendant. Le mot « associé » a du sens — employez-le.",
    },
  ];

  // 6. Comportement des décisionnaires
  const COMPORT = [
    { icon: "🎯", t: "Très directs", d: "Pas de langue de bois : on vous coupe, on vous dit « ça ne m'intéresse pas », on demande le prix en deux minutes. Ce n'est pas de l'agressivité, c'est de l'efficacité. Le tutoiement arrive vite. Un « non » est un vrai non ; un « rappelle-moi en septembre » est souvent sincère." },
    { icon: "🔢", t: "Concrets", d: "Ils veulent des chiffres, des délais, des noms de magasins — pas des concepts. « Ça marche chez qui, près d'ici ? » est souvent la première vraie question. Bannir « solution innovante », « disruption », « expérience candidat augmentée ». Trois métriques : coût, temps gagné, postes pourvus." },
    { icon: "🧠", t: "Ils testent votre connaissance du métier", d: "Dans les deux premières minutes, ils évaluent si vous connaissez leur monde. Ne pas savoir ce qu'est un ELS, un rayon coupe, ou un adhérent vs un intégré = conversation terminée. À l'inverse, une phrase juste (« vous devez galérer sur la boucherie, non ? ») fait basculer la crédibilité." },
    { icon: "🛡️", t: "Sur-sollicités", d: "Démarchés en permanence (énergie, télécoms, sécurité, logiciels…), avec un accueil formé à filtrer. Le message doit être différenciant dès la première phrase. Une reco de confrère fait sauter le filtrage. Le terrain fonctionne mieux que le téléphone." },
  ];

  const TIMING = [
    ["Samedi (le gros jour de chiffre)", "Mardi, mercredi, jeudi"],
    ["Fêtes, rentrée, inventaire annuel", "Périodes creuses (janv.-févr., fin de printemps)"],
    ["Les heures de rush caisse", "Après le coup de feu du déjeuner"],
  ];

  // 7. Effet réseau
  const RESEAU_IMPL = [
    "<strong>Densifier par zone</strong> plutôt que s'éparpiller : 8 magasins d'un même département valent mieux que 8 dispersés. La 2ᵉ signature est plus facile que la 1ʳᵉ, la 5ᵉ presque évidente.",
    "<strong>Toujours demander la recommandation nommée</strong> : pas « vous connaissez quelqu'un ? » mais « à qui vous en parleriez, dans votre coopérative ? ». Et demander l'autorisation d'utiliser son nom.",
    "<strong>Cartographier les liens</strong> : parrain/filleul, multi-magasins, même SCA / coopérative régionale. Ces infos valent de l'or — dans le CRM.",
    "<strong>Cibler les figures du réseau</strong> : un adhérent qui siège en instance régionale, possède plusieurs magasins ou parraine des filleuls est un point d'entrée démultiplicateur.",
  ];

  const RESEAU_REVERS = [
    "Un client mécontent peut nous <strong>griller sur toute une région</strong>.",
    "<strong>Ne jamais mentir sur nos références</strong> — ça se vérifie en un coup de fil, sanction définitive.",
    "Ne jamais <strong>dénigrer un confrère</strong> du prospect, même s'il le fait devant vous.",
    "Ne jamais <strong>dévoiler ce qu'un autre magasin nous a confié</strong> (recrutement, chiffres, turnover).",
    "<strong>Tenir ses engagements à la lettre</strong> — un rappel promis et pas fait se raconte.",
  ];

  // 8. Mémo enseignes
  const MEMO = [
    ["E.Leclerc", "Mouvement E.Leclerc", "Adhérents indépendants", "haute"],
    ["Intermarché", "Les Mousquetaires", "Adhérents indépendants", "haute"],
    ["Netto", "Les Mousquetaires", "Adhérents indépendants", "moyenne"],
    ["Super U / Hyper U", "Coopérative U", "Associés indépendants", "haute"],
    ["U Express / Utile", "Coopérative U", "Associés indépendants", "moyenne"],
    ["Carrefour Market / Contact", "Carrefour", "À vérifier : intégré ou franchisé", "verifier"],
    ["Carrefour hypermarché", "Carrefour", "Majoritairement intégré", "faible"],
    ["Auchan", "Auchan Retail", "Intégré", "faible"],
    ["Lidl / Aldi", "Intégré", "Achats centralisés, RH interne", "faible"],
    ["Monoprix / Franprix / Casino", "Casino", "Intégré + franchise proximité", "faible"],
  ];

  const ERREURS = [
    "Dire « <strong>franchisé</strong> » à un adhérent Leclerc ou à un associé U.",
    "Traiter un adhérent comme un cadre salarié : <strong>c'est un patron, il a investi son argent</strong>.",
    "Arriver avec une <strong>présentation de 20 slides</strong> et un discours corporate.",
    "Ne pas savoir <strong>si le magasin est intégré ou indépendant</strong> avant d'appeler.",
    "Parler à un directeur salarié pendant trois rendez-vous <strong>sans avoir vérifié qui signe</strong>.",
    "<strong>Gonfler ses références</strong> — le réseau vérifie, toujours.",
  ];

  const SECTIONS = [
    ["s1", "1", "Le marché en un coup d'œil"],
    ["s2", "2", "Caractéristiques structurantes"],
    ["s3", "3", "Intégré vs indépendant"],
    ["s4", "4", "Le modèle de l'adhérent"],
    ["s5", "5", "Les centrales régionales"],
    ["s6", "6", "Comportement des décisionnaires"],
    ["s7", "7", "L'effet réseau"],
    ["s8", "8", "Mémo enseignes"],
    ["s9", "9", "Les 6 erreurs qui tuent un RDV"],
  ];

  const PRIO = {
    haute: { label: "⭐ Haute", cls: "prio-haute" },
    moyenne: { label: "Moyenne", cls: "prio-moyenne" },
    faible: { label: "Faible", cls: "prio-faible" },
    verifier: { label: "À vérifier", cls: "prio-verifier" },
  };

  /* ====================================================================== */
  /*  RENDU                                                                 */
  /* ====================================================================== */

  function sectionHead(num, title, sub) {
    return `<div class="mkt-head">
      <span class="mkt-head__num">${num}</span>
      <div><h2>${esc(title)}</h2>${sub ? `<p>${sub}</p>` : ""}</div>
    </div>`;
  }

  function sharesChart() {
    const max = Math.max(...SHARES.map((s) => s.pct));
    const rows = SHARES.map((s) => `
      <div class="share-row">
        <div class="share-row__name">${esc(s.g)}${s.indep ? ` <span class="chip-indep">indépendant · cible</span>` : ""}</div>
        <div class="share-row__bar">
          <div class="share-row__fill" style="width:${(s.pct / max * 100).toFixed(1)}%;background:${s.color}"></div>
          <span class="share-row__val">${esc(s.label)}</span>
        </div>
        <div class="share-row__statut">${esc(s.statut)}</div>
      </div>`).join("");
    return `<div class="share-chart">${rows}</div>`;
  }

  function renderMarche() {
    const s1 = `
      <section class="mkt-section" id="s1">
        ${sectionHead("1", "Le marché en un coup d'œil")}
        <p class="mkt-lead">La distribution alimentaire pèse <strong>plusieurs centaines de milliards d'euros</strong> en France et compte parmi les <strong>tout premiers employeurs privés</strong> du pays. Le marché est verrouillé par une poignée de groupes.</p>
        <h3 class="mkt-h3">Parts de marché <span class="mkt-src">(Worldpanel / NielsenIQ, début 2026)</span></h3>
        ${sharesChart()}
        <div class="mkt-highlight">
          <span class="mkt-highlight__icon">🎯</span>
          <p><strong>Leclerc + Intermarché + U représentent à eux seuls plus de la moitié du marché alimentaire français</strong>, et ce sont des magasins d'<strong>indépendants</strong>. Ajoutez les franchisés Carrefour Market et Contact : voilà notre terrain de jeu.</p>
        </div>
        <h3 class="mkt-h3">Une recomposition récente qui a tout bougé</h3>
        <ul class="mkt-list">${RECOMPO.map((r) => `<li>${r}</li>`).join("")}</ul>
        <div class="mkt-callout mkt-callout--buy">
          <span>🟢</span><p>Un magasin en cours de transition d'enseigne = équipes recomposées, turnover élevé, besoins de recrutement massifs. <strong>C'est un signal d'achat.</strong></p>
        </div>
        <h3 class="mkt-h3">Les formats</h3>
        <div class="mkt-cards">
          ${FORMATS.map((f) => `
            <div class="fmt-card${f.target ? " is-target" : ""}">
              ${f.target ? `<span class="fmt-card__flag">Cœur de cible</span>` : ""}
              <div class="fmt-card__icon">${f.icon}</div>
              <div class="fmt-card__name">${esc(f.name)}</div>
              <div class="fmt-card__surf">${esc(f.surf)}</div>
              <p>${esc(f.desc)}</p>
            </div>`).join("")}
        </div>
      </section>`;

    const s2 = `
      <section class="mkt-section" id="s2">
        ${sectionHead("2", "Les caractéristiques structurantes du secteur", "Cinq réalités à avoir en tête en permanence.")}
        <div class="mkt-cards">
          ${CARACT.map((c, i) => `
            <div class="num-card">
              <div class="num-card__top"><span class="num-card__n">${i + 1}</span><span class="num-card__icon">${c.icon}</span></div>
              <div class="num-card__t">${esc(c.t)}</div>
              <p>${esc(c.d)}</p>
            </div>`).join("")}
        </div>
      </section>`;

    const s3 = `
      <section class="mkt-section" id="s3">
        ${sectionHead("3", "Intégré vs indépendant : la distinction qui change tout")}
        <div class="vs-grid">
          <div class="vs-col vs-col--int">
            <div class="vs-col__head">🏢 Magasin intégré</div>
            <p>Appartient réellement au groupe. Le patron est un <strong>salarié</strong> : nommé par sa direction, il applique une stratégie décidée ailleurs et doit faire valider ses achats par des services centraux. <em>Ex. : hypers Carrefour, Auchan, Lidl.</em></p>
            <div class="vs-col__punch">On parle à un <strong>directeur qui exécute</strong> — il doit demander la permission.</div>
          </div>
          <div class="vs-col vs-col--indep">
            <div class="vs-col__head">👤 Magasin indépendant</div>
            <p>Appartient à une personne. Un entrepreneur a monté sa société, emprunté, acheté son magasin, et paie l'enseigne pour la marque, la centrale et la logistique. Il <strong>recrute qui il veut et décide seul</strong>. <em>Ex. : Leclerc, Intermarché, U.</em></p>
            <div class="vs-col__punch">On parle à un <strong>patron qui décide</strong> — il peut dire oui dans l'heure, mais dépense son argent.</div>
          </div>
        </div>
        <div class="mkt-table-wrap">
          <table class="mkt-table">
            <thead><tr><th></th><th>Magasin intégré</th><th class="th-indep">Indépendant / adhérent</th></tr></thead>
            <tbody>
              ${VS_ROWS.map((r) => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td><td class="td-indep">${esc(r[2])}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div class="mkt-callout mkt-callout--warn">
          <span>⚠️</span><p><strong>Règle absolue avant tout appel : identifier le statut du magasin.</strong> Un Carrefour Market peut être intégré ou franchisé — ce n'est pas la même conversation, ni le même interlocuteur.</p>
        </div>
      </section>`;

    const s4 = `
      <section class="mkt-section" id="s4">
        ${sectionHead("4", "Le modèle de l'adhérent", "Le cœur de notre marché — à maîtriser parfaitement.")}

        <h3 class="mkt-h3">4.1 · Un vrai chef d'entreprise, pas un cadre</h3>
        <p>L'adhérent est <strong>propriétaire de la société</strong> qui exploite le magasin (souvent une SAS). Il a investi son argent personnel, souvent avec emprunt et caution personnelle. C'est un patron de PME de <strong>5 à 80 M€ de CA</strong>, qui emploie <strong>40 à 300 personnes</strong>.</p>
        <div class="mkt-table-wrap">
          <table class="mkt-table">
            <thead><tr><th>Enseigne</th><th>Le bon terme</th></tr></thead>
            <tbody>${VOCAB.map((v) => `<tr><th>${esc(v[0])}</th><td><span class="term-badge">${esc(v[1])}</span>${v[2] ? ` <span class="term-note">${esc(v[2])}</span>` : ""}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        <div class="mkt-callout mkt-callout--warn"><span>🚫</span><p>Se tromper de terme signale qu'on ne connaît pas le secteur. Dire « franchisé » à un adhérent Leclerc est une faute qui coûte cher.</p></div>

        <h3 class="mkt-h3">4.2 · Propriétaire ≠ présent au quotidien</h3>
        <p>L'adhérent peut nommer un <strong>directeur salarié</strong> pour exploiter le magasin — fréquent s'il possède plusieurs magasins, s'implique dans le groupement, ou prépare sa transmission. <strong>Il faut toujours qualifier qui décide.</strong></p>
        <div class="mkt-table-wrap">
          <table class="mkt-table">
            <thead><tr><th>Situation</th><th>Qui décide vraiment</th></tr></thead>
            <tbody>${QUALIF.map((q) => `<tr><th>${esc(q[0])}</th><td>${q[1]}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        <div class="mkt-callout mkt-callout--q"><span>💬</span><p>Question à poser sans détour : <em>« Sur ce type de décision, c'est vous qui tranchez ou vous en parlez au propriétaire ? »</em> Ça ne les vexe pas.</p></div>

        <h3 class="mkt-h3">4.3 · Une indépendance réelle sur ses choix</h3>
        <ul class="mkt-list mkt-list--check">${INDEP_LIBRE.map((x) => `<li>${x}</li>`).join("")}</ul>
        <p class="mkt-note">L'enseigne apporte la marque, la centrale d'achat, la logistique, la pub nationale. <strong>Elle ne lui impose pas ses prestataires RH</strong> : ni appel d'offres national, ni référencement obligatoire.</p>

        <h3 class="mkt-h3">4.4 · Des process beaucoup plus rapides</h3>
        <div class="mkt-twocol">
          <div class="mkt-pro"><div class="mkt-pro__t">✅ Notre avantage structurel</div><ul><li>Pas de comité d'achat, juridique, procurement, RSSI.</li><li>Pas de « je remonte au siège » : <strong>il est le siège</strong>.</li><li>Un « oui » peut tomber dès le 1ᵉʳ rendez-vous.</li><li>Indépendant du calendrier budgétaire annuel.</li></ul></div>
          <div class="mkt-con"><div class="mkt-con__t">⚠️ La contrepartie</div><p>Le « non » est tout aussi <strong>rapide et définitif</strong>. Personne pour rattraper un mauvais rendez-vous. <strong>On a un seul essai.</strong></p></div>
        </div>

        <h3 class="mkt-h3">4.5 · Mais un budget plus contraint</h3>
        <p><strong>C'est son argent.</strong> Chaque euro dépensé sort de son résultat, donc de sa rémunération.</p>
        <ul class="mkt-list">${BUDGET.map((b) => `<li>${b}</li>`).join("")}</ul>
        <div class="mkt-highlight">
          <span class="mkt-highlight__icon">🧭</span>
          <p><strong>Le bon angle :</strong> ne jamais vendre un budget supplémentaire. Positionner la solution comme le <strong>remplacement d'un coût déjà supporté</strong> (intérim, annonces, temps de l'encadrement) ou comme un <strong>coût évité</strong> (poste vacant, turnover, no-show).</p>
        </div>
      </section>`;

    const s5 = `
      <section class="mkt-section" id="s5">
        ${sectionHead("5", "Les centrales régionales : comment s'organisent les groupements", "Comprendre où circule l'information, c'est comprendre où circulent les recommandations.")}
        <div class="centrale-grid">
          ${CENTRALES.map((c) => `
            <article class="centrale-card" style="--cc:${c.color}">
              <header class="centrale-card__head"><span class="centrale-card__ens">${esc(c.ens)}</span><span class="centrale-card__sub">${esc(c.sub)}</span></header>
              <div class="centrale-card__body">${c.body.map((p) => `<p>${p}</p>`).join("")}</div>
              <div class="centrale-card__pin">💡 ${c.pin}</div>
            </article>`).join("")}
        </div>
      </section>`;

    const s6 = `
      <section class="mkt-section" id="s6">
        ${sectionHead("6", "Comment se comportent les décisionnaires", "L'écart le plus grand entre ce à quoi on s'attend et la réalité du terrain.")}
        <div class="mkt-cards">
          ${COMPORT.map((c) => `
            <div class="beh-card">
              <div class="beh-card__icon">${c.icon}</div>
              <div class="beh-card__t">${esc(c.t)}</div>
              <p>${esc(c.d)}</p>
            </div>`).join("")}
        </div>
        <h3 class="mkt-h3">Le bon timing</h3>
        <div class="mkt-table-wrap">
          <table class="mkt-table timing">
            <thead><tr><th class="th-bad">🚫 À éviter</th><th class="th-good">✅ À privilégier</th></tr></thead>
            <tbody>${TIMING.map((t) => `<tr><td class="td-bad">${esc(t[0])}</td><td class="td-good">${esc(t[1])}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>`;

    const s7 = `
      <section class="mkt-section" id="s7">
        ${sectionHead("7", "L'effet réseau : notre principal levier de croissance", "À intégrer comme une règle de travail, pas comme une anecdote.")}
        <div class="mkt-twocol">
          <div class="net-box"><div class="net-box__t">🔗 Ils se connaissent tous</div><p>Les adhérents d'une même région sont des <strong>confrères qui se voient plusieurs fois par an</strong> (assemblées, commissions, congrès, formations). Ils s'élisent entre eux, co-dirigent le groupement, se sont souvent parrainés. Et <strong>ils parlent de leurs prestataires</strong>, constamment.</p></div>
          <div class="net-box net-box--quote"><p>« Je travaille avec le Super U de [ville d'à côté], vous connaissez sûrement [prénom] »</p><span>Cette phrase vaut plus que n'importe quelle étude de cas : elle transforme un inconnu en quelqu'un que le réseau a déjà validé.</span></div>
        </div>
        <h3 class="mkt-h3">Ce que ça implique dans notre méthode</h3>
        <ol class="mkt-ol">${RESEAU_IMPL.map((x) => `<li>${x}</li>`).join("")}</ol>
        <h3 class="mkt-h3">Le revers : le réseau amplifie aussi les mauvaises expériences</h3>
        <ul class="mkt-list mkt-list--x">${RESEAU_REVERS.map((x) => `<li>${x}</li>`).join("")}</ul>
        <div class="mkt-highlight mkt-highlight--dark">
          <span class="mkt-highlight__icon">📣</span>
          <p>Dans la grande distribution indépendante, <strong>on ne vend pas à des magasins, on vend à un réseau</strong>. Chaque client est une porte vers dix autres — ou un mur devant dix autres.</p>
        </div>
      </section>`;

    const s8 = `
      <section class="mkt-section" id="s8">
        ${sectionHead("8", "Mémo enseignes")}
        <div class="mkt-table-wrap">
          <table class="mkt-table memo">
            <thead><tr><th>Enseigne</th><th>Groupe</th><th>Statut</th><th>Priorité</th></tr></thead>
            <tbody>${MEMO.map((m) => {
              const p = PRIO[m[3]];
              return `<tr><th>${esc(m[0])}</th><td>${esc(m[1])}</td><td>${esc(m[2])}</td><td><span class="prio ${p.cls}">${p.label}</span></td></tr>`;
            }).join("")}</tbody>
          </table>
        </div>
      </section>`;

    const s9 = `
      <section class="mkt-section" id="s9">
        ${sectionHead("9", "Les 6 erreurs qui tuent un rendez-vous")}
        <div class="err-list">
          ${ERREURS.map((e, i) => `<div class="err-item"><span class="err-item__n">${i + 1}</span><p>${e}</p></div>`).join("")}
        </div>
      </section>`;

    const toc = `<nav class="mkt-toc" aria-label="Sommaire">
      ${SECTIONS.map((s) => `<a href="#${s[0]}" data-goto="${s[0]}"><b>${s[1]}</b> ${esc(s[2])}</a>`).join("")}
    </nav>`;

    return `<div class="mkt-wrap">
      <div class="mkt-intro">
        <h1>Le marché de la Grande Distribution</h1>
        <p>Tout ce qu'il faut comprendre du secteur pour prospecter juste : structure du marché, modèle des indépendants, comportement des décisionnaires et effet réseau.</p>
      </div>
      ${toc}
      ${s1}${s2}${s3}${s4}${s5}${s6}${s7}${s8}${s9}
    </div>`;
  }

  /* ====================================================================== */
  /*  ONGLETS                                                               */
  /* ====================================================================== */
  const tabs = document.getElementById("app-tabs");
  const stage = document.getElementById("stage");
  const market = document.getElementById("market");
  const jobPanel = document.getElementById("job-panel");
  const subtitle = document.getElementById("app-subtitle");
  let marketRendered = false;

  const SUBTITLES = {
    metiers: "Explorez le magasin, cliquez sur un espace pour découvrir les métiers",
    marche: "Comprendre le marché de la grande distribution et ses spécificités",
  };

  function activateTab(name) {
    const isMarche = name === "marche";
    document.body.classList.toggle("is-marche", isMarche);

    if (isMarche && !marketRendered) {
      market.innerHTML = renderMarche();
      marketRendered = true;
      // Navigation du sommaire (défilement doux)
      market.querySelectorAll("[data-goto]").forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const el = document.getElementById(a.getAttribute("data-goto"));
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    stage.hidden = isMarche;
    market.hidden = !isMarche;
    if (isMarche && jobPanel) jobPanel.setAttribute("aria-hidden", "true");
    if (subtitle) subtitle.textContent = SUBTITLES[name] || "";

    tabs.querySelectorAll(".app-tab").forEach((b) =>
      b.classList.toggle("is-active", b.getAttribute("data-tab") === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (tabs) {
    tabs.querySelectorAll(".app-tab").forEach((b) => {
      b.addEventListener("click", () => activateTab(b.getAttribute("data-tab")));
    });
  }
})();
