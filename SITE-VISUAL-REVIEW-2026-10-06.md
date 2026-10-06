# Revue visuelle finale du site, 2026-10-06 (Thalie)

Branche `homepage-refresh-2026-10-06`, commit `a6e3cf0`. J'ai regardé les vraies captures pleine hauteur, après défilement, à 1440 et à 390 px pour les 7 pages (`scratchpad/site-shots2/`), puis vérifié l'usage de `--flare` dans `assets/*.css`.

## Verdict : GO pour publier

Aucun correctif bloquant.

## Ce qui tient

- **Un seul site** : même header (logo vaisseau, Fleet / Studio / About, « Let's talk » en ghost), même footer, mêmes tokens, même échelle typo (Familjen pour les titres, Sora pour le texte, Plex Mono pour les eyebrows), mêmes eyebrows mono turquoise, mêmes cartes `--surface` à filet fin. Le ciel est présent partout sauf sur Legal, qui reste sur un fond uni : conforme.
- **Système cuivre / turquoise cohérent** : le cuivre ne sert qu'aux mots mis en valeur dans les titres (`h1 em` / `h2 em` : trajectory, next, Neither should its tools., field, same, your), aux numéros d'étapes (`.step-num`, `.service-number`), au filet de la citation du Manifesto, aux tirets de Contact, à l'icône de citation et à la case de la vignette PetraPilot. Le turquoise couvre tout l'interactif : CTA pleins, liens, état actif de la nav (souligné), e-mail de Contact, focus. Un même rôle garde la même couleur sur toutes les pages.
- **Portrait de David** : `assets/crew/david.webp` correspond bien au master `david-profile-v2.png` (silhouette sans visage, veine cuivre). Il est en première position du rail équipage de l'accueil, sur desktop comme sur mobile.
- **Mobile 390** : rien ne déborde, pas de trou vide, pas de section invisible. Les cartes s'empilent proprement, les CTA sont pleine largeur sur l'accueil et le rail défile horizontalement comme prévu.
- **Lisibilité** : le texte courant est confortable, la colonne du Manifesto est de bonne largeur et Legal est très lisible. Je n'ai vu aucun artefact du type « généré de travers ».

## Finitions pour plus tard (non bloquantes)

1. **Flèches des CTA incohérentes** : sur l'accueil, les boutons portent `↗` (« Write to the crew ↗ »), alors que le même bouton sur About / Products / Agentic n'en a pas, et que « Visit SabaiPilot → » utilise `→`. À unifier : `↗` pour tout lien qui sort de la page, ou aucune flèche. Fichiers : `about.html`, `products.html`, `agentic.html`, dans le bloc CTA final.
2. **Badge « Live » sous deux formes** : texte simple « • Live » sur les fleet cards de l'accueil, pastille encadrée « • LIVE » sur Products. Choisir une seule forme. Fichiers : `assets/pages.css` (badge Products) et `assets/site.css` / `homepage.css` (fleet card).
3. **Cartes imbriquées sur Products en mobile** : les features sont des cartes à l'intérieur de la carte produit, ce qui fait trois niveaux de padding et une colonne de texte d'environ 230 px. Sous 600 px, enlever la bordure et le fond des cartes de features et garder seulement le filet de séparation. Fichier : `assets/pages.css`, dans le media query mobile, sélecteur de la grille de features de `.page-products`.
4. **E-mail de Contact en mobile** : l'adresse se coupe en « cyphershiplabs / @gmail.com ». C'est propre, mais réduire le minimum de `clamp()` à environ 24px sous 400 px la ferait tenir sur une ligne. Fichier : `assets/pages.css:92`, `.page-contact .email-link`.
5. **Grille impaire sur Agentic en desktop** : 7 services sur 2 colonnes laissent « Free first audit » seul sur sa ligne. On peut l'étendre sur les deux colonnes ou le traiter comme une carte d'appel turquoise. Fichier : `assets/pages.css`, grille des services de `.page-agentic`.
6. **Recadrage du portrait de David** : la tête touche presque le haut de la carte, alors que les autres portraits ont de l'air au-dessus. À tester : `object-position: center 0` combiné à un léger dézoom, ou une version WebP recadrée avec plus de marge en haut. Fichier : `assets/homepage.css:120`, `.crew-portrait.founder-portrait img`.

## Hors de mon périmètre, signalé seulement

- **Iris** : apostrophes droites sur les pages intérieures (« don't », « We're ») et courbes sur l'accueil (« doesn’t », « What’s »).
- **Minos** : Legal parle d'un « contact form », mais le site n'a pas de formulaire, seulement un e-mail. Le contenu de Legal reste intouché, comme prévu.
