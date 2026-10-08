# Official crew avatars — preview, 2026-10-08

Branch: `crew-avatars-2026-10-08`. Not published; main remains unchanged.

Replaced the eleven existing AI crew portraits with derivatives of the avatars explicitly adopted by David. Added Maia (Master Tuner) and Diomed (Shieldmaster), both described as planned roles, grounded in the adopted vision. David remains on his existing profile. Janus has no card on the current site.

Thirteen WebP assets at 660 × 660, quality 88, total 631,948 bytes. Full square framing is retained; no generative alteration. A separate asset directory avoids stale portrait cache paths. Original portrait assets and canonical avatar PNGs are retained. Source and export hashes: `review/crew-avatars-2026-10-08/assets.json`.

## Verification performed by Noos-GPT

- Repository fetched before changes; clean main matched origin/main.
- Every crew image reference resolves to a decodable local file and has alt text.
- Chrome desktop: all fourteen card images loaded after traversal, including Maia/Diomed; forward button and horizontal navigation observed working.
- Chrome 390 and 320 pixel viewports: readable square portrait cards, no page overflow (document widths 375 and 305 respectively; scrollbar accounts for 15 pixels).
- Screenshots saved in `review/crew-avatars-2026-10-08/`; viewport override reset afterward.
- `git diff --check` passes.

Initial preparation had no independent crew review. Paris was subsequently invoked explicitly by David and gave GO for commit `748505c`: hashes, decoding, framing, saved desktop/mobile screenshots, planned-role wording and public data exposure reviewed; no blockers. Paris did not replay interactive browser navigation. David validated the preview at 100% and authorized review followed by publication. No separate Thalie GO is claimed. Current change covers avatars and two planned-role cards, not the broader five-branch site rewrite.

Local preview: http://127.0.0.1:8766/#equipage (server detached with setsid, bound to loopback). The first foreground preview terminated during checking; server restarted and the final assets reverified in Chrome.

## Publication approval

David: « C’est parti pour la relecture et en avant. » Paris: GO, no blockers. Live verification follows the Pages build.
