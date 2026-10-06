# Nouvelle page d’accueil — 6 octobre 2026

Direction demandée et retenue par David : site mère haut de gamme, mobile plus lisible, ciel dans l’esprit de la bannière, présence des identités de l’équipage. David a ensuite demandé de retirer le grand vaisseau illustré : l’accueil privilégie désormais une composition sobre et calme, avec le ciel visible à droite du texte. Proposition locale, non publiée.

## Réalisation

- Noah : nouvelle structure index.html, styles assets/homepage.css et interactions assets/homepage.js. SEO et fontes embarquées conservés.
- Noos-GPT : visuels WebP issus des sources existantes (sans remplacer les masters), illustration marketing du vaisseau générée avec ImageGen depuis ses références, coordination et vérification Chrome.
- Paris : revue statique indépendante, GO sans bloqueur. Liens, ancres, menu clavier, textes, images et SEO vérifiés.

## Vérifications visuelles

Chrome réel : ordinateur, mobile 390 × 844 et 320 × 740. Pas de débordement horizontal observé. Titre mobile 48 px (43 px sur 320), descriptions 18 px. Menu ouverture/Échap, ancre Fleet et commande du rail équipage testés. Chargement réel des images confirmé lors de cette première inspection. Le vaisseau a ensuite été retiré à la demande de David ; le hero desktop et mobile a été rééquilibré sans réserver de place à cette image. Portraits cadrés via CSS, sources entières conservées. Fond statique, six scintillements CSS lents ; styles reduced-motion présents. Pas de mesure de performance sur téléphone physique effectuée.

## Périmètre

Cette note décrit la première passe sur l’accueil. La direction est désormais étendue aux six autres pages : Products, Agentic, About, Manifesto, Contact et Legal. Le bilan de cette harmonisation est dans `SITE-REVIEW-2026-10-06.md`. Les trois aperçus d’interfaces de l’accueil sont des schémas explicitement étiquetés, pas des captures du produit ; les descriptions détaillées et prix de Products sont conservés. L’illustration marketing du vaisseau n’est plus affichée dans l’accueil. Son fichier et son prompt restent disponibles pour un autre usage ; ce ne sont pas une nouvelle référence technique. Aucune publication ni modification de mémoire partagée. Le statut de la sauvegarde sur la branche est décrit dans la note d’ensemble.

Images WebP utilisées par l’accueil : environ 489 Ko au total (ciel et douze portraits). Portraits lazy-loaded ; aucune requête vers le visuel du vaisseau depuis l’accueil. Origine du ciel : cyphership-character/social/david-x-banner-background-v1.png. Prompt du vaisseau : assets/cyphership-vessel-hero-v1-prompt.md.

Décision initiale de David : « trajectory » dans le titre d’accueil et « next » dans le titre de contact utilisent le cuivre écran #E3B168. Dans la passe d’harmonisation suivante, le cuivre accompagne également les accents éditoriaux des titres, étapes et détails ; les interactions restent turquoise. L’accueil conserve ses styles propres dans `assets/homepage.css`, au-dessus du socle partagé `assets/site.css` et `assets/site.js`.
