# Livegang Checklist — cyriljansen.nl

## 1. GitHub Repository

### 1.1 Repo aanmaken (als dat nog niet is gedaan)
1. Ga naar [github.com/new](https://github.com/new)
2. Naam: `cj` (of wat je wilt)
3. Private repo is prima
4. Push je lokale code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/JOUW-USERNAME/cj.git
   git push -u origin main
   ```

### 1.2 GitHub Personal Access Token aanmaken
Dit token is nodig zodat de admin-pagina projecten kan publiceren.

1. Ga naar **github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Klik **"Generate new token"**
3. Instellingen:
   - **Token name:** `CJ Admin`
   - **Expiration:** 90 dagen (of langer)
   - **Repository access:** Only select repositories → kies `cj`
   - **Permissions → Repository permissions → Contents:** `Read and write`
4. Klik **Generate token**
5. **Kopieer het token** (begint met `github_pat_...`) — je ziet het maar 1x!

---

## 2. Environment Variables instellen

### 2.1 Lokaal (.env bestand)
Open `.env` in de root van het project en zorg dat deze regels erin staan:

```env
# EmailJS
VITE_EMAILJS_SERVICE_ID=service_iusuumq
VITE_EMAILJS_TEMPLATE_ID=template_nce93oa
VITE_EMAILJS_PUBLIC_KEY=e926DkSU2uwYyEYHQ

# Admin wachtwoord (dit geef je aan Cyril)
VITE_ADMIN_PASSWORD=kies_een_sterk_wachtwoord

# GitHub API
VITE_GITHUB_OWNER=jouw-github-username
VITE_GITHUB_REPO=cj
VITE_GITHUB_TOKEN=github_pat_xxxxxxxxxxxx
```

> **Let op:** Vervang de placeholder-waarden met je echte gegevens.

### 2.2 Vercel Environment Variables
1. Ga naar [vercel.com](https://vercel.com) → jouw project → **Settings → Environment Variables**
2. Voeg **elk** van deze variabelen toe (kopieer exact de naam + waarde uit je `.env`):

| Naam | Waarde |
|------|--------|
| `VITE_EMAILJS_SERVICE_ID` | `service_iusuumq` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_nce93oa` |
| `VITE_EMAILJS_PUBLIC_KEY` | `e926DkSU2uwYyEYHQ` |
| `VITE_ADMIN_PASSWORD` | je gekozen wachtwoord |
| `VITE_GITHUB_OWNER` | je GitHub username |
| `VITE_GITHUB_REPO` | `cj` |
| `VITE_GITHUB_TOKEN` | je GitHub token |

3. Klik **Save** per variabele
4. Ga naar **Deployments** → klik **Redeploy** op de laatste deployment (zodat de nieuwe vars worden opgepikt)

---

## 3. Vercel koppelen

### 3.1 Nieuw project (als je nog geen Vercel project hebt)
1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Importeer je GitHub repo (`cj`)
3. Framework: **Vite** (wordt automatisch gedetecteerd)
4. Build command: `npm run build` (staat al in `vercel.json`)
5. Output directory: `dist` (staat al in `vercel.json`)
6. Klik **Deploy**

### 3.2 Custom domein instellen
1. Ga naar **Project Settings → Domains**
2. Voeg toe: `cyriljansen.nl`
3. Vercel geeft je DNS-records — stel deze in bij je domeinprovider:
   - **A record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com` (voor `www`)
4. Wacht tot de DNS is gepropageerd (kan tot 24 uur duren, meestal <1 uur)

---

## 4. Contactformulier testen

1. Start lokaal: `npm run dev`
2. Ga naar `http://localhost:5173/contact`
3. Vul het formulier in en verstuur
4. Check of je een e-mail ontvangt op `michel.vdput@live.nl`
5. Als het niet werkt:
   - Check de browser console (F12) voor errors
   - Controleer of de EmailJS template variabelen kloppen:
     - `{{name}}` — naam van de afzender
     - `{{email}}` — e-mail van de afzender
     - `{{title}}` — onderwerp
     - `{{message}}` — bericht

---

## 5. Admin pagina testen

### 5.1 Lokaal testen
1. Start lokaal: `npm run dev`
2. Ga naar `http://localhost:5173/admin`
3. Log in met je `VITE_ADMIN_PASSWORD`
4. Test:
   - [ ] Nieuw project toevoegen (check live preview rechts)
   - [ ] Project bewerken
   - [ ] Project verwijderen
   - [ ] Volgorde wijzigen met ▲▼ knoppen
   - [ ] Klik **Publiceer** → check of er een commit verschijnt in je GitHub repo

### 5.2 Na publicatie
- Vercel pikt de commit automatisch op en herbouwt de site (~1 min)
- Check `cyriljansen.nl/projects` om te zien of de nieuwe projecten verschijnen

---

## 6. Instructies voor Cyril

Stuur Cyril deze korte handleiding:

> ### Projecten toevoegen
> 1. Ga naar `cyriljansen.nl/admin`
> 2. Voer het wachtwoord in: `[wachtwoord]`
> 3. Klik **+ Nieuw Project**
> 4. Vul de velden in — rechts zie je een live preview
> 5. Klik **Opslaan**
> 6. Herhaal voor meer projecten
> 7. Pas eventueel de volgorde aan met de pijltjes
> 8. Klik **Publiceer** — de site wordt binnen ~1 minuut bijgewerkt
>
> ### Poster afbeeldingen
> Poster afbeeldingen moeten handmatig worden toegevoegd door Michel.
> Stuur de afbeelding naar Michel, hij plaatst het in de juiste map.
> Gebruik daarna het pad `/img/posters/bestandsnaam.jpg` in het Poster URL veld.

---

## 7. Laatste checks voor livegang

- [ ] Contactformulier werkt (e-mail ontvangen)
- [ ] Admin login werkt
- [ ] Project toevoegen + publiceren werkt
- [ ] Vercel herbouwt automatisch na publicatie
- [ ] Alle 4 pagina's laden correct (`/`, `/projects`, `/about`, `/contact`)
- [ ] SEO: check met [metatags.io](https://metatags.io) of de OG tags kloppen
- [ ] Mobile: test op telefoon of alles responsive is
- [ ] DNS: `cyriljansen.nl` wijst naar Vercel
- [ ] HTTPS: groen slotje in de browser

---

## Samenvatting van bestanden

| Bestand | Doel |
|---------|------|
| `.env` | Lokale secrets (NIET in git) |
| `.env.example` | Template voor andere devs |
| `public/data/projects.json` | Projectdata (wordt door admin bijgewerkt) |
| `src/pages/Admin.tsx` | Admin pagina |
| `src/lib/github.ts` | GitHub API helper |
| `src/hooks/useProjects.ts` | Haalt projecten op uit JSON |
| `vercel.json` | Vercel configuratie |
