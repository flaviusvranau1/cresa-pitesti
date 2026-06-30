# Creșă Pitești — landing page (site satelit)

Landing page cinematic, generic, optimizat SEO pentru căutarea **„creșă privată Pitești"**.
Static (HTML/CSS/JS), fără framework. Primul dintr-o rețea de site-uri satelit (urmează `gradinitapitesti.ro`).

---

## 1. Cum schimbi datele de contact (un singur loc)

Deschide **`js/config.js`** și completează:

| Câmp | Ce e |
|------|------|
| `phoneDisplay` | Telefonul așa cum apare pe ecran (ex. `0712 345 678`) |
| `phoneIntl` | Telefonul în format internațional, **doar cifre** pentru apel + WhatsApp (RO: `40` + numărul fără primul 0 → `40712345678`) |
| `email` | Adresa de email |
| `addressStreet/City/Region/Postal` | Adresa (apare la Contact + în SEO) |
| `hours` | Programul afișat |
| `whatsappMessage` | Mesajul precompletat la „Programează o vizită" |
| `facebook` / `instagram` | Linkuri sociale (gol = ascuns) |
| `mapsEmbed` | Link „embed" din Google Maps (gol = placeholder) |

> ⚠️ Aceleași date trebuie actualizate și în blocul **JSON-LD** din `<head>`-ul `index.html` (telefon, adresă, geo) — Google le citește pentru SEO local. Caută `"telephone"` și `"address"`.

### Telefonul (butoanele)
- **Programează-te** → deschide WhatsApp (`wa.me`) cu mesajul precompletat.
- **Contactează-ne / Sună acum** → apel direct (`tel:`).
Ambele iau numărul din `config.js`. Nu există formular.

---

## 2. Cum schimbi culorile (paleta)

Toate culorile sunt în **`css/styles.css`**, în blocul `:root` de sus. Schimbă 4–5 valori și tot site-ul se actualizează:

```css
--sky:   #2FA8CC;  /* culoarea dominantă (azur) */
--sun:   #FFC94D;  /* accent galben */
--coral: #FF8A6B;  /* accent corai */
--mint:  #7FCDA6;  /* accent mint */
--cream: #FBF7EF;  /* fundal cald */
```

---

## 3. Imagini & video

- **Hero** = clip cinematic în `assets/video/hero.mp4` (+ `assets/img/hero-poster.jpg`). Ca să-l schimbi, înlocuiește pur și simplu fișierele cu același nume.
- **Pozele reale** ale creșei: înlocuiește blocurile-placeholder (`.ph`, dreptunghiurile cu hașură albastră) cu `<img>` reale. Recomandat: format `.webp`, cu `loading="lazy"` și `alt` descriptiv (ex. `alt="creșă privată Pitești – sală de grupă"`).
- `assets/img/og-cover.jpg` = imaginea pentru share pe Facebook/WhatsApp (1200×630).

---

## 4. Deploy pe Cloudflare Pages + domeniu (recomandat)

**Tot pe contul tău personal** (`flaviusvranau@gmail.com` / GitHub `flaviusvranau1`), niciodată pe cont de firmă.

### a) Pune codul pe GitHub (repo privat)
Deja inițializat. Pentru push (dacă nu e făcut):
```bash
gh repo create cresa-pitesti --private --source=. --remote=origin --push
```

### b) Conectează Cloudflare Pages
1. Intră pe **dash.cloudflare.com** → *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
2. Autorizează GitHub-ul personal și alege repo-ul `cresa-pitesti`.
3. Build settings: **Framework preset = None**, *Build command* = gol, *Output directory* = `/` (rădăcina). E site static.
4. *Save and Deploy* → primești un domeniu `*.pages.dev` (poți testa acolo).

### c) Leagă domeniul `cresapitesti.ro`
1. Cumpără domeniul de la un registrar `.ro` (ex. ROTLD prin un reseller), **pe emailul tău personal**.
2. În Cloudflare Pages → proiect → *Custom domains* → *Set up a domain* → scrie `cresapitesti.ro`.
3. Cloudflare îți spune ce **DNS** să pui (de obicei muți domeniul pe nameserverele Cloudflare, sau adaugi un `CNAME`). Urmează exact instrucțiunile din ecran.
4. HTTPS se activează automat. Gata.

---

## 5. SEO — ce mai trebuie făcut (în afara codului)

Codul are deja: title/meta unice, JSON-LD (ChildCare/LocalBusiness/FAQ), Open Graph, sitemap, robots, performanță. În plus, pentru ranking local:

1. **Google Business Profile** (cel mai important): creează profilul creșei pe Google, cu adresă, telefon, program, **poze multe**. (Profil cu 100+ poze = mult mai multe clickuri.)
2. **NAP consecvent**: Numele, Adresa și Telefonul scrise **identic** peste tot (site, Google, Facebook, directoare).
3. **Citații / directoare**: Facebook, Bing Places, directoare locale de creșe/grădinițe din Argeș.
4. După publicare: adaugă site-ul în **Google Search Console** + trimite `sitemap.xml`.

---

## 6. Checklist pentru clonarea pe `gradinitapitesti.ro`

Site-ul e modular. Pentru varianta „grădiniță":
1. Copiază folderul.
2. În `index.html`: schimbă `<title>`, `meta description`, `H1` și textele cu focus pe **„grădiniță privată Pitești"** (vârste 3–6 ani, pregătire pentru școală).
3. Schimbă `canonical`, `og:url`, `sitemap.xml`, `robots.txt` cu `gradinitapitesti.ro`.
4. (Opțional) hero video diferit.
5. Deploy nou pe Cloudflare Pages + domeniul nou.

---

## 7. Rulare locală

```bash
python -m http.server 5050
# deschide http://localhost:5050
```
