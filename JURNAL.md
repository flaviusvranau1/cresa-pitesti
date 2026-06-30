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

---

## 2026-06-30 — Build v1 complet

**Făcut:**
- [x] `index.html` + `css/styles.css` + `js/main.js` + `js/config.js`.
- [x] Copy reformulat (generic, fără Akademy): hero, despre (grupe 6-12 luni/1-2/2-3), metodă Montessori (6 carduri), alimentație & siguranță, program (timeline 07:30–18:00), FAQ, contact.
- [x] Hero cinematic Higgsfield (Veo 3.1, interior creșă, fără fețe) → optimizat ffmpeg la **589K** + poster 54K + og-cover 40K.
- [x] SEO complet: title/meta, JSON-LD ChildCare/LocalBusiness + FAQPage, Open Graph/Twitter, `sitemap.xml`, `robots.txt`, canonical, `lang=ro`.
- [x] Butoane: Programează-te → WhatsApp (mesaj precompletat), Contactează-ne → `tel:`. Fără formular. FAB-uri flotante WhatsApp+telefon.
- [x] Paletă editabilă din `:root`; navbar sticky transparent→solid; meniu mobil; reveal pe scroll; `prefers-reduced-motion`.
- [x] **Verificat în preview:** desktop (hero 100vh după fix `svh`→`vh` fallback, grid 3 coloane, meniu cu linkuri) + mobil 375 (stivuit, zero overflow orizontal). Video readyState 4 (rulează). Zero erori consolă. Butoane wired corect (`tel:+40712345678`, `wa.me/...?text=...`).
- [x] `git init` + commit (atribuit `flaviusvranau1`) + **repo privat** creat și push: https://github.com/flaviusvranau1/cresa-pitesti
- [x] `README.md` cu: editare contact/culori/poze, deploy Cloudflare Pages + domeniu, GBP/NAP, checklist clonare `gradinitapitesti.ro`.

**Note / decizii build:**
- Imaginile din docx = capturi de ecran (cu logo/text), neutilizabile → design photo-light cu placeholdere elegante (`.ph`) până vin pozele reale ale clientului.
- Toate datele de contact = placeholdere în `config.js` (de înlocuit cu cele reale ale clientului) + de sincronizat în blocul JSON-LD din `index.html`.

**Urmează (cu Flavius):**
- [ ] Primit datele reale de contact (telefon/adresă/email/WhatsApp) → completat `config.js` + JSON-LD.
- [ ] Primit pozele reale → înlocuit placeholderele.
- [ ] Deploy Cloudflare Pages + cumpărat/legat `cresapitesti.ro` (pași în README).
- [ ] Feedback paletă (pot da 2–3 variante).
- [ ] Eventual clonare pe `gradinitapitesti.ro`.
