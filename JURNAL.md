# JURNAL de proiect — Creșă Pitești (site satelit)

Fișier de progres. Îl actualizez la fiecare etapă: ce am făcut, decizii, unde am ajuns, ce urmează.

---

## 2026-06-30 — Inițializare

**Context:** site satelit `cresapitesti.ro` — landing page generic „creșă privată Pitești", reformulat din materialul Akademy Babygarten (fără brandul lor), care trimite la contactul clientului. Primul dintr-o rețea de satelite (urmează `gradinitapitesti.ro`).

**Decizii confirmate cu Flavius:**
- Identitate generică „Creșă Privată Pitești", fără Akademy; contact = placeholdere (în `js/config.js`).
- O singură pagină modulară (SEO bun pe un termen-cap; rețeaua de domenii acoperă restul).
- Paletă veselă (azur + crem + accente galben/corai/mint), ușor de schimbat din `:root`.
- Media: doar foto reale curatate (vin de la client) + **hero = clip cinematic Higgsfield**. Fără imagini AI de umplutură. Până vin pozele → placeholdere elegante.
- Fără formular. Două butoane: **Programează-te** → WhatsApp cu mesaj precompletat; **Contactează-ne** → `tel:`.
- Găzduire: **Cloudflare Pages + repo privat**, pe contul personal `flaviusvranau1` (`flaviusvranau@gmail.com`), NU Fargrup.

**Făcut:**
- [x] Structură foldere `cresa-pitesti/`.
- [x] Verificat `gh` autentificat pe `flaviusvranau1` (personal). Git 2.53.
- [x] Curatat documentele: imaginile din docx sunt aproape toate capturi de ecran ale site-ului Akademy (cu logo/text) — **nu** poze curate. Concluzie: design photo-light cu placeholdere până vin pozele reale.
- [x] Lansat generarea hero-ului cinematic prin Higgsfield (model Veo 3.1 Lite, 16:9, 6s, mut, calitate high). Job `581cfe9e-b962-4704-8010-cfd0bcf0c0c3`.

**Urmează:**
- [ ] Construit `index.html` + `styles.css` + `main.js` + `config.js`.
- [ ] SEO complet (meta, JSON-LD, OG, sitemap, robots).
- [ ] Integrat clipul hero + poster.
- [ ] Verificare responsive (375/768/1440) + butoane + screenshot-uri.
- [ ] `git init`, commit, repo privat, push.
- [ ] README cu deploy Cloudflare + GBP + checklist clonare `gradinitapitesti.ro`.
