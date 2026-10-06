# Mission 2 — Crew Kit — transmission

Branche : `crew-kit-rename`, créée depuis `main` / `origin/main` au commit `759f4ca`.

- `kit.html` : 10 remplacements exacts de « Kit Équipage » par « Crew Kit », dans le titre, les métadonnées, l'introduction, la case de consentement et la notice.
- `legal.html` : 2 remplacements exacts, uniquement dans les paragraphes Données personnelles / Personal data.
- Aucun autre texte, attribut, URL, identifiant, style ou comportement du formulaire n'a changé. L'URL reste `/kit.html` ; le h1 existant ne contenait pas l'ancien nom.

Vérifications : comparaison de chaque fichier entier au contenu de `759f4ca`, après la seule substitution autorisée ; recherche sans résultat de l'ancien nom dans les fichiers HTML ; `git diff --check`.

Une occurrence non visible demeure dans un commentaire historique de `assets/pages.css` ; les anciennes notes de transmission sont conservées. Aucun changement en dehors des deux pages et de cette note.

Les brouillons sont sauvegardés sur `kit-equipage-drafts` au commit `f0664ac` : 21 substitutions exactes dans les quatre fichiers concernés, sans changer leurs chemins. La branche du site et celle des brouillons ont été poussées sur GitHub. Rien n'est fusionné dans `main`.

## Brevo et X — état de l'exécution

- Liste existante #3 renommée « Liste d'attente - Crew Kit ». Le nouveau nom et le même identifiant ont été observés après enregistrement.
- Template existant #5 renommé « DOI - Crew Kit ». Objet : « Confirmez votre inscription à la liste d'attente du Crew Kit ». Les occurrences du nom dans le HTML ont été remplacées, sans changer les variables de confirmation et de désinscription ni les autres éléments. Expéditeur inchangé : CypherShip Labs <hello@cyphershiplabs.com>. Brevo a affiché « Template enregistré avec succès ! » avec le bon objet et le bon texte.
- Formulaire existant `6ac4f7afff39c60902b3d6b9` : nom remplacé, bouton Suivant utilisé. Après réouverture, son titre est bien « Liste d'attente - Crew Kit ». La section Listes montrait la liste renommée. **La sauvegarde finale « Terminé » et la vérification après réouverture de l'association au template #5 n'ont pas pu être faites : la connexion Chrome s'est interrompue à répétition, y compris après reconnexion et création d'un nouvel onglet. Cette partie de la mission est incomplète.** Ne pas lancer le test réel avant d'avoir terminé puis vérifié ces réglages.
- Bio X : seul « Kit Équipage » a été remplacé par « Crew Kit », puis Enregistrer utilisé. Le profil résultant affichait « Systems publisher & software studio. Crew Kit waitlist → » avec le lien du kit. Une nouvelle vérification après rechargement n'a pas été possible à cause de la même coupure Chrome.

## Suite nécessaire

Quand Chrome sera de nouveau accessible : terminer le formulaire sans changer ses autres réglages, puis le rouvrir et confirmer liste #3 et template #5 ; rouvrir également le template et le profil X. Ensuite seulement Noos-Claude pourra tester une inscription réelle. Aucun e-mail de test ni message à un tiers n'a été envoyé pendant cette mission. Le site attend la relecture et les autorisations avant publication.

## Mission 3 — avatar

Composition sauvegardée dans le dépôt `cyphership-character`, branche `x-avatar-composition-2026-10-06`, commit `35210f0`. Note : `social/CYPHERSHIP-X-AVATAR-MISSION-3-2026-10-06.md`. Symbole SVG officiel copié à l'identique, fond de bannière existant ; sortie 400 × 400 et aperçu 48 px. Marge circulaire mesurée : 16,4 %. Aucun avatar mis en ligne ; relecture de Thalie et validation de David restent à faire.
