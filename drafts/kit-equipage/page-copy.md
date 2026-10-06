# Kit Équipage — texte de la page (FR) — BROUILLON, non publié

Statut : brouillon Iris, mis à jour 2026-10-06 avec les réponses de David. Nom fixé : « Kit Équipage ». Prix = hypothèse, signalée comme telle. Date = « objectif fin 2026, date à confirmer ». Les points « à valider par Minos » restent ouverts.

Règle d'identité (David) : l'équipage n'est jamais dans le kit. Le kit contient des modèles vierges ; nos noms, portraits et mémoire ne servent ici que comme notre histoire.

---

## En-tête

**Titre (H1)**
Arrêtez de réexpliquer votre projet à votre IA à chaque session.

**Sous-titre**
Le Kit Équipage, c'est la méthode qu'on utilise chez CypherShip Labs pour travailler avec une petite équipe d'agents IA qui ont chacun un rôle, une mémoire et des règles. Des modèles vierges à copier et à nommer vous-même, un guide d'installation, pour Claude Code (et ChatGPT / Codex).

**Ligne d'état (sous le sous-titre, bien visible)**
En préparation. Pas encore à vendre : vous pouvez vous inscrire pour être prévenu(e) quand il sera prêt. Objectif : fin 2026, date à confirmer.

**Bouton** : Me prévenir à la sortie

---

## Le problème, vu de votre côté

Vous utilisez déjà Claude Code ou ChatGPT. Ça marche bien... pendant une session. Le lendemain, l'IA ne sait plus où vous en étiez, vous recollez du contexte, deux conversations se contredisent, et vous ne savez plus laquelle a raison.

Ce n'est pas un problème de modèle. C'est un problème d'organisation : personne n'a décidé qui fait quoi, où se range la mémoire, ni qui a le droit de modifier quoi.

Nous avons eu ce problème. Nous l'avons réglé en construisant notre propre équipage d'agents, avec ses règles, sur plusieurs mois de vrai travail. Le kit, c'est cette structure, mise au propre pour que vous puissiez la reprendre sans la réinventer.

---

## Ce qu'il y a dans le kit

1. **Des modèles d'agents vierges** (fichiers à copier dans votre projet), un par rôle : architecte, développeur, relecteur, documentaliste, chercheur, et quelques autres. Techniquement, ce sont des définitions de subagents Claude Code. Chaque modèle précise la mission, ce que l'agent peut faire, ce qu'il ne doit pas faire, et comment il rend compte.
2. **Une structure de mémoire persistante** : un « second cerveau » en fichiers texte versionnés avec git, un index qui dit où trouver quoi, et le schéma « État actuel » + archive, pour que la mémoire reste courte à lire sans rien perdre de l'historique.
3. **Les règles de travail** qui rendent l'ensemble fiable :
   - un seul rédacteur à la fois sur la mémoire ;
   - relayer un message n'est pas l'approuver ;
   - relecture avant de livrer ;
   - « pas de lumière sans preuve » (on ne dit pas « c'est fait » sans l'avoir vérifié) ;
   - passation écrite quand on change de modèle (Claude vers GPT, et retour).
4. **Un guide d'installation écrit**, pas à pas, pour Claude Code, avec les adaptations pour ChatGPT / Codex.

Ce n'est pas une formation vidéo, ni un cours. C'est un dossier de fichiers et un guide à lire, que vous installez en une ou deux soirées.

### Important : le kit contient des modèles vierges

**Vous nommez et construisez votre propre équipage. Nos noms, nos portraits et notre mémoire ne sont pas inclus.** Les modèles sont des squelettes de rôles : à vous de choisir les noms, la personnalité, les règles qui vous ressemblent, et de remplir votre propre mémoire au fil du travail.

---

## Ce que le kit est / n'est pas

