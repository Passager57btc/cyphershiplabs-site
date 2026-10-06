# Mission 2 — Crew Kit — transmission

Branche : `crew-kit-rename`, créée depuis `main` / `origin/main` au commit `759f4ca`.

- `kit.html` : 10 remplacements exacts de « Kit Équipage » par « Crew Kit », dans le titre, les métadonnées, l'introduction, la case de consentement et la notice.
- `legal.html` : 2 remplacements exacts, uniquement dans les paragraphes Données personnelles / Personal data.
- Aucun autre texte, attribut, URL, identifiant, style ou comportement du formulaire n'a changé. L'URL reste `/kit.html` ; le h1 existant ne contenait pas l'ancien nom.

Vérifications : comparaison de chaque fichier entier au contenu de `759f4ca`, après la seule substitution autorisée ; recherche sans résultat de l'ancien nom dans les fichiers HTML ; `git diff --check`.

Une occurrence non visible demeure dans un commentaire historique de `assets/pages.css` ; les anciennes notes de transmission sont conservées. Aucun changement en dehors des deux pages et de cette note.

Les brouillons sont traités séparément sur `kit-equipage-drafts`, sans changer leurs chemins. Brevo et la bio X sont hors de cette partie de la mission et restent à vérifier par Noos-GPT. L'inscription réelle sera testée par Noos-Claude. Rien n'est publié ; relecture et autorisations requises avant fusion dans `main`.
