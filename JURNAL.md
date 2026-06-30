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
- [ ] Primit pozele reale → înlocuit imaginile cinematice provizorii.
- [ ] Deploy Cloudflare Pages + cumpărat/legat `cresapitesti.ro` (pași în README).
- [ ] Feedback paletă (pot da 2–3 variante).
- [ ] Eventual clonare pe `gradinitapitesti.ro`.

---

## 2026-06-30 — Build v2 (feedback Flavius: subtil + „fură ochiul" + poze)

**Feedback primit:** hero prea mare/evident (mai subtil), să adaug un al doilea clip care „se derulează la scroll", elemente care fură ochiul, și să folosesc poze + să îmbogățesc programul cu activități extra.

**Făcut:**
- [x] **Hero rafinat**: titlu mai mic (clamp 1.85–3.15rem), weight 500, linia 2 italic elegant în loc de galben strident; lead mai scurt. Mult mai subtil.
- [x] **Al doilea clip Higgsfield** (Veo 3.1, 8s, cameră de creație cu cuburi colorate/plante/lumină) → optimizat pentru **scroll-scrub** (keyframe-uri dese), 1.5M + poster.
- [x] **Showcase scroll-scrub**: secțiune pinned (sticky) unde clipul se derulează cadru-cu-cadru la scroll. Robust: redă în buclă implicit (mereu cinematic) și preia scrub doar unde host-ul suportă seek (range requests). Verificat: scrub proporțional funcțional.
- [x] **Elemente „fură ochiul"**: bandă stats cu **count-up** (100% / 12+ / 6luni–6ani / 1:5), **marquee** animat cu activitățile, **parallax + fade** subtil pe hero la scroll, hover-zoom pe imagini.
- [x] **Secțiune Activități opționale** (înot, robotică, engleză, Micii Picasso, gimnastică, logopedie + marquee complet).
- [x] **Poze reale folosite**: documentele aveau doar capturi de ecran + **stock-uri din tema ChildIT (themeforest)** — nesigure de folosit (licență + fețe + watermark). Soluție: am extras **cadre cinematice din clipurile Higgsfield** (licențiate, fără fețe) și le-am pus ca imagini reale în „Despre" și „Alimentație & Siguranță". Se vor înlocui ușor cu pozele reale ale clientului.
- [x] Meniu actualizat (+ Activități). Verificat desktop+mobil: fără overflow, fără erori consolă.

**Note:** credite Higgsfield rămase ~28 (2 clipuri generate). Decizie de discutat cu Flavius: pozele reale ale creșei (înot/natură/activități) trebuie trimise ca **fișiere**, nu din docx (acelea sunt screenshot-uri/stock).

---

## 2026-06-30 — Build v3 (poze reale + galerie + live)

**Feedback Flavius:** a trimis **154 poze reale** (3 foldere WhatsApp). Cerințe: înlocuiește nr. de telefon cu „Contactează-ne"; folosește pozele (top ~15, alegerea mea) într-un **slider frumos**, cu înot + activități în aer liber/pădure + educație, accent pe **fericire**; apoi **dă-l live** să-l vadă pe telefon.