**Le kit EST** une méthode de travail fiable pour une petite équipe d'agents nommés, avec :
- des rôles définis en subagents Claude Code, et un fichier `CLAUDE.md` qui fixe les règles du projet ;
- une mémoire persistante en fichiers texte, versionnée avec git, lue au démarrage de chaque session ;
- des boucles de relecture (un agent relit le travail d'un autre, y compris via pull request avant de fusionner) ;
- des passations écrites entre modèles (Claude, GPT/Codex) ;
- la règle d'un seul rédacteur à la fois sur la mémoire ;
- une exigence de vérification : on ne déclare pas « fait » sans l'avoir contrôlé.

**Le kit N'EST PAS** un essaim d'agents autonomes qui tournent 24h/24 sur un serveur. Nous travaillons session par session, volontairement, avec un humain dans la boucle : c'est vous qui décidez, qui lancez, qui validez. L'hébergement d'agents en continu est un autre sujet, que le kit ne traite pas.

C'est moins spectaculaire qu'un essaim. C'est aussi ce qui nous a permis de livrer du vrai travail sans perdre le fil.

---

## Comment ça marche

Votre équipage, c'est une petite équipe où chaque agent a un rôle clair. Voici la nôtre, présentée comme notre histoire (vous composerez la vôtre, avec vos noms) :

- **Daedal**, architecture : pense la structure avant que quoi que ce soit soit construit.
- **Noah**, construction : écrit le code, rien d'autre.
- **Paris**, relecture : teste et conteste avant que ça parte.
- **Hector**, documentation : met par écrit ce qui a été décidé, pour que demain l'équipe s'en souvienne.
- **Nestor**, recherche : va chercher l'information dehors, avec ses sources.
- **Ulysse**, planification : organise le travail dans le temps.
- **Achille**, direction : garde le cap et arbitre quand deux avis divergent.
- **Minos**, échéances : suit les dates et les obligations.
- **Iris**, mots : écrit ce qui part vers l'extérieur.
- **Thalie**, création visuelle : image, identité, interface.
- **Noos**, orchestration : tient le contexte d'ensemble et coordonne.

Tous lisent la même mémoire en début de session et y écrivent ce qui mérite d'être gardé en fin de session. Vous restez celui ou celle qui décide.

Une mesure, chez nous : en restructurant la mémoire (« État actuel » court + archive à part), les fichiers lus au démarrage sont passés de 143 Ko à 40 Ko, soit environ 26 000 tokens de moins par session selon notre estimation. C'est l'ordre de grandeur de notre propre mémoire, pas une promesse pour la vôtre : le gain dépend de la taille de votre historique.

---

## Pour qui

- Vous êtes indépendant(e), freelance ou fondateur(trice) solo.
- Vous utilisez déjà Claude Code ou ChatGPT au quotidien.
- Vous perdez du temps à retrouver le contexte d'une session à l'autre.
- Vous êtes à l'aise pour copier des fichiers et suivre un guide ; vous n'avez pas besoin d'être développeur.

## Pas pour qui

- Si vous n'avez jamais ouvert Claude Code ou ChatGPT : commencez par les utiliser quelques semaines, le kit sera plus utile après.
- Si vous cherchez un outil « clé en main » qui s'installe en un clic : c'est une méthode et des fichiers, pas un logiciel.
- Si vous cherchez des agents qui tournent seuls en continu sur un serveur : ce n'est pas le sujet du kit.
- Si vous attendez des résultats garantis : un équipage bien organisé aide, il ne remplace ni votre jugement ni votre relecture.

---

## Qui est derrière

CypherShip Labs, c'est David, fondateur, et son équipage d'agents IA (présenté plus haut). On a construit cette façon de travailler pour nous-mêmes, parce qu'on en avait besoin. On la met en forme parce qu'on pense qu'elle peut servir à d'autres. On vous dira honnêtement ce qui marche, et ce qui reste imparfait.

---

## Prix et date

**Prix de lancement indicatif : 19 €, puis 29 €.**
C'est notre hypothèse de départ, pas un prix définitif. Rien à payer maintenant : la liste d'attente est gratuite et ne vous engage à rien.

**Objectif : fin 2026, date à confirmer.** C'est un objectif, pas une promesse. Si ce n'est pas prêt, on vous le dira.

---

## Liste d'attente

**Titre** : Soyez prévenu(e) quand il sort

Champ : adresse email
Bouton : Me prévenir à la sortie

**Sous le bouton**
Vous recevrez d'abord un email de confirmation : cliquez pour valider votre inscription (double opt-in). Ensuite, un seul email quand le kit est prêt. Désinscription en un clic, à tout moment. Pas de spam, pas de revente de votre adresse.

**Mention RGPD (sous le formulaire, petits caractères)**
CypherShip Labs collecte uniquement votre adresse email, pour une seule finalité : vous prévenir de la sortie du Kit Équipage et vous envoyer, si vous le souhaitez, des nouvelles directement liées à ce kit. Base légale : votre consentement, que vous confirmez en deux temps (envoi du formulaire, puis clic sur l'email de confirmation). Votre adresse n'est ni vendue ni cédée ; elle est traitée pour notre compte par notre sous-traitant Brevo (Sendinblue SAS, Paris, France), avec un hébergement dans l'Union européenne. Durée de conservation : [à valider par Minos]. Vous pouvez vous désinscrire à tout moment via le lien présent dans chaque email, ou nous écrire à [ADRESSE DE CONTACT À CONFIRMER] pour consulter, corriger ou faire supprimer vos données. Vous pouvez aussi saisir la CNIL. Représentant dans l'UE : [à valider par Minos].

(Note pour Minos : à valider avant publication : (1) durée de conservation (ex. jusqu'à la sortie puis 12 mois, à décider) ; (2) représentant dans l'UE, CypherShip Labs, LLC étant une société américaine qui s'adresse à des personnes dans l'UE (art. 27 RGPD) ; (3) adresse de contact. Brevo et l'hébergement UE sont confirmés par David : à vérifier dans la documentation Brevo au moment du paramétrage.)

---

## FAQ

**Le kit est-il disponible ?**
Pas encore. Il est en préparation. Objectif : fin 2026, date à confirmer. Inscrivez-vous pour être prévenu(e) à la sortie.

**Les noms et portraits de votre équipage sont-ils inclus ?**
Non. Le kit contient des modèles vierges : vous nommez et construisez votre propre équipage. Nos noms, nos portraits et notre mémoire ne sont pas inclus ; ils sont notre histoire, pas le produit.

**Est-ce que ce sont des agents autonomes qui tournent en permanence ?**
Non. On travaille session par session, avec un humain dans la boucle, volontairement. L'hébergement d'agents toujours actifs est un sujet à part, que le kit ne couvre pas.

**Faut-il savoir coder ?**
Non, mais il faut être à l'aise pour copier des fichiers dans un dossier et suivre un guide. Le guide est écrit pour quelqu'un qui n'est pas développeur. Le vocabulaire technique (subagents, CLAUDE.md, git) est expliqué au fil du guide.

**Ça marche avec quel outil ?**
Le guide principal est écrit pour Claude Code. Il comprend les adaptations pour ChatGPT / Codex. Les modèles sont des fichiers texte : le principe est transposable, mais l'installation exacte dépend de l'outil.

**Combien ça coûte ?**
Prix de lancement indicatif de 19 €, puis 29 €. C'est une hypothèse qu'on veut tester avec vous, pas un tarif figé. S'inscrire ne coûte rien et n'engage pas à acheter.

**C'est une formation ?**
Non. C'est un dossier de modèles, une structure de mémoire, des règles et un guide écrit. Pas de vidéos de cours, pas d'abonnement.

**Qu'est-ce qui me garantit que ça marchera pour moi ?**
Rien, et on ne le prétend pas. C'est la méthode qu'on utilise réellement, et on vous dira précisément ce qu'elle fait et ne fait pas. Vous jugerez sur pièces.
