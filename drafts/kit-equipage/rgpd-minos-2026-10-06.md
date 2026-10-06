# Waitlist GDPR texts — Minos, 2026-10-06 (working proposals, not legal advice)

## Fixes to apply to page-copy.md first
1. A single purpose: **an email at the kit's release + a message if the date changes**. Remove « et, si vous le souhaitez, des nouvelles liées à ce kit » (no separate consent box exists). Text under the button: « Vous recevrez d'abord un email de confirmation : cliquez pour valider votre inscription (double opt-in). Ensuite, un email à la sortie du kit, et un message si la date change. Désinscription en un clic, à tout moment. Pas de spam, pas de revente de votre adresse. »
2. Replace the draft's GDPR notice with the text (b) below (controller, retention, transfers, rights, hello@, link).
3. Remove the line « Représentant dans l'UE » (internal note only).
4. FAQ, add: « Que faites-vous de mon adresse email ? » → « Elle sert uniquement à vous prévenir de la sortie du kit. Elle est traitée par Brevo (hébergement UE), jamais vendue, et vous pouvez vous désinscrire à tout moment. Détails : politique de confidentialité. »

## (a) Consent box (unticked, required)
J'accepte de recevoir par e-mail de CypherShip Labs LLC une information sur la sortie du Kit Équipage (disponibilité, date, prix). Je peux retirer mon consentement à tout moment.

## (b) Notice under the form
**Vos données.** Responsable du traitement : CypherShip Labs LLC (société du Nouveau-Mexique, États-Unis), 1209 Mountain Road Place NE, Albuquerque, NM 87110, USA. Finalité : vous prévenir de la sortie du Kit Équipage (et d'un éventuel changement de date). Base légale : votre consentement (art. 6.1.a du RGPD), confirmé en deux temps. Données : votre adresse e-mail, plus la date, l'heure et l'adresse IP de votre confirmation (preuve du consentement). Nous ne les vendons ni ne les louons. Elles sont traitées pour notre compte par Brevo (Sendinblue SAS, Paris), hébergées dans l'Union européenne ; ses sous-traitants peuvent, le cas échéant, traiter des données hors UE, dans le cadre du Data Privacy Framework ou de clauses contractuelles types. Conservation : jusqu'à votre désinscription, et au plus tard 12 mois après la sortie du kit ; si le projet est abandonné, la liste est supprimée. Vos droits : accès, rectification, effacement, limitation, opposition, retrait du consentement, en écrivant à hello@cyphershiplabs.com ; chaque e-mail contient un lien de désinscription. Vous pouvez aussi saisir la CNIL (cnil.fr). [Politique de confidentialité](/legal.html#donnees-personnelles)

## (c) Double opt-in email
Subject: « Confirmez votre inscription à la liste d'attente du Kit Équipage »
Vous avez demandé à rejoindre la liste d'attente du Kit Équipage. Pour confirmer que cette adresse est bien la vôtre, cliquez sur le bouton ci-dessous : sans confirmation, nous ne vous écrirons pas. Si ce n'est pas vous, ignorez simplement ce message. Vous recevrez un email à la sortie du kit et pourrez vous désinscrire à tout moment.

## legal.html (to publish BEFORE the Kit page)
- Add `id="donnees-personnelles"` to the « Personal data » row, and replace its text with:
  **Données personnelles / Personal data.** Les adresses e-mail que vous nous écrivez servent uniquement à répondre à votre message. Liste d'attente du Kit Équipage : responsable du traitement CypherShip Labs LLC ; finalité : vous prévenir de la sortie du kit (et d'un éventuel changement de date) ; base légale : consentement, confirmé par double opt-in ; données : adresse e-mail, date, heure et IP de confirmation ; prestataire : Brevo (Sendinblue SAS, Paris), hébergement UE, sous-traitants éventuels hors UE sous DPF ou clauses contractuelles types ; aucune vente ni location ; statistiques d'ouverture et de clic anonymisées ; conservation jusqu'à désinscription, au plus tard 12 mois après la sortie du kit ; droits d'accès, rectification, effacement, limitation, opposition et retrait du consentement via hello@cyphershiplabs.com, avec un lien de désinscription dans chaque e-mail ; réclamation possible auprès de la CNIL (cnil.fr).
  *EN:* Kit Équipage waitlist: your email address is used only to tell you when the kit is released (and if the date changes), on the basis of your consent (double opt-in). It is processed on our behalf by Brevo (EU-hosted; possible sub-processors outside the EU under the EU-US Data Privacy Framework or standard contractual clauses). We never sell it. Kept until you unsubscribe, and at most 12 months after release. Requests: hello@cyphershiplabs.com. You may complain to your data protection authority (in France, the CNIL).
- Site contact → hello@cyphershiplabs.com; « Last updated: October 2026 »; review the « Cookies » line (no Brevo script, no reCAPTCHA: a home-made HTML form posting to Brevo).

## Checklist before publishing
Box not pre-ticked, email field only, double opt-in active; legal.html online first; no third-party script or reCAPTCHA; a test send (unsubscribe + postal address in the footer); proof of consent on the test contact; read Brevo's DPA appendix (DPF/SCC); consistent texts; procedure for rights requests (reply < 1 month, logged); dated internal note (purpose, basis, retention, processor, art. 27).
