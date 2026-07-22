# Les métiers de la grande distribution — Formation interactive

Outil d'onboarding pour les nouveaux arrivants de notre société de recrutement
en grande distribution. Objectif : comprendre les **métiers**, leurs **fonctions**,
les **intitulés de poste** et les **métiers passerelles** (évolutions possibles).

## Le concept

1. **Vue du magasin (plan vu du haut)** — À la connexion, l'utilisateur voit un vrai
   plan de magasin « vu de dessus » (style plan d'architecte, dessiné en SVG) : murs,
   comptoirs frais, gondoles, meubles froids, îlots fruits & légumes, ligne de caisses
   et entrée. Chaque grand espace (PGC, Frais traditionnel, Frais LS, Fruits & Légumes,
   Espace culturel, Textile & Maison, Caisses) porte le nom de ses rayons directement
   sur le plan (Épicerie, Liquides, DPH, Bazar…).
2. **Zoom sur un espace** — En cliquant sur un espace, on le décompose en sous-espaces
   (ex : PGC → Épicerie, Liquides, Bazar, DPH) et on affiche les métiers de chacun
   (Responsable liquides, Responsable bazar…).
3. **Fiche métier** — En cliquant sur un métier : une photo type du rayon, une
   description avec des exemples concrets, les intitulés de poste équivalents, et les
   **métiers passerelles** (ex : Responsable frais LS ↔ Responsable charcuterie LS).

## Lancer le projet

Aucune installation, aucun build. C'est du HTML/CSS/JS statique.

```bash
# Option simple : ouvrir directement index.html dans un navigateur.
# Ou lancer un petit serveur local :
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Structure des fichiers

```
index.html        Structure de la page (3 vues : plan, zone, fiche métier)
css/styles.css    Mise en forme (plan SVG, cartes, panneau fiche métier)
js/data.js        ⭐ TOUT LE CONTENU (zones, sous-zones, métiers, passerelles)
js/app.js         Plan SVG (objet PLAN) + logique de navigation et rendu
```

## Modifier le contenu

Tout le contenu métier est centralisé dans **`js/data.js`**. Pour ajouter/modifier :

- **Un métier** : ajouter un objet dans `jobs` de la sous-zone concernée
  (champs : `title`, `aliases`, `description`, `examples`, `passerelles`).
- **Les enseignes similaires** d'un secteur : champ `enseignes` (liste de noms)
  sur la sous-zone. Les couleurs de marque sont approximées automatiquement
  (surcharge possible dans `BRAND` de `js/app.js`). Placeholder en attendant de
  vrais logos.
- **Une passerelle** : ajouter l'`id` du métier cible dans le tableau `passerelles`.
  On peut pointer vers un métier de rayon ou un métier d'encadrement
  (`managementJobs`).
- **Une grande catégorie (département)** : dans `departments`, un département est
  défini par une **liste de rayons** (`subZones`). Les départements peuvent se
  **chevaucher** (ex : l'Alimentaire prend `epicerie`/`liquides` du PGC, le
  Non-Alimentaire prend `dph`/`bazar` du même PGC ; le Frais est un sous-ensemble
  de l'Alimentaire). `showOnPlan: true` matérialise le département par un badge
  sur le plan. Les départements apparaissent dans la barre au-dessus du plan.
- **Le plan du magasin** : les zones sont positionnées via `grid-template-areas`
  dans `css/styles.css` (chaque zone a un `area`).

## Pistes d'évolution (à discuter)

- Remplacer les placeholders emoji par de **vraies photos** de rayons
  (champ `image` à ajouter dans `photo`).
- Ajouter une **recherche** de métier / intitulé de poste.
- Visualiser les passerelles sous forme de **schéma de carrière** (graphe).
- Ajouter fiches **salaire / compétences / diplômes** par métier.
- Système de connexion / suivi de progression de l'apprenant.
