# DA accueil 2026-10-06 → 6 autres pages

Auteur : Thalie (direction visuelle). Pour : Noah (intégration), Noos-GPT (coordination), Paris (revue).
Référence : `index.html` + `assets/homepage.css` sur `homepage-refresh-2026-10-06`. Rien n'est publié.

## 0. Principe

Une seule feuille partagée, pas six copies inline. Extraire de `homepage.css` un socle `assets/site.css` (tokens, reset, typo, header, footer, boutons, eyebrow, cartes, ciel, reduced-motion) chargé par les 7 pages ; `homepage.css` ne garde que ce qui est propre à l'accueil (hero, fleet cards, studio, rail équipage). Les blocs `<style>` inline des 6 pages sont remplacés, pas empilés par-dessus.

## 1. Tokens (remplacent ceux des anciennes pages)

| Rôle | Nouveau (accueil) | Ancien (6 pages) |
|---|---|---|
| Fond | `--void:#070911` | `#05050C` |
| Surface | `--surface:#0D0D1C` | idem |
| Texte | `--text:#F1F0FF` | `--text-1` idem |
| Texte secondaire | `--muted:#B5B7CD` | `--text-2:#8D8BB3` (trop pâle) |
| Texte tertiaire | `--quiet:#939BB6` | `--text-3:#847FB0` |
| Filet | `--line:rgba(170,194,219,.17)` | `--hairline:#22223D` |
| Accent / interaction | `--ion:#5FC0D6` | idem |
| Cuivre écran | `--flare:#E3B168` | idem, mais usage très différent |

Supprimer `--text-1/2/3`, `--hairline`, `--glow-dim`, `--ion-dim`, `--flare-dim` après migration (ou les aliaser temporairement vers les nouveaux pour éviter une casse).

## 2. Règle cuivre (décision David)

Cuivre `#E3B168` = **uniquement** « trajectory » (h1 accueil) et « next » (h2 contact). Sur les 6 pages, retirer le cuivre de :
- mots surlignés des h1 (About « field », Products « same », Agentic « your ») → passer en `--ion` ou en texte plein (recommandé : texte plein, l'accent turquoise reste pour les liens) ;
- pastille CTA cuivre d'Agentic « Start a conversation » → bouton primaire turquoise de l'accueil ;
- numéros d'étapes 01–04 (Agentic, Manifesto), eyebrow « CypherShip Studio » (About) → `--ion` ou `--quiet` ;
- les ~16-17 `var(--flare)` d'About et Legal → à revoir un par un.

Note : l'accueil lui-même dépasse encore la règle (voir le rapport) ; à corriger dans le même lot.

## 3. Typographie

- Titres : `--font-display` Familjen Grotesk 500, `letter-spacing:-.035em`, `line-height:1.06`. h1 intérieur : `clamp(44px,4.4vw,64px)` (un cran sous le h1 accueil `clamp(52px,5.1vw,74px)`), `max-width` ~14ch.
- Corps : Sora 18px / 1.65, couleur `--muted`. Les anciennes pages sont en ~14-15px et `#8D8BB3` : c'est l'écart le plus visible, à corriger partout (y compris Legal).
- Mono (Plex Mono) : eyebrows et méta seulement (`01 / THE FLEET`), majuscules espacées, couleur `--ion` pour l'eyebrow.
- Fontes : déjà embarquées dans chaque page (~110-135 Ko chacune). Les sortir en fichiers `.woff2` partagés dans `assets/fonts/` ferait un gain de poids net ; optionnel, à décider par Daedal/Noah.

## 4. Composants partagés (copier le balisage exact de l'accueil)

- **Header** `.site-header` : logo vaisseau + « CypherShip Labs », nav Sora casse normale `Fleet · Studio · About` + bouton contour « Let's talk ↗ », menu mobile `Menu` avec Échap. Remplace la nav mono majuscule `HOME / CYPHERSHIP FLEET / ...`. Lien courant : `aria-current="page"` + soulignement `--ion` (à ajouter, l'accueil n'en a pas besoin).
- **Manifesto** n'a aucune nav aujourd'hui (logo seul) : lui donner le header commun.
- **Footer** `.site-footer` : marque + « Systems with a purpose. A studio with a trajectory. » + Manifesto / Legal / Contact + ligne basse « CypherShip Labs, LLC · SabaiPilot · PetraPilot · CircePilot ». Remplace la ligne mono `SYS-01 SABAIPILOT · ...`. Manifesto et About n'ont pas de footer visible : l'ajouter.
- **Boutons** : `.button.primary` turquoise plein, `.button` contour, `.text-link` avec flèche. Plus de pastilles arrondies.
- **Eyebrow** : `NN / LABEL` mono turquoise, sans le tiret `—` actuel.
- **Cartes** : surface `--surface`, filet `--line`, rayon et padding des fleet cards. About (3 cartes mission), Agentic (grille services), Contact (3 points) les reprennent.
- **Listes numérotées** (Agentic « Four steps », Manifesto 01–05) : le motif `.studio-services` de l'accueil (numéro mono petit, titre display, filet entre items).

## 5. Ciel

- `.sky` fixe (`cyphership-sky-v1.webp`) sur toutes les pages sauf Legal, avec le voile plus dense de la variante mobile (`.45 → .76`) pour garder le texte long lisible.
- Legal : fond `--void` uni, pas de ciel, pas de scintillement (page de lecture et de conformité).
- Scintillements : accueil seulement. Reduced-motion déjà géré, à reprendre tel quel.
- Pas de vaisseau illustré nulle part (décision David).

## 6. Mise en page par page

- **About** : hero gauche comme l'accueil ; Origin en bloc texte ≤ 65ch ; Mission = 3 cartes ; lien manifesto en `.text-link`. Possibilité de reprendre le rail équipage ici plus tard, pas dans ce lot.
- **Products (Fleet)** : réutiliser les 3 fleet cards de l'accueil (mêmes schémas « Illustrative interface preview ») plutôt qu'un second dessin.
- **Agentic (Studio)** : hero + bouton primaire turquoise, grille services en cartes, « Four steps » en liste numérotée.
- **Manifesto** : colonne de lecture ≤ 68ch, Sora 18px, liste numérotée ; garder la sobriété, pas de cartes.
- **Contact** : centrage conservé ; l'adresse e-mail en display 32-40px, lien `--ion`. Le « next » cuivre est le titre de la section contact de l'accueil (`#contact-title`), pas de contact.html : ici, h1 « One conversation. No pitch deck. » sans cuivre.
- **Legal** : uniquement header/footer/tokens/typo. Contenu juridique, ordre, dates : intouchés.

## 7. Ne PAS changer

- Aucun texte (copy = Iris ; toute modif passe par elle).
- `<title>`, meta description, canonical, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`, URLs et ancres existantes.
- Contenu de `legal.html` (texte, mentions, dates).
- Logo vaisseau et favicons (déjà migrés).
- Masters des portraits (ne servir que des WebP dérivés).

## 8. Vérification avant publication

- Captures 1440 / 390 / 320 des 7 pages en **vraie pleine hauteur**, après défilement (les `.reveal` restent invisibles en headless sans scroll, les portraits sont lazy).
- Contraste : `--muted` sur `--void` et sur `--surface` ≥ 4.5:1 ; focus visible sur nav, boutons, rail.
- `grep var(--flare)` sur tout le site : seulement les deux titres (+ éventuellement l'état ouvert du menu, à trancher).
- Paris : revue finale ; Noah : intégration ; un seul commit, une seule publication des 7 pages.
