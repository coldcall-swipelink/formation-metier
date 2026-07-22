/*
 * data.js
 * ---------------------------------------------------------------------------
 * Structure des données de la formation "Les métiers de la grande distribution".
 *
 * Hiérarchie :
 *   Magasin
 *     └── Zones (grands espaces : PGC, Frais traditionnel, ...)
 *           └── Sous-zones (ex : PGC -> Épicerie, Liquides, Bazar, DPH)
 *                 └── Métiers (ex : Responsable liquides)
 *                       ├── intitulés / alias de poste
 *                       ├── description + exemples concrets
 *                       └── passerelles (évolutions possibles)
 *
 * Pour ajouter/modifier du contenu : il suffit d'éditer cet objet.
 * Les `photo` sont pour l'instant des placeholders (emoji + dégradé) ;
 * on pourra les remplacer par de vraies photos plus tard (champ `image`).
 * ---------------------------------------------------------------------------
 */

const STORE = {
  name: "Hypermarché — Vue du magasin",
  // Chaque zone occupe une "case" nommée dans le plan (voir grid-template-areas dans le CSS).
  zones: [
    /* ------------------------------------------------------------------ */
    {
      id: "pgc",
      area: "pgc",
      name: "PGC",
      subtitle: "Produits de Grande Consommation",
      icon: "🛒",
      color: "#2563eb",
      description:
        "Le cœur du libre-service non périssable : épicerie, liquides, hygiène-droguerie et bazar léger. Les plus gros volumes du magasin.",
      subZones: [
        {
          id: "epicerie",
          name: "Épicerie",
          icon: "🥫",
          description: "Épicerie salée et sucrée, conserves, petit-déjeuner, biscuiterie, apéritif.",
          jobs: [
            {
              id: "resp-epicerie",
              title: "Responsable de rayon Épicerie",
              aliases: ["Chef de rayon épicerie", "Manager de rayon épicerie", "Responsable épicerie salée / sucrée"],
              photo: { icon: "🥫", gradient: ["#f59e0b", "#b45309"] },
              description:
                "Pilote un des plus gros rayons du magasin en volume et en référence. Gère les commandes, les stocks, l'implantation (planogramme), les promotions et une équipe d'employés libre-service.",
              examples: [
                "Passe les commandes hebdomadaires pour éviter les ruptures sur les pâtes, le café ou les gâteaux.",
                "Négocie et installe une tête de gondole promotionnelle pour une opération nationale.",
                "Analyse le chiffre d'affaires du rayon et ajuste l'assortiment saisonnier (ex : bûches à Noël).",
              ],
              passerelles: ["resp-liquides", "resp-dph", "manager-secteur-pgc"],
            },
            {
              id: "els-epicerie",
              title: "Employé libre-service Épicerie",
              aliases: ["ELS", "Employé commercial", "Vendeur libre-service"],
              photo: { icon: "📦", gradient: ["#fbbf24", "#d97706"] },
              description:
                "Assure le remplissage des rayons, le facing, l'étiquetage et le contrôle des dates. Premier poste d'entrée qui ouvre vers l'encadrement.",
              examples: [
                "Réceptionne la palette du matin et réapprovisionne le rayon avant l'ouverture.",
                "Vérifie les DLC/DLUO et retire les produits périmés.",
                "Renseigne un client qui cherche un produit sans gluten.",
              ],
              passerelles: ["resp-epicerie", "els-liquides", "hote-caisse"],
            },
          ],
        },
        {
          id: "liquides",
          name: "Liquides",
          icon: "🧃",
          description: "Eaux, sodas, jus, vins, bières, spiritueux, boissons chaudes.",
          jobs: [
            {
              id: "resp-liquides",
              title: "Responsable de rayon Liquides",
              aliases: ["Chef de rayon liquides", "Responsable BRS (Bières, Rhums, Spiritueux)", "Responsable cave / vins"],
              photo: { icon: "🍷", gradient: ["#7c3aed", "#4c1d95"] },
              description:
                "Gère un rayon à forte saisonnalité et à forte valeur (foire aux vins, opérations bière). Bonne connaissance produit exigée sur les vins et spiritueux.",
              examples: [
                "Prépare et implante la Foire aux Vins : sélection, mise en avant, gestion des volumes.",
                "Gère la logistique lourde des packs d'eau (gerbage, sécurité).",
                "Conseille un client sur un accord mets-vin.",
              ],
              passerelles: ["resp-epicerie", "resp-dph", "manager-secteur-pgc"],
            },
          ],
        },
        {
          id: "dph",
          name: "DPH",
          icon: "🧴",
          description: "Droguerie, Parfumerie, Hygiène : entretien, beauté, soin, bébé, animalerie.",
          jobs: [
            {
              id: "resp-dph",
              title: "Responsable de rayon DPH",
              aliases: ["Chef de rayon DPH", "Responsable hygiène-beauté", "Responsable droguerie-parfumerie"],
              photo: { icon: "🧴", gradient: ["#0ea5e9", "#0369a1"] },
              description:
                "Rayon à forte marge et forte pression promotionnelle. Gère l'entretien, l'hygiène, la beauté, le bébé et souvent l'animalerie.",
              examples: [
                "Met en place les opérations de lessive/couches très concurrentielles.",
                "Gère les linéaires beauté avec de nombreuses nouveautés fournisseurs.",
                "Surveille la démarque (produits à fort risque de vol : rasoirs, parfums).",
              ],
              passerelles: ["resp-epicerie", "resp-liquides", "manager-secteur-pgc"],
            },
          ],
        },
        {
          id: "bazar",
          name: "Bazar léger",
          icon: "🎁",
          description: "Arts de la table, papeterie, jouets, saisonnier, petit électroménager.",
          jobs: [
            {
              id: "resp-bazar",
              title: "Responsable de rayon Bazar",
              aliases: ["Chef de rayon bazar", "Responsable saisonnier", "Responsable non-alimentaire léger"],
              photo: { icon: "🎁", gradient: ["#ec4899", "#9d174e"] },
              description:
                "Rayon très saisonnier (rentrée, Noël, jardin, plein air). Gère de gros volumes ponctuels et une rotation forte des thématiques.",
              examples: [
                "Monte l'opération rentrée des classes (papeterie, cartables).",
                "Implante le rayon jouets de fin d'année plusieurs semaines à l'avance.",
                "Écoule les stocks saisonniers via des soldes après les fêtes.",
              ],
              passerelles: ["resp-textile", "resp-maison", "manager-secteur-pgc"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "frais-trad",
      area: "trad",
      name: "Frais Traditionnel",
      subtitle: "Les métiers de bouche",
      icon: "🥩",
      color: "#dc2626",
      description:
        "Le « marché » du magasin : boucherie, poissonnerie, boulangerie-pâtisserie, fromage et charcuterie à la coupe. Des métiers avec vrai savoir-faire artisanal et vente-conseil.",
      subZones: [
        {
          id: "boucherie",
          name: "Boucherie",
          icon: "🥩",
          description: "Découpe, préparation et vente de viandes.",
          jobs: [
            {
              id: "boucher",
              title: "Boucher",
              aliases: ["Boucher-vendeur", "Ouvrier boucher"],
              photo: { icon: "🔪", gradient: ["#ef4444", "#7f1d1d"] },
              description:
                "Métier artisanal : réception des carcasses, découpe, désossage, préparation et vente-conseil au client. Diplôme (CAP boucher) souvent requis.",
              examples: [
                "Découpe un quartier de bœuf en morceaux prêts à vendre.",
                "Prépare des brochettes et rôtis pour le rayon.",
                "Conseille un client sur une cuisson et le poids par personne.",
              ],
              passerelles: ["chef-boucher", "boucher-ls"],
            },
            {
              id: "chef-boucher",
              title: "Chef boucher / Responsable boucherie",
              aliases: ["Manager boucherie", "Chef d'équipe boucherie"],
              photo: { icon: "🥩", gradient: ["#b91c1c", "#450a0a"] },
              description:
                "Encadre l'équipe de bouchers, gère les achats de viande, les marges, l'hygiène (HACCP) et la rentabilité du rayon traditionnel.",
              examples: [
                "Négocie l'achat des carcasses et suit le rendement matière.",
                "Planifie l'équipe et forme un apprenti.",
                "Garantit la traçabilité et les contrôles sanitaires.",
              ],
              passerelles: ["manager-secteur-frais", "chef-boucher-ls"],
            },
          ],
        },
        {
          id: "poissonnerie",
          name: "Poissonnerie",
          icon: "🐟",
          description: "Marée, découpe et vente de poissons et fruits de mer.",
          jobs: [
            {
              id: "poissonnier",
              title: "Poissonnier / Responsable poissonnerie",
              aliases: ["Vendeur marée", "Chef de rayon marée"],
              photo: { icon: "🐟", gradient: ["#06b6d4", "#155e75"] },
              description:
                "Réception de la marée, mise en banc (glace), écaillage, filetage et vente-conseil. Rayon exigeant sur la fraîcheur et la chaîne du froid.",
              examples: [
                "Monte le banc de glace et dispose les poissons chaque matin.",
                "Filète un poisson à la demande du client.",
                "Gère les arrivages selon la pêche du jour et la saison.",
              ],
              passerelles: ["manager-secteur-frais", "resp-fl"],
            },
          ],
        },
        {
          id: "boulangerie",
          name: "Boulangerie / Pâtisserie",
          icon: "🥖",
          description: "Fabrication et cuisson de pains, viennoiseries et pâtisseries.",
          jobs: [
            {
              id: "boulanger",
              title: "Boulanger / Pâtissier",
              aliases: ["Responsable boulangerie", "Chef de fabrication BVP"],
              photo: { icon: "🥖", gradient: ["#f59e0b", "#78350f"] },
              description:
                "Fabrique et cuit pains, viennoiseries et pâtisseries sur place (souvent à partir de pâtons ou en fabrication maison). Gère les cuissons échelonnées sur la journée.",
              examples: [
                "Lance les cuissons pour avoir du pain chaud aux heures de pointe.",
                "Fabrique les pâtisseries et gâteaux de commande (anniversaires).",
                "Gère les stocks de matières premières (farine, beurre).",
              ],
              passerelles: ["manager-secteur-frais", "resp-traiteur-ls"],
            },
          ],
        },
        {
          id: "coupe",
          name: "Fromage / Charcuterie coupe",
          icon: "🧀",
          description: "Crèmerie et charcuterie à la coupe, traiteur traditionnel.",
          jobs: [
            {
              id: "fromager",
              title: "Fromager / Vendeur coupe",
              aliases: ["Vendeur crèmerie coupe", "Charcutier-traiteur", "Responsable coupe"],
              photo: { icon: "🧀", gradient: ["#eab308", "#713f12"] },
              description:
                "Vente à la coupe de fromages et charcuteries, conseil client, découpe, emballage et mise en valeur du stand traditionnel.",
              examples: [
                "Compose un plateau de fromages pour un client.",
                "Découpe le jambon à la demande et gère la rotation.",
                "Propose une dégustation pour faire découvrir un produit.",
              ],
              passerelles: ["resp-charcuterie-ls", "manager-secteur-frais"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "frais-ls",
      area: "fls",
      name: "Frais Libre-Service",
      subtitle: "Frais LS",
      icon: "🧀",
      color: "#0891b2",
      description:
        "Tout le frais emballé en libre-service : produits laitiers, charcuterie LS, traiteur LS et surgelés. Forte contrainte de dates courtes et de chaîne du froid.",
      subZones: [
        {
          id: "cremerie-ls",
          name: "Produits laitiers (Crèmerie LS)",
          icon: "🥛",
          description: "Lait, yaourts, beurre, œufs, desserts frais.",
          jobs: [
            {
              id: "resp-frais-ls",
              title: "Responsable de rayon Frais LS",
              aliases: ["Chef de rayon crèmerie LS", "Responsable produits laitiers", "Manager frais libre-service"],
              photo: { icon: "🥛", gradient: ["#38bdf8", "#0c4a6e"] },
              description:
                "Gère un rayon à rotation très rapide et dates courtes. Le pilotage des commandes et de la casse (démarque) est central.",
              examples: [
                "Ajuste les commandes au plus juste pour limiter la casse sur les yaourts.",
                "Contrôle quotidiennement les dates et gère les démarques dégressives.",
                "Réimplante le linéaire lors d'un changement d'assortiment laitier.",
              ],
              // Exemple explicite de passerelle donné par l'utilisateur : Frais trad -> Frais LS
              passerelles: ["resp-charcuterie-ls", "resp-surgeles", "manager-secteur-frais"],
            },
          ],
        },
        {
          id: "charcuterie-ls",
          name: "Charcuterie / Traiteur LS",
          icon: "🥓",
          description: "Charcuterie préemballée, traiteur, snacking frais.",
          jobs: [
            {
              id: "resp-charcuterie-ls",
              title: "Responsable Charcuterie / Traiteur LS",
              aliases: ["Chef de rayon charcuterie LS", "Responsable traiteur libre-service"],
              photo: { icon: "🥓", gradient: ["#fb7185", "#881337"] },
              description:
                "Pilote le rayon charcuterie et traiteur en libre-service, souvent une passerelle naturelle depuis (ou vers) la charcuterie traditionnelle.",
              examples: [
                "Développe l'offre snacking pour la pause déjeuner.",
                "Gère les nombreuses nouveautés fournisseurs en charcuterie.",
                "Coordonne les promotions traiteur pour les fêtes.",
              ],
              passerelles: ["resp-frais-ls", "fromager", "manager-secteur-frais"],
            },
          ],
        },
        {
          id: "surgeles",
          name: "Surgelés",
          icon: "🧊",
          description: "Produits surgelés, glaces, plats préparés.",
          jobs: [
            {
              id: "resp-surgeles",
              title: "Responsable de rayon Surgelés",
              aliases: ["Chef de rayon surgelés", "Responsable produits congelés"],
              photo: { icon: "🧊", gradient: ["#60a5fa", "#1e3a8a"] },
              description:
                "Rayon technique (meubles négatifs, chaîne du froid stricte). Forte saisonnalité (glaces l'été, plats de fête l'hiver).",
              examples: [
                "Surveille la température des meubles et gère les pannes froid.",
                "Développe le rayon glaces à l'approche de l'été.",
                "Organise le rangement rapide à la réception pour ne pas rompre le froid.",
              ],
              passerelles: ["resp-frais-ls", "manager-secteur-frais"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "fl",
      area: "fl",
      name: "Fruits & Légumes",
      subtitle: "Le marché frais",
      icon: "🍎",
      color: "#16a34a",
      description:
        "Souvent le premier rayon à l'entrée : c'est la vitrine fraîcheur du magasin. Gestion très fine des arrivages, de la casse et du théâtralisation.",
      subZones: [
        {
          id: "fl-sub",
          name: "Fruits & Légumes",
          icon: "🍏",
          description: "Fruits, légumes, primeur.",
          jobs: [
            {
              id: "resp-fl",
              title: "Responsable de rayon Fruits & Légumes",
              aliases: ["Chef de rayon F&L", "Responsable primeur", "Manager fruits et légumes"],
              photo: { icon: "🍎", gradient: ["#22c55e", "#14532d"] },
              description:
                "Un des rayons les plus difficiles : produits fragiles, casse élevée, arrivages quotidiens et forte saisonnalité. La mise en scène (théâtralisation) est clé.",
              examples: [
                "Réceptionne les cageots chaque matin et trie les produits abîmés.",
                "Théâtralise un étal de saison (fraises au printemps, potirons à l'automne).",
                "Gère la casse en dégradant les prix des produits mûrs.",
              ],
              passerelles: ["poissonnier", "manager-secteur-frais", "resp-epicerie"],
            },
            {
              id: "els-fl",
              title: "Employé Fruits & Légumes",
              aliases: ["Employé commercial F&L", "Vendeur primeur"],
              photo: { icon: "🥕", gradient: ["#4ade80", "#166534"] },
              description:
                "Remplit et entretient l'étal tout au long de la journée, retire les produits abîmés, pèse et conseille les clients.",
              examples: [
                "Réachalande les bananes plusieurs fois par jour.",
                "Retire les fruits trop mûrs pour garder un étal impeccable.",
                "Aide un client à choisir un melon.",
              ],
              passerelles: ["resp-fl", "els-epicerie"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "culturel",
      area: "cult",
      name: "Espace Culturel",
      subtitle: "Culture & Multimédia",
      icon: "📚",
      color: "#9333ea",
      description:
        "Livres, presse, jeux vidéo, high-tech, son et image, billetterie. Un univers où le conseil et la connaissance produit font la différence.",
      subZones: [
        {
          id: "librairie",
          name: "Librairie / Presse",
          icon: "📚",
          description: "Livres, BD, papeterie créative, presse.",
          jobs: [
            {
              id: "resp-culturel",
              title: "Responsable Espace Culturel",
              aliases: ["Chef de rayon culture", "Libraire", "Responsable livre / presse"],
              photo: { icon: "📚", gradient: ["#a855f7", "#581c87"] },
              description:
                "Anime un rayon de conseil et de découverte : sélection des nouveautés, mises en avant littéraires, gestion des retours d'invendus (presse/livres).",
              examples: [
                "Met en avant les nouveautés et les prix littéraires de la rentrée.",
                "Gère les retours d'invendus presse chaque semaine.",
                "Organise une séance de dédicaces avec un auteur.",
              ],
              passerelles: ["resp-multimedia", "resp-bazar"],
            },
          ],
        },
        {
          id: "multimedia",
          name: "Multimédia / High-Tech",
          icon: "🎮",
          description: "TV, son, informatique, téléphonie, jeux vidéo.",
          jobs: [
            {
              id: "resp-multimedia",
              title: "Responsable Multimédia / High-Tech",
              aliases: ["Chef de rayon multimédia", "Vendeur high-tech", "Responsable image & son"],
              photo: { icon: "🎮", gradient: ["#6366f1", "#312e81"] },
              description:
                "Rayon à forte valeur, forte technicité et vente-conseil (voire vente additionnelle : garanties, accessoires). Bonne connaissance produit indispensable.",
              examples: [
                "Conseille un client dans le choix d'un téléviseur selon son usage.",
                "Propose une extension de garantie et les accessoires adaptés.",
                "Gère la sécurité des produits à forte valeur (antivol, réserve).",
              ],
              passerelles: ["resp-culturel", "resp-maison"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "textile-maison",
      area: "txt",
      name: "Textile & Maison",
      subtitle: "Non-alimentaire lourd",
      icon: "👕",
      color: "#ca8a04",
      description:
        "Textile (prêt-à-porter, chaussures), maison, électroménager et bazar lourd. Univers de la mode, du merchandising et de l'équipement du foyer.",
      subZones: [
        {
          id: "textile",
          name: "Textile",
          icon: "👕",
          description: "Prêt-à-porter homme, femme, enfant, chaussures, lingerie.",
          jobs: [
            {
              id: "resp-textile",
              title: "Responsable de rayon Textile",
              aliases: ["Chef de rayon textile", "Responsable prêt-à-porter", "Visual merchandiser"],
              photo: { icon: "👗", gradient: ["#f472b6", "#831843"] },
              description:
                "Gère les collections saisonnières, le merchandising mode, les démarques (soldes) et la présentation. Rythme dicté par les collections.",
              examples: [
                "Implante la nouvelle collection de saison en vitrine et en rayon.",
                "Pilote les soldes et les démarques successives.",
                "Compose des silhouettes (mannequins) pour inspirer les clients.",
              ],
              passerelles: ["resp-maison", "resp-bazar"],
            },
          ],
        },
        {
          id: "maison",
          name: "Maison / Électroménager",
          icon: "🛋️",
          description: "Arts de la table, linge de maison, gros et petit électroménager, bricolage.",
          jobs: [
            {
              id: "resp-maison",
              title: "Responsable Maison / Électroménager",
              aliases: ["Chef de rayon maison", "Responsable électroménager", "Responsable bazar lourd"],
              photo: { icon: "🛋️", gradient: ["#d97706", "#78350f"] },
              description:
                "Univers d'équipement du foyer : gros volumes, produits encombrants, vente-conseil sur l'électroménager et gestion des livraisons/SAV.",
              examples: [
                "Conseille un client sur le choix d'un lave-linge et organise la livraison.",
                "Gère le stock encombrant en réserve et la manutention.",
                "Coordonne le SAV pour un appareil sous garantie.",
              ],
              passerelles: ["resp-textile", "resp-multimedia", "resp-bazar"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "caisses",
      area: "caisses",
      name: "Caisses, Accueil & Drive",
      subtitle: "Relation client & flux",
      icon: "🧾",
      color: "#475569",
      description:
        "La ligne de caisses, l'accueil et le Drive : le dernier (et souvent premier) contact avec le client. Métiers de flux, de service et de relation client.",
      subZones: [
        {
          id: "ligne-caisses",
          name: "Ligne de caisses",
          icon: "🧾",
          description: "Encaissement classique et caisses libre-service.",
          jobs: [
            {
              id: "hote-caisse",
              title: "Hôte(sse) de caisse",
              aliases: ["Employé de caisse", "Caissier"],
              photo: { icon: "🧾", gradient: ["#94a3b8", "#334155"] },
              description:
                "Encaisse les clients, gère les moyens de paiement, applique les promotions et assure un accueil de qualité en fin de parcours. Poste d'entrée très fréquent.",
              examples: [
                "Encaisse rapidement en heure de pointe tout en restant courtois.",
                "Gère un litige de prix avec le sourire et appelle un responsable si besoin.",
                "Assiste les clients sur les caisses automatiques.",
              ],
              passerelles: ["resp-caisse", "charge-accueil", "els-epicerie"],
            },
            {
              id: "resp-caisse",
              title: "Responsable Caisse / Ligne de caisses",
              aliases: ["Manager caisse", "Chef de caisses", "Responsable encaissement"],
              photo: { icon: "💳", gradient: ["#64748b", "#1e293b"] },
              description:
                "Encadre l'équipe de caisse, gère les plannings selon l'affluence, les fonds de caisse, la lutte contre la démarque et la qualité de service.",
              examples: [
                "Bâtit un planning qui colle aux pics d'affluence du samedi.",
                "Gère les écarts de caisse et les procédures de sécurité (fonds).",
                "Forme les nouveaux hôtes de caisse.",
              ],
              passerelles: ["charge-accueil", "resp-drive", "manager-secteur-caisse"],
            },
          ],
        },
        {
          id: "accueil",
          name: "Accueil / Services",
          icon: "💁",
          description: "Accueil, SAV, carte fidélité, service client.",
          jobs: [
            {
              id: "charge-accueil",
              title: "Chargé(e) d'accueil / Service client",
              aliases: ["Hôte(sse) d'accueil", "Conseiller service client", "Responsable accueil"],
              photo: { icon: "💁", gradient: ["#818cf8", "#3730a3"] },
              description:
                "Gère l'accueil, les réclamations, les retours, la carte de fidélité et les services (billetterie, location...). Métier de relation client par excellence.",
              examples: [
                "Traite un retour produit et un remboursement.",
                "Explique les avantages du programme de fidélité.",
                "Oriente et rassure un client mécontent.",
              ],
              passerelles: ["resp-caisse", "resp-drive"],
            },
          ],
        },
        {
          id: "drive",
          name: "Drive",
          icon: "🚗",
          description: "Préparation et remise des commandes en ligne.",
          jobs: [
            {
              id: "resp-drive",
              title: "Responsable Drive",
              aliases: ["Manager Drive", "Responsable e-commerce / préparation de commandes"],
              photo: { icon: "🚗", gradient: ["#0ea5e9", "#0c4a6e"] },
              description:
                "Pilote l'activité e-commerce du magasin : équipe de préparateurs, respect des créneaux, taux de service, gestion des substitutions et de la logistique.",
              examples: [
                "Organise l'équipe pour tenir les créneaux de retrait en heure de pointe.",
                "Suit le taux de service et gère les ruptures/substitutions.",
                "Optimise le picking pour réduire le temps de préparation.",
              ],
              passerelles: ["resp-caisse", "charge-accueil", "manager-secteur-caisse"],
            },
            {
              id: "prepa-drive",
              title: "Préparateur de commandes Drive",
              aliases: ["Employé Drive", "Picker"],
              photo: { icon: "📋", gradient: ["#38bdf8", "#075985"] },
              description:
                "Prépare les commandes clients en parcourant le magasin ou l'entrepôt avec une scannette, dans le respect du froid et des délais.",
              examples: [
                "Prépare une commande en optimisant son parcours dans les rayons.",
                "Choisit une substitution pertinente en cas de rupture.",
                "Charge la commande dans le coffre du client au retrait.",
              ],
              passerelles: ["resp-drive", "hote-caisse", "els-epicerie"],
            },
          ],
        },
      ],
    },
  ],

  /*
   * Métiers "chapeau" (encadrement / direction) référencés comme passerelles.
   * Ils ne sont pas rattachés à un rayon précis mais chapeautent plusieurs secteurs.
   */
  managementJobs: {
    "manager-secteur-pgc": {
      id: "manager-secteur-pgc",
      title: "Manager de secteur PGC / Marchandises générales",
      aliases: ["Chef de secteur PGC", "Manager univers épicerie-liquides-DPH-bazar"],
      photo: { icon: "📊", gradient: ["#1d4ed8", "#1e3a8a"] },
      description:
        "Encadre plusieurs responsables de rayon PGC. Pilote le chiffre d'affaires, les marges et l'équipe d'encadrement du secteur.",
      examples: [
        "Fixe les objectifs de CA et de marge à ses chefs de rayon.",
        "Arbitre les priorités d'implantation entre plusieurs rayons.",
        "Accompagne la montée en compétence de ses responsables.",
      ],
      passerelles: ["directeur-magasin"],
    },
    "manager-secteur-frais": {
      id: "manager-secteur-frais",
      title: "Manager de secteur Frais",
      aliases: ["Chef de secteur frais", "Manager univers frais (trad + LS)"],
      photo: { icon: "📊", gradient: ["#0e7490", "#155e75"] },
      description:
        "Chapeaute le frais traditionnel et/ou libre-service. Fort enjeu d'hygiène, de fraîcheur et de gestion de la casse.",
      examples: [
        "Coordonne boucherie, poissonnerie et frais LS sur les opérations.",
        "Garantit les normes d'hygiène (HACCP) sur tout le secteur.",
        "Pilote la démarque du frais.",
      ],
      passerelles: ["directeur-magasin"],
    },
    "manager-secteur-caisse": {
      id: "manager-secteur-caisse",
      title: "Manager de secteur Caisse / Relation client",
      aliases: ["Chef de secteur caisse & accueil", "Responsable relation client"],
      photo: { icon: "📊", gradient: ["#475569", "#1e293b"] },
      description:
        "Pilote l'ensemble du parcours client : caisses, accueil, services et Drive. Enjeu majeur de satisfaction client et de gestion des flux.",
      examples: [
        "Optimise l'organisation des caisses et du Drive sur la journée.",
        "Suit les indicateurs de satisfaction client.",
        "Manage les responsables caisse, accueil et Drive.",
      ],
      passerelles: ["directeur-magasin"],
    },
    "directeur-magasin": {
      id: "directeur-magasin",
      title: "Directeur de magasin",
      aliases: ["Directeur d'hypermarché", "Directeur de supermarché", "Chef de magasin"],
      photo: { icon: "🏆", gradient: ["#111827", "#000000"] },
      description:
        "Dirige l'ensemble du point de vente : résultats, équipes, relation avec la centrale et les clients. Aboutissement classique du parcours en magasin.",
      examples: [
        "Fixe la stratégie commerciale du magasin.",
        "Manage l'ensemble des managers de secteur.",
        "Est responsable du compte d'exploitation du magasin.",
      ],
      passerelles: [],
    },
    // Passerelles métiers de bouche entre trad et LS
    "boucher-ls": {
      id: "boucher-ls",
      title: "Boucher Libre-Service",
      aliases: ["Responsable boucherie LS", "Préparateur viande LS"],
      photo: { icon: "🥩", gradient: ["#ef4444", "#7f1d1d"] },
      description:
        "Prépare et conditionne la viande vendue en libre-service (barquettes). Passerelle naturelle depuis la boucherie traditionnelle.",
      examples: [
        "Conditionne les steaks hachés et rôtis en barquettes.",
        "Gère les dates courtes du rayon viande LS.",
        "Assure la traçabilité et l'étiquetage.",
      ],
      passerelles: ["chef-boucher-ls", "resp-frais-ls"],
    },
    "chef-boucher-ls": {
      id: "chef-boucher-ls",
      title: "Responsable Boucherie Libre-Service",
      aliases: ["Chef de rayon viande LS", "Manager boucherie LS"],
      photo: { icon: "🥩", gradient: ["#b91c1c", "#450a0a"] },
      description:
        "Pilote le rayon viande en libre-service : commandes, marges, dates et équipe. Pont entre le savoir-faire boucher et la gestion de rayon LS.",
      examples: [
        "Gère l'assortiment viande LS et les promotions.",
        "Pilote la casse et les dates courtes.",
        "Coordonne avec la boucherie traditionnelle.",
      ],
      passerelles: ["manager-secteur-frais"],
    },
    "resp-traiteur-ls": {
      id: "resp-traiteur-ls",
      title: "Responsable Traiteur LS",
      aliases: ["Chef de rayon traiteur libre-service"],
      photo: { icon: "🍱", gradient: ["#fb923c", "#7c2d12"] },
      description:
        "Gère l'offre traiteur en libre-service (salades, plats préparés frais, snacking).",
      examples: [
        "Développe l'offre snacking du midi.",
        "Gère les dates très courtes du traiteur frais.",
        "Coordonne les opérations traiteur des fêtes.",
      ],
      passerelles: ["resp-frais-ls", "manager-secteur-frais"],
    },
    "els-liquides": {
      id: "els-liquides",
      title: "Employé libre-service Liquides",
      aliases: ["ELS liquides", "Employé commercial liquides"],
      photo: { icon: "🧃", gradient: ["#7c3aed", "#4c1d95"] },
      description:
        "Réapprovisionne le rayon liquides (produits lourds et volumineux : packs d'eau, sodas).",
      examples: [
        "Réapprovisionne les packs d'eau à l'aide d'un transpalette.",
        "Gère le facing des sodas et jus.",
        "Applique les règles de sécurité pour la manutention lourde.",
      ],
      passerelles: ["resp-liquides", "els-epicerie"],
    },
  },
};

// Rend l'objet accessible pour app.js (contexte navigateur classique, pas de module).
window.STORE = STORE;