**Făcut:**
- [x] Indexat toate cele 154 poze (planșe de contact) și **curatat 16** cele mai vesele, pe teme: înot (#10,19), natură/pădure (#61,63,65), creație (#105,143,151), joacă/baloane (#27,40,46), mâncare sănătoasă (#69,79), zâmbete (#107,128,133).
- [x] Optimizat pentru web (max 1280px, ~120–270KB fiecare, lazy-load) → `assets/img/gallery/`.
- [x] **Galerie slider** nouă (#galerie): scroll-snap, autoplay, săgeți, puncte, swipe pe mobil, etichete pe teme. + link „Galerie" în meniu.
- [x] Înlocuit imaginile cinematice provizorii din „Despre" și „Alimentație" cu **poze reale** (copil fericit / mâncare sănătoasă).
- [x] Nr. telefon afișat → **„Contactează-ne"** (rămâne `tel:`), în navbar, footer, contact, CTA.
- [x] Verificat desktop+mobil: 16 slides/puncte, fără overflow, fără erori consolă, etichete corecte.
- [x] `.nojekyll` + deploy **GitHub Pages** (link live pentru telefon). Repo făcut public temporar pentru Pages; mutăm pe Cloudflare privat ulterior.

**Note:** total assets ~5.3M (2 clipuri 2.1M + galerie 2.8M), dar lazy-load → încărcare inițială ușoară. Pozele reale au fețe de copii (oferite de client pt. marketing).

---

## 2026-06-30 — Build v4 (galerie cu filtre + performanță + live public)

**Feedback Flavius:** flow galerie mai lejer; **filtre pe categorii** (la click se filtrează); mai multe poze dar **fără să îngreuneze** (încărcare doar când trebuie); fix la secțiunea CTA (nu era centrată); și **pune-l live pe GitHub public** ca să-l vadă clientul.

**Făcut:**
- [x] **Galerie cu filtre**: 6 categorii (Toate/Înot/În aer liber/Ateliere creative/Joacă & socializare/Mese sănătoase). Click pe etichetă → se afișează doar pozele din categorie (verificat: 2/5/6/9/4/26).
- [x] **26 poze** curatate pe categorii (de la 16), recomprimate (max 1100px, q76, ~135KB medie), `loading="lazy" decoding="async"` → se încarcă doar când intră în viewport.
- [x] **Flow mai lejer**: scroll-snap `proximity` (nu `mandatory`), autoplay mai lent (4.6s), eliminat punctele (26 ar fi fost prea multe), rămân săgeți + swipe.
- [x] **Video showcase lazy**: `preload="none"` + start la apropiere (IntersectionObserver, rootMargin 500px) → **economie ~1.5MB** la încărcarea inițială.
- [x] **CTA „Primul pas..."** centrat (era aliniat stânga) — coloană centrată, butoane pe mijloc.
- [x] Verificat desktop+mobil: fără overflow, fără erori, filtre OK, lazy OK.
- [x] Live pe **GitHub Pages** (repo public, autorizat de Flavius pentru a-l arăta clientului; mutăm pe Cloudflare privat când e gata).

---

## 2026-06-30 — Fix v5: clipul din mijloc sacadat pe telefon

**Problema:** showcase-ul folosea scroll-scrub (currentTime legat de scroll). Pe live (host cu range requests) devenea seekable → pe **telefon** scrub-ul era extrem de sacadat (mobilul nu poate face seek cadru-cu-cadru fluid). Flavius a cerut să arate bine pe telefon, fără să cheltuim credite. (Referința lui = propriul site FERRUM, unde îi place efectul de scroll-scrub, dar în temă închisă.)

**Fix (fără credite, fără regenerare):**
- [x] Detectare touch (`pointer: coarse` / `maxTouchPoints` / `ontouchstart`) → pe **mobil/tabletă** clipul **rulează lin în buclă** (playback normal = mereu fluid), **fără scrub**.
- [x] Pe **desktop** rămâne **scroll-scrub-ul** (efectul „smecher" pe care îl place), cu prag anti-micro-seek (>0.04s).
- [x] Secțiune pinned mai scurtă pe mobil (130vh) pentru un moment cinematic snappy.
- [x] Clipul rămâne lazy (se încarcă doar la apropiere) — pe mobil se redă progresiv, nu necesită seek.

Notă: în preview nu se poate emula touch (isCoarse=false), deci se vede calea desktop; calea mobil se confirmă pe telefon real (maxTouchPoints>0).

---

## 2026-06-30 — Fix v6: scroll-scrub adevărat, fluid pe mobil (secvență de cadre pe canvas)

**Cerința lui Flavius:** vrea efectul „se derulează la scroll ca un clip" **și pe telefon**, nu doar buclă. Idee bună de la el: împărțit clipul în cadre mici.

**Soluție (tehnica Apple-style):**
- [x] Extras **48 cadre** din clip (ffmpeg, 854px, WebP q62) → `assets/img/seq/` = **doar 884KB total** (16KB/cadru), mai ușor decât clipul video!
- [x] Înlocuit `<video>` cu `<canvas>`; un scrubber JS desenează cadrul potrivit în funcție de progresul scroll-ului prin secțiunea pinned. **Fluid pe mobil** pentru că doar schimbă imagini deja decodate (fără „seek" în video = fără sacadare).
- [x] Netezire cu **lerp** (curr += (target-curr)*0.18) → derulare catifelată; `requestAnimationFrame` doar cât secțiunea e în view; lazy-load cadre (IntersectionObserver, rootMargin 600px); poster ca fundal până se încarcă; `cover` calculat în draw; resize handler; respectă `prefers-reduced-motion`.
- [x] Eliminat `showcase.mp4` (1.5M) din repo — nu mai e folosit. Eliminat logica isCoarse/scrub video.
- [x] Verificat desktop+mobil în preview: canvas desenează, cadrele se schimbă proporțional cu scroll-ul, fără erori, fără overflow.

Rezultat: același efect „smecher" de scroll-scrub ca pe FERRUM, dar **fluid pe telefon** și mai ușor.

---

## 2026-06-30 — Build v7: date reale, recenzii, hartă

**Făcut:**
- [x] **Date reale de contact** (de pe akademybabygarten.ro): tel 0737 035 999, WhatsApp, email, adresă Bd. Republicii 88 Pitești, program. În `config.js` + JSON-LD. Facebook /CresaPitesti în footer (Instagram ascuns — brand Akademy).
- [x] **Secțiune Recenzii** „Părinții din Pitești ne recomandă": statistici **reale verificate** (5/5, 425+ recenzii Google, 100% recomandări, TOP 100 of Romania) + buton spre recenziile reale. **NU am fabricat testimoniale** — textul verbatim al recenziilor Google nu e extractibil (consent wall + JS), iar site-ul lor are doar recenziile demo fake din tema ChildIT. De cerut lui Flavius 3-4 recenzii reale (text/screenshot) ca să adaug carduri cu citate.
- [x] **Hartă mutată jos** într-o bandă full-width (`.mapband`) + card „Vino în vizită" cu adresă și buton „Deschide harta" (Google Maps). Embed = **OpenStreetMap** (din coordonate) — fără cheie API, fără ecran de consimțământ EU (Google `output=embed` risca consent wall în RO).
- [x] Verificat mobil: recenzii 2×2, hartă OSM se randează, card static full-width, fără overflow/erori.

---

## 2026-06-30 — v8: doar CREȘĂ (până la 3 ani) + chips-uri clickabile

**Feedback Flavius:** site-ul e doar creșă → vârsta e până la 3 ani (nu 6); chips-urile din hero par butoane dar nu duc nicăieri.

**Făcut:**
- [x] Schimbat **peste tot „6 ani" → „3 ani"** (meta, OG, Twitter, JSON-LD, FAQ, hero eyebrow/lead/chip, stat, footer, manifest).
- [x] Scos „& grădiniță" din eyebrow/footer/JSON-LD (rămâne doar ca „tranziție firească spre grădiniță" — pt. gradinitapitesti.ro).
- [x] Activități adaptate creșei: scos Robotică/Clubul Astronauților/Laboratorul lui Dexter/ABC-ul Preșcolarului din marquee; cardul „Robotică" → „Muzică & ritm". Păstrat înot, gimnastică, dans, engleză, pictură senzorială, salinoterapie, muzică, joc senzorial, logopedie.
- [x] **Chips-urile din hero acum sunt link-uri** către secțiuni (#despre / #alimentatie) — verificat că ancora scrollează corect. Au și hover.
- [x] Verificat: fără 6 ani/robotică/preșcolar rămase, fără erori, navigare ancore OK.

---

## 2026-06-30 — v9: audit + upgrade SEO de înaltă calitate

**Audit:** baza era solidă (title/meta/canonical/OG/sitemap/robots/JSON-LD/1×H1/alt-uri/lazy). Gaps: schema incompletă, H2-uri fără cuvinte-cheie, lipsă context local în text, lipsă meta geo, FAQ schema 5≠6.

**Făcut:**
- [x] **Schema îmbogățită**: `["ChildCare","LocalBusiness"]` + `@id`, `alternateName`, `sameAs` (Facebook+Instagram), `hasMap`, `logo`, `image` (3), `areaServed` (Pitești+Argeș), `currenciesAccepted`, `slogan`. FAQ sincronizat la 6 întrebări.
- [x] **Meta geo** (RO-AG, position, ICBM, placename) + `og:image:alt`/`twitter:image:alt` + `keywords` + aliniat `og:title`.
- [x] **H2-uri cu cuvinte-cheie**: Metoda educațională / Alimentație sănătoasă și siguranță / Program zilnic la creșă / Contact – Creșă privată în Pitești.
- [x] **Context local în text**: „în zona centrală (Bulevardul Republicii)" la Despre + „Ne găsești în centrul Piteștiului" la Contact.
- [x] Densitate naturală verificată: Pitești 20×, creșă 14×, creșă privată 9×, program 17× (fără stuffing). title 57c afișat, meta desc 159c.
- [x] Revalidat: JSON-LD valid în browser, 1 H1/11 H2, fără overflow, fără erori.

**Notă SEO (de comunicat):** stelele ★ în Google la afaceri locale vin din **Google Business Profile**, nu din schema on-page — deci NU am pus `aggregateRating` fals. Pentru ranking real mai trebuie (off-page, în README): GBP optimizat, NAP consecvent, citații/directoare, Search Console + sitemap submit, backlink-uri locale. Site-ul (on-page) e acum la nivel înalt.
