# Logos des enseignes

Déposez ici les vrais logos. **Aucune modification de code nécessaire** : dès qu'un
fichier au bon nom est présent, il remplace automatiquement la tuile de marque
dans l'onglet « Enseignes ».

## Comment nommer les fichiers

Un fichier par enseigne, nommé avec **l'identifiant de l'enseigne**, en `.svg`
(recommandé) ou `.png` (fond transparent de préférence). Le code cherche d'abord
le `.svg`, puis le `.png`.

| Fichier à déposer            | Enseigne                          |
| ---------------------------- | --------------------------------- |
| `leclerc.svg`                | E.Leclerc                         |
| `intermarche.svg`            | Intermarché                       |
| `u.svg`                      | Coopérative U                     |
| `netto.svg`                  | Netto                             |
| `carrefour-prox.svg`         | Carrefour Market / Contact        |
| `carrefour-hyper.svg`        | Carrefour (hypermarché)           |
| `auchan.svg`                 | Auchan                            |
| `lidl.svg`                   | Lidl                              |
| `aldi.svg`                   | Aldi                              |
| `casino.svg`                 | Monoprix / Franprix / Casino      |

(Remplacez `.svg` par `.png` si vous n'avez que du PNG.)

## Comment uploader (depuis GitHub, sans rien installer)

1. Sur GitHub, ouvrez le dossier **`assets/logos/`** du dépôt.
2. Bouton **« Add file » → « Upload files »**.
3. Glissez vos fichiers logo (nommés comme dans le tableau ci-dessus).
4. **Commit** directement sur `main`.

Le déploiement se relance tout seul et les logos apparaissent en ligne en ~1 min.

## Notes

- Format conseillé : **SVG** (net à toutes les tailles). Sinon PNG large (≥ 200 px)
  à fond transparent.
- Si un logo manque, l'enseigne garde simplement sa tuile de marque colorée.
- Pour un chemin/format particulier, on peut aussi renseigner le champ `logo`
  d'une enseigne dans `js/enseignes.js` (ex. `logo: "assets/logos/u.webp"`).
