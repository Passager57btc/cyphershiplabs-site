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

No independent Paris or Thalie review was invoked in this turn; no such GO is claimed. Publication requires the standing crew review and David’s final approval. Current change covers avatars and two planned-role cards, not the broader five-branch site rewrite.

Local preview: http://127.0.0.1:8766/#equipage (server detached with setsid, bound to loopback). The first foreground preview terminated during checking; server restarted and the final assets reverified in Chrome.
