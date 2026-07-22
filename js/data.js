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
      manager: "mgr-pgc",
      description:
        "Le cœur du libre-service non périssable : épicerie, liquides, hygiène-droguerie et bazar léger. Les plus gros volumes du magasin.",
      subZones: [
        {
          id: "epicerie",
          enseignes: ["Lidl", "Aldi", "Netto", "Leader Price", "Grand Frais", "Colruyt", "Biocoop", "Naturalia", "La Vie Claire", "NaturéO", "So.bio", "Day by Day"],
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
              passerelles: ["resp-liquides", "resp-dph", "mgr-pgc"],
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
          enseignes: ["Nicolas", "V and B", "Cavavin", "Le Repaire de Bacchus", "Lavinia", "Cash Vin", "Les Domaines qui Montent", "Le Petit Ballon"],
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
              passerelles: ["resp-epicerie", "resp-dph", "mgr-pgc"],
            },
          ],
        },
        {
          id: "dph",
          enseignes: ["Sephora", "Marionnaud", "Nocibé", "Yves Rocher", "Rituals", "Kiko", "The Body Shop", "Normal", "Aroma-Zone", "Parashop", "Aubert", "Autour de Bébé", "Orchestra"],
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
              passerelles: ["resp-epicerie", "resp-liquides", "mgr-pgc"],
            },
          ],
        },
        {
          id: "bazar",
          enseignes: ["Action", "Gifi", "La Foir'Fouille", "Centrakor", "Babou", "Stokomani", "B and M", "Noz", "HEMA", "Normal", "MaxiBazar"],
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
              passerelles: ["resp-textile", "resp-maison", "mgr-pgc"],
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
      manager: "mgr-frais-trad",
      description:
        "Le « marché » du magasin : boucherie, poissonnerie, boulangerie-pâtisserie, fromage et charcuterie à la coupe. Des métiers avec vrai savoir-faire artisanal et vente-conseil.",
      subZones: [
        {
          id: "boucherie",
          enseignes: ["Grand Frais", "Metro", "Promocash", "Maison David", "Boucheries André"],
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
              passerelles: ["mgr-frais-trad", "chef-boucher-ls"],
            },
          ],
        },
        {
          id: "poissonnerie",
          enseignes: ["Grand Frais", "Metro", "Promocash", "La Marée", "Poiscaille"],
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
              passerelles: ["mgr-frais-trad", "resp-fl"],
            },
          ],
        },
        {
          id: "boulangerie",
          enseignes: ["Marie Blachère", "Ange", "La Mie Câline", "Paul", "Sophie Lebreuilly", "Feuillette", "Banette", "Brioche Dorée", "La Croissanterie", "Louise"],
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
              passerelles: ["mgr-frais-trad", "resp-traiteur-ls"],
            },
          ],
        },
        {
          id: "coupe",
          enseignes: ["Grand Frais", "Metro", "Androuet", "La Fromagerie", "Lenôtre", "Fauchon"],
          name: "Charcuterie Traiteur Fromage",
          icon: "🧀",
          description: "Charcuterie, traiteur et fromage à la coupe (stand traditionnel).",
          jobs: [
            {
              id: "fromager",
              title: "Charcutier-traiteur / Fromager (coupe)",
              aliases: ["Vendeur charcuterie-traiteur-fromage", "Vendeur coupe", "Responsable Charcuterie Traiteur Fromage"],
              photo: { icon: "🧀", gradient: ["#eab308", "#713f12"] },
              description:
                "Vente à la coupe de fromages et charcuteries, conseil client, découpe, emballage et mise en valeur du stand traditionnel.",
              examples: [
                "Compose un plateau de fromages pour un client.",
                "Découpe le jambon à la demande et gère la rotation.",
                "Propose une dégustation pour faire découvrir un produit.",
              ],
              passerelles: ["resp-charcuterie-ls", "mgr-frais-trad"],
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
      manager: "mgr-frais-ls",
      description:
        "Tout le frais emballé en libre-service : produits laitiers, charcuterie LS, traiteur LS et surgelés. Forte contrainte de dates courtes et de chaîne du froid.",
      subZones: [
        {
          id: "cremerie-ls",
          enseignes: ["Grand Frais", "Lidl", "Aldi", "Netto", "Colruyt"],
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
              passerelles: ["resp-charcuterie-ls", "resp-surgeles", "mgr-frais-ls"],
            },
          ],
        },
        {
          id: "charcuterie-ls",
          enseignes: ["Grand Frais", "Lidl", "Aldi", "Netto", "Colruyt"],
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
              passerelles: ["resp-frais-ls", "fromager", "mgr-frais-ls"],
            },
          ],
        },
        {
          id: "surgeles",
          enseignes: ["Picard", "Thiriet", "Place du Marché", "Gel 2000"],
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
              passerelles: ["resp-frais-ls", "mgr-frais-ls"],
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
      manager: "mgr-fl",
      description:
        "Souvent le premier rayon à l'entrée : c'est la vitrine fraîcheur du magasin. Gestion très fine des arrivages, de la casse et du théâtralisation.",
      subZones: [
        {
          id: "fl-sub",
          enseignes: ["Grand Frais", "Biocoop", "Naturalia", "NaturéO", "So.bio", "Frais d'ici", "Les Halles"],
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
              passerelles: ["poissonnier", "mgr-fl", "resp-epicerie"],
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
      manager: "mgr-culturel",
      description:
        "Livres, presse, jeux vidéo, high-tech, son et image, billetterie. Un univers où le conseil et la connaissance produit font la différence.",
      subZones: [
        {
          id: "librairie",
          enseignes: ["Fnac", "Cultura", "Furet du Nord", "Gibert Joseph", "Decitre", "Relay", "Maison de la Presse"],
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
          enseignes: ["Fnac", "Darty", "Boulanger", "Micromania", "LDLC", "Materiel.net", "Cultura", "Cdiscount"],
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
      manager: "mgr-textile",
      description:
        "Textile (prêt-à-porter, chaussures), maison, électroménager et bazar lourd. Univers de la mode, du merchandising et de l'équipement du foyer.",
      subZones: [
        {
          id: "textile",
          enseignes: ["Kiabi", "Gémo", "La Halle", "C and A", "Primark", "H and M", "Zeeman", "Vib's", "Cache Cache", "Jules"],
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
          enseignes: ["But", "Conforama", "IKEA", "Maisons du Monde", "Darty", "Boulanger", "Electro Dépôt", "Casa", "Alinéa", "Zôdio"],
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
      id: "bricolage",
      area: "brico",
      name: "Bricolage / Jardinerie",
      subtitle: "Bricolage & jardin",
      icon: "🔧",
      color: "#ea580c",
      manager: "mgr-bricolage",
      description:
        "Le secteur Bricolage / Jardinerie, à droite du magasin. Il se divise en deux sous-ensembles : le Bricolage (outillage, quincaillerie, électricité, peinture et déco) et la Jardinerie (plantes, jardin, plein air, mobilier de jardin). Un univers technique de vente-conseil, très saisonnier et fait de produits souvent encombrants.",
      subZones: [
        {
          id: "ss-bricolage",
          enseignes: ["Leroy Merlin", "Castorama", "Brico Dépôt", "Weldom", "Mr Bricolage", "Bricomarché", "Bricorama", "Point P"],
          name: "Bricolage",
          icon: "🔧",
          description: "Sous-ensemble Bricolage : outillage à main et électroportatif, quincaillerie, électricité, peinture, revêtements et décoration.",
          jobs: [
            {
              id: "resp-outillage",
              title: "Responsable de rayon Outillage",
              aliases: ["Chef de rayon outillage-quincaillerie", "Responsable quincaillerie"],
              photo: { icon: "🔧", gradient: ["#ea580c", "#7c2d12"] },
              description:
                "Gère un rayon technique de vente-conseil : outillage à main et électroportatif, quincaillerie, électricité. Assortiment très large et bonne connaissance produit exigée.",
              examples: [
                "Conseille un client sur le choix d'une perceuse selon son usage.",
                "Gère un assortiment de milliers de références (visserie, quincaillerie).",
                "Met en avant les nouveautés électroportatif en tête de gondole.",
              ],
              passerelles: ["resp-peinture", "resp-jardin", "resp-maison", "mgr-bricolage"],
            },
            {
              id: "resp-peinture",
              title: "Responsable de rayon Peinture & Déco",
              aliases: ["Chef de rayon peinture-décoration", "Responsable revêtements"],
              photo: { icon: "🎨", gradient: ["#d97706", "#78350f"] },
              description:
                "Gère la peinture, les revêtements (sol, mur) et la décoration. Vente-conseil sur les finitions, les teintes et le calcul des quantités.",
              examples: [
                "Aide un client à calculer la quantité de peinture pour une pièce.",
                "Conseille sur le type de revêtement adapté à un usage.",
                "Anime le nuancier et les nouveautés décoration.",
              ],
              passerelles: ["resp-outillage", "resp-jardin", "mgr-bricolage"],
            },
            {
              id: "vendeur-brico",
              title: "Vendeur-conseil Bricolage",
              aliases: ["Conseiller de vente bricolage", "Employé rayon bricolage"],
              photo: { icon: "🛠️", gradient: ["#f97316", "#9a3412"] },
              description:
                "Accueille et conseille les clients, réapprovisionne le rayon et oriente vers les bons produits et accessoires. Poste d'entrée du secteur.",
              examples: [
                "Aide un client à réunir tout le nécessaire pour un projet.",
                "Réapprovisionne et range un rayon à très nombreuses références.",
                "Explique l'utilisation d'un outil ou d'un produit technique.",
              ],
              passerelles: ["resp-outillage", "resp-jardin"],
            },
          ],
        },
        {
          id: "jardinerie",
          enseignes: ["Botanic", "Truffaut", "Jardiland", "Gamm Vert", "Villaverde", "Delbard", "Point Vert", "Baobab"],
          name: "Jardinerie",
          icon: "🪴",
          description: "Sous-ensemble Jardinerie : plantes, terreau, jardin, plein air, mobilier de jardin, barbecue.",
          jobs: [
            {
              id: "resp-jardin",
              title: "Responsable de rayon Jardinerie",
              aliases: ["Chef de rayon jardinerie", "Responsable jardin / plein air"],
              photo: { icon: "🪴", gradient: ["#16a34a", "#14532d"] },
              description:
                "Rayon très saisonnier (printemps/été) : jardinerie, plantes, mobilier de jardin, barbecue, plein air. Gros volumes ponctuels et forte théâtralisation.",
              examples: [
                "Monte l'opération jardin au printemps (plantes, terreau, mobilier).",
                "Gère les gros volumes saisonniers (barbecues, salons de jardin).",
                "Écoule les stocks en fin de saison via des démarques.",
              ],
              passerelles: ["resp-outillage", "resp-peinture", "mgr-bricolage"],
            },
            {
              id: "vendeur-jardinerie",
              title: "Vendeur-conseil Jardinerie",
              aliases: ["Conseiller de vente jardinerie", "Employé rayon jardin"],
              photo: { icon: "🌱", gradient: ["#22c55e", "#166534"] },
              description:
                "Accueille et conseille les clients sur les plantes et le jardin, entretient les végétaux et réapprovisionne le rayon.",
              examples: [
                "Conseille un client sur l'entretien d'une plante.",
                "Arrose et soigne les végétaux du rayon.",
                "Prépare l'implantation de la saison jardin.",
              ],
              passerelles: ["resp-jardin", "vendeur-brico"],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "caisses",
      area: "caisses",
      name: "Caisses & Accueil",
      subtitle: "Relation client & flux",
      icon: "🧾",
      color: "#475569",
      manager: "mgr-caisse",
      description:
        "La ligne de caisses et l'accueil : le dernier (et souvent premier) contact avec le client. Métiers de flux, de service et de relation client.",
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
              passerelles: ["charge-accueil", "resp-drive", "mgr-caisse"],
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
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "drive",
      area: "drive",
      name: "Drive",
      subtitle: "E-commerce & préparation de commandes",
      icon: "🚗",
      color: "#0284c7",
      manager: "mgr-drive",
      description:
        "Le Drive : préparation des commandes passées en ligne et remise au client sans qu'il entre en magasin. Une activité e-commerce à part entière, souvent détachée du reste du point de vente.",
      subZones: [
        {
          id: "drive-prep",
          enseignes: ["Chronodrive", "Leclerc Drive", "Auchan Drive", "Carrefour Drive", "Courses U", "Cora Drive", "Amazon"],
          name: "Préparation & retrait",
          icon: "🚗",
          description: "Picking des commandes, gestion des créneaux et remise au client au point de retrait.",
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
              passerelles: ["resp-caisse", "charge-accueil", "mgr-caisse"],
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
    /*
     * Managers de secteur = les métiers "chapeau" de chaque grande catégorie
     * (Responsable / Manager de secteur). Ils encadrent plusieurs responsables
     * de rayon et sont affichés en tête de chaque espace.
     */
    "mgr-pgc": {
      id: "mgr-pgc",
      title: "Manager de secteur PGC",
      aliases: ["Responsable PGC", "Chef de secteur PGC", "Manager marchandises générales", "Manager univers épicerie-liquides-DPH-bazar"],
      photo: { icon: "🧑‍💼", gradient: ["#1d4ed8", "#1e3a8a"] },
      description:
        "Encadre l'ensemble des responsables de rayon PGC (épicerie, liquides, DPH, bazar). Pilote le chiffre d'affaires, les marges et l'équipe d'encadrement du plus gros secteur en volume.",
      examples: [
        "Fixe les objectifs de CA et de marge à ses chefs de rayon.",
        "Arbitre les priorités d'implantation entre plusieurs rayons.",
        "Accompagne la montée en compétence de ses responsables.",
      ],
      passerelles: ["mgr-alimentaire", "mgr-non-alim", "directeur-magasin"],
    },
    // Chef de département FRAIS : regroupe frais trad + frais LS + fruits & légumes
    "mgr-frais": {
      id: "mgr-frais",
      title: "Chef de département Frais",
      aliases: ["Manager de département Frais", "Responsable Frais", "Directeur du frais"],
      photo: { icon: "❄️", gradient: ["#0891b2", "#0c4a6e"] },
      description:
        "Chapeaute l'ensemble du frais du magasin : le frais traditionnel (métiers de bouche), le frais libre-service et les fruits & légumes. Encadre les managers de secteur de ces trois univers. Poste clé, très exposé sur l'hygiène, la fraîcheur et la casse.",
      examples: [
        "Coordonne les trois secteurs frais sur les opérations et la saisonnalité.",
        "Garantit la politique d'hygiène (HACCP) et de fraîcheur sur tout le département.",
        "Pilote la marge et la démarque globale du frais, et manage les 3 managers de secteur.",
      ],
      passerelles: ["mgr-alimentaire", "directeur-magasin"],
    },
    // Managers de secteur bricolage + chefs de département alimentaire / non-alimentaire
    "mgr-bricolage": {
      id: "mgr-bricolage",
      title: "Manager de secteur Bricolage / Jardinerie",
      aliases: ["Responsable Bricolage / Jardinerie", "Chef de secteur bricolage-jardin"],
      photo: { icon: "🧑‍💼", gradient: ["#ea580c", "#7c2d12"] },
      description:
        "Chapeaute l'univers Bricolage / Jardinerie, en deux sous-ensembles : le Bricolage (outillage-quincaillerie, électricité, peinture-déco) et la Jardinerie (plantes, jardin, plein air). Enjeu de vente-conseil technique, de saisonnalité (jardin) et de gestion de produits encombrants.",
      examples: [
        "Pilote la saison jardin, temps fort commercial du secteur.",
        "Coordonne l'assortiment technique et la vente-conseil.",
        "Manage les responsables outillage, jardin et peinture.",
      ],
      passerelles: ["mgr-non-alim", "directeur-magasin"],
    },
    "mgr-alimentaire": {
      id: "mgr-alimentaire",
      title: "Chef de département Alimentaire",
      aliases: ["Manager de département Alimentaire", "Responsable Alimentaire", "Directeur du secteur alimentaire"],
      photo: { icon: "🍎", gradient: ["#15803d", "#052e16"] },
      description:
        "Dirige toute la partie alimentaire du magasin : le PGC alimentaire (épicerie, liquides), l'ensemble du frais (traditionnel et libre-service) et les fruits & légumes. Encadre les managers de secteur et le chef de département Frais.",
      examples: [
        "Fixe la stratégie et les objectifs commerciaux de tout l'alimentaire.",
        "Arbitre entre les secteurs (frais, épicerie, F&L) sur les opérations.",
        "Garantit l'hygiène, la fraîcheur et la performance du food.",
      ],
      passerelles: ["directeur-magasin"],
    },
    "mgr-non-alim": {
      id: "mgr-non-alim",
      title: "Chef de département Non-Alimentaire",
      aliases: ["Manager de département Non-Alimentaire", "Responsable Non-Alimentaire", "Directeur du bazar / non-alim"],
      photo: { icon: "🛍️", gradient: ["#7c3aed", "#3b0764"] },
      description:
        "Dirige toute la partie non-alimentaire : le DPH et le bazar (issus du PGC), le textile & maison, l'espace culturel et le bricolage. Encadre les managers de secteur non-alimentaires.",
      examples: [
        "Fixe la stratégie des univers non-food (mode, maison, culture, bricolage).",
        "Pilote les collections, les temps forts et la marge du non-alimentaire.",
        "Manage les managers de secteur textile, culturel et bricolage.",
      ],
      passerelles: ["directeur-magasin"],
    },
    "mgr-frais-trad": {
      id: "mgr-frais-trad",
      title: "Manager de secteur Frais Traditionnel",
      aliases: ["Responsable Frais Traditionnel", "Responsable Frais Trad", "Chef de secteur marché", "Manager métiers de bouche"],
      photo: { icon: "🧑‍💼", gradient: ["#dc2626", "#7f1d1d"] },
      description:
        "Chapeaute les métiers de bouche : boucherie, poissonnerie, boulangerie et charcuterie-traiteur-fromage. Fort enjeu de savoir-faire artisanal, d'hygiène (HACCP) et de gestion de la casse. Rattaché au chef de département Frais.",
      examples: [
        "Coordonne boucherie, poissonnerie et boulangerie sur les opérations.",
        "Garantit les normes d'hygiène et la traçabilité sur tout le secteur.",
        "Pilote la marge et la démarque du frais traditionnel.",
      ],
      passerelles: ["mgr-frais", "directeur-magasin"],
    },
    "mgr-frais-ls": {
      id: "mgr-frais-ls",
      title: "Manager de secteur Frais Libre-Service",
      aliases: ["Responsable Frais LS", "Chef de secteur frais LS", "Manager univers frais libre-service"],
      photo: { icon: "🧑‍💼", gradient: ["#0891b2", "#155e75"] },
      description:
        "Pilote l'ensemble du frais emballé : crèmerie LS, charcuterie/traiteur LS et surgelés. Enjeu majeur de dates courtes, de chaîne du froid et de gestion des commandes au plus juste.",
      examples: [
        "Coordonne les commandes pour limiter la casse sur tout le secteur.",
        "Garantit la chaîne du froid et gère les pannes des meubles froids.",
        "Manage les responsables crèmerie, charcuterie LS et surgelés.",
      ],
      passerelles: ["mgr-frais", "directeur-magasin"],
    },
    "mgr-fl": {
      id: "mgr-fl",
      title: "Manager de secteur Fruits & Légumes",
      aliases: ["Responsable Fruits & Légumes", "Chef de secteur marché F&L", "Manager primeur"],
      photo: { icon: "🧑‍💼", gradient: ["#16a34a", "#14532d"] },
      description:
        "Chapeaute le rayon fruits & légumes (souvent rattaché au secteur frais). Enjeu de fraîcheur, de casse et de théâtralisation de la vitrine du magasin.",
      examples: [
        "Pilote la casse et la marge d'un rayon très fragile.",
        "Coordonne les arrivages quotidiens et la saisonnalité.",
        "Anime l'équipe pour tenir un étal impeccable toute la journée.",
      ],
      passerelles: ["mgr-frais", "directeur-magasin"],
    },
    "mgr-culturel": {
      id: "mgr-culturel",
      title: "Manager de secteur Culture & Loisirs",
      aliases: ["Responsable Espace Culturel", "Chef de secteur culture", "Manager multimédia & culture"],
      photo: { icon: "🧑‍💼", gradient: ["#9333ea", "#581c87"] },
      description:
        "Encadre l'espace culturel et multimédia (livres, presse, high-tech, jeux vidéo). Univers de conseil, de nouveautés et de produits à forte valeur.",
      examples: [
        "Pilote les temps forts culturels (rentrée littéraire, sorties high-tech).",
        "Gère les produits à forte valeur et la lutte contre la démarque.",
        "Manage les responsables librairie/presse et multimédia.",
      ],
      passerelles: ["mgr-non-alim", "directeur-magasin"],
    },
    "mgr-textile": {
      id: "mgr-textile",
      title: "Manager de secteur Textile & Maison",
      aliases: ["Responsable secteur non-alimentaire", "Chef de secteur textile-maison", "Manager bazar & équipement"],
      photo: { icon: "🧑‍💼", gradient: ["#ca8a04", "#78350f"] },
      description:
        "Chapeaute le non-alimentaire lourd : textile, maison, électroménager et bazar. Univers du merchandising, des collections saisonnières et de la vente-conseil.",
      examples: [
        "Pilote les collections et les temps forts (soldes, saison jardin).",
        "Coordonne le merchandising et la présentation des univers.",
        "Manage les responsables textile et maison/électroménager.",
      ],
      passerelles: ["mgr-non-alim", "directeur-magasin"],
    },
    "mgr-caisse": {
      id: "mgr-caisse",
      title: "Manager de secteur Caisses & Accueil",
      aliases: ["Responsable Caisses & Accueil", "Chef de secteur caisse", "Responsable relation client"],
      photo: { icon: "🧑‍💼", gradient: ["#475569", "#1e293b"] },
      description:
        "Pilote le parcours client : ligne de caisses, accueil et services. Enjeu majeur de satisfaction client et de gestion des flux aux heures de pointe.",
      examples: [
        "Optimise l'organisation des caisses sur la journée.",
        "Suit les indicateurs de satisfaction client.",
        "Manage les responsables caisse et accueil.",
      ],
      passerelles: ["mgr-drive", "directeur-magasin"],
    },
    "mgr-drive": {
      id: "mgr-drive",
      title: "Manager de secteur Drive / E-commerce",
      aliases: ["Responsable Drive", "Chef de secteur Drive", "Manager e-commerce magasin"],
      photo: { icon: "🧑‍💼", gradient: ["#0284c7", "#0c4a6e"] },
      description:
        "Dirige l'activité Drive et e-commerce du magasin : équipe de préparateurs, respect des créneaux, taux de service et logistique de préparation. Une activité souvent gérée à part.",
      examples: [
        "Pilote le taux de service et la productivité du picking.",
        "Organise l'équipe pour tenir les créneaux de retrait.",
        "Développe l'activité e-commerce du point de vente.",
      ],
      passerelles: ["mgr-caisse", "directeur-magasin"],
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
      passerelles: ["mgr-frais-ls"],
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
      passerelles: ["resp-frais-ls", "mgr-frais-ls"],
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

  /*
   * Départements = grandes catégories qui regroupent plusieurs zones/secteurs.
   * (Ex : le département FRAIS regroupe frais traditionnel, frais LS et F&L.)
   */
  departments: {
    // Grandes catégories transverses. Elles sont définies par RAYON (subZones),
    // ce qui permet les chevauchements : un rayon du PGC peut relever de
    // l'alimentaire (épicerie) ou du non-alimentaire (bazar), et le Frais est
    // un sous-ensemble de l'alimentaire.
    alimentaire: {
      id: "alimentaire",
      name: "Alimentaire",
      icon: "🍎",
      color: "#15803d",
      manager: "mgr-alimentaire",
      subZones: [
        "epicerie", "liquides",
        "boucherie", "poissonnerie", "boulangerie", "coupe",
        "cremerie-ls", "charcuterie-ls", "surgeles",
        "fl-sub",
      ],
      description:
        "La grande catégorie alimentaire : tous les rayons de produits à manger et à boire. Elle regroupe le PGC alimentaire (épicerie, liquides), tout le frais (traditionnel et libre-service) et les fruits & légumes. Le département Frais en fait partie.",
    },
    "non-alimentaire": {
      id: "non-alimentaire",
      name: "Non-Alimentaire",
      icon: "🛍️",
      color: "#7c3aed",
      manager: "mgr-non-alim",
      subZones: [
        "dph", "bazar",
        "librairie", "multimedia",
        "textile", "maison",
        "ss-bricolage", "jardinerie",
      ],
      description:
        "La grande catégorie non-alimentaire : tout ce qui ne se mange pas. Elle regroupe une partie du PGC (DPH, bazar), le textile & maison, l'espace culturel et le bricolage. C'est normal que certains rayons soient communs avec le PGC.",
    },
    frais: {
      id: "frais",
      name: "Frais",
      icon: "❄️",
      color: "#0891b2",
      manager: "mgr-frais",
      showOnPlan: true, // matérialisé par un badge flocon sur le plan
      subZones: [
        "boucherie", "poissonnerie", "boulangerie", "coupe",
        "cremerie-ls", "charcuterie-ls", "surgeles",
        "fl-sub",
      ],
      description:
        "Le département du frais (sous-ensemble de l'alimentaire), qui regroupe trois secteurs : le Frais Traditionnel (métiers de bouche), le Frais Libre-Service et les Fruits & Légumes. Un univers piloté ensemble car il partage les mêmes enjeux : fraîcheur, hygiène (HACCP), chaîne du froid et gestion de la casse.",
    },
  },
};

// Rend l'objet accessible pour app.js (contexte navigateur classique, pas de module).
window.STORE = STORE;
