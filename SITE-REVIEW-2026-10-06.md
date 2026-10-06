# Site mère — harmonisation du 6 octobre 2026

La direction d’accueil retenue par David est appliquée aux sept pages du site : Home, Products, Agentic, About, Manifesto, Contact et Legal. La composition reste sobre, avec une lecture plus généreuse, des surfaces bleu nuit et des accents cuivre/turquoise cohérents avec CypherShip Labs.

## État

- Travail local sur la branche `homepage-refresh-2026-10-06`.
- Aucune publication du site en ligne.
- Relecture statique indépendante de Paris : GO. La relecture finale de Thalie reste à faire.
- Sauvegarde du lot par commit et push sur `homepage-refresh-2026-10-06` uniquement ; aucune fusion dans `main`.

## Structure livrée

- `assets/site.css` et `assets/site.js` constituent le socle partagé : palette, fontes locales, navigation, ciel discret, interactions et comportement du menu.
- `assets/homepage.css` et `assets/homepage.js` gardent les traitements propres à l’accueil, notamment le rail de portraits.
- `assets/pages.css` harmonise les six pages intérieures, leurs sections, cartes, étapes et rythme de lecture. Legal reste une page de document lisible, sans ciel.
- Quatre fichiers WOFF2 dans `assets/fonts/` sont extraits des fontes déjà embarquées, avec leurs octets d’origine conservés : Familjen Grotesk variable, Sora variable, Plex Mono regular et medium. Il ne s’agit pas d’un remplacement typographique.
- `assets/crew/david.webp` est dérivé du visuel v2 de David ; aucun master n’est remplacé par ce WebP d’affichage.

Le cuivre écran `#E3B168` accompagne les accents éditoriaux — titres, emphases, repères d’étapes et détails. Le turquoise conserve les interactions. La page Legal privilégie la lecture de son texte complet et ne reçoit pas de décor de ciel.

## Contenu et contrats conservés

Paris confirme la conservation, par comparaison avec le baseline, du texte principal, des métadonnées SEO, du JSON-LD, des URL et des ancres. Products conserve ses descriptions détaillées et ses prix. Les schémas de l’accueil, explicitement étiquetés, ne remplacent pas ces informations et ne sont pas présentés comme des captures des logiciels.

Cette passe n’ajoute aucun texte commercial, nouvelle promesse ou prix. Le grand vaisseau illustré demeure retiré de l’accueil conformément à la demande de David ; son asset et son prompt restent disponibles pour un autre usage.

## Vérifications visuelles

Noos a inspecté les sept pages dans Chrome à 1440, 390 et 320 px, avec une hauteur de viewport de 900 px, après défilement : les 21 contrôles passent sans débordement horizontal ni section masquée. Le corps de texte est à 18 px. Le menu mobile s’ouvre et se ferme par Échap ; le lien About mène à la bonne page, avec menu fermé et aria-current="page". Legal conserve son fond uni. Le portrait v2 de David est en place.

Les captures pleine page ont été regardées dans le contexte de Chrome, sans fichiers PNG persistés. Le ciel étant fixe, une capture assemblée peut montrer un artefact au bas de la page ; son rendu dans le viewport réel a été contrôlé séparément. Les portraits du rail chargés paresseusement hors champ ne doivent pas être diagnostiqués comme des images cassées à partir de cette seule capture.

Les vérifications sur téléphone physique, une mesure complète de performance et la relecture finale de Thalie ne sont pas faites. La validation statique et les contrôles Chrome ne sont pas assimilés à ces étapes.

## Transmission à Noos-Claude et Thalie

Relire la composition et la lisibilité sur mobile, le menu et son focus, les portraits, les détails des produits et la cohérence cuivre/turquoise. Legal doit rester calme et lisible. Recouper les éventuels défauts issus d’une capture pleine page dans le viewport réel avant de demander une correction du ciel ou des images lazy-loaded.

Le socle partagé permet désormais d’ajuster la navigation et les proportions de lecture sans dupliquer ces changements dans sept fichiers. Toute nouvelle correction éditoriale reste distincte de cette passe visuelle.
