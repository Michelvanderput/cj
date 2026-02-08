import type { Project } from '../types';

// ─── NIEUW PROJECT TOEVOEGEN ─────────────────────────────────────────
// Kopieer het template hieronder en plak het BOVENAAN de array (zodat
// het als eerste verschijnt). Vul je gegevens in en sla op — de site
// wordt automatisch opnieuw gebouwd.
//
// {
//   id: '9',                              ← uniek nummer (verhoog vanaf laatste)
//   title: 'Project Naam',               ← titel op de kaart
//   type: 'Film',                         ← Film | Serie | Documentary | Short | Commercial
//   disciplines: ['foley', 'sound-design'], ← kies uit: foley, sound-design, recording, mixing, adr, field-recording
//   country: 'Netherlands',               ← volledige landnaam
//   countryCode: 'NL',                    ← 2-letter ISO code (toont vlag emoji)
//   posterUrl: '/img/posters/naam.jpg',   ← optioneel, afbeelding in public/img/posters/
//   imdbUrl: 'https://www.imdb.com/...',  ← optioneel, verwijder regel als er geen is
//   year: 2025,                           ← jaar van release
//   role: 'Foley Artist & Sound Designer',← jouw rol op het project
// },
// ─────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    type: 'Film',
    disciplines: ['foley', 'sound-design'],
    country: 'Netherlands',
    countryCode: 'NL',
    imdbUrl: 'https://www.imdb.com',
    year: 2024,
    role: 'Foley Artist & Sound Designer',
  },
  {
    id: '2',
    title: 'Midnight Chronicles',
    type: 'Serie',
    disciplines: ['recording', 'adr'],
    country: 'United Kingdom',
    countryCode: 'GB',
    imdbUrl: 'https://www.imdb.com',
    year: 2023,
    role: 'Sound Designer',
  },
  {
    id: '3',
    title: 'Urban Pulse',
    type: 'Commercial',
    disciplines: ['sound-design', 'mixing'],
    country: 'Germany',
    countryCode: 'DE',
    year: 2024,
    role: 'Sound Designer',
  },
  {
    id: '4',
    title: 'Shadows of Tomorrow',
    type: 'Film',
    disciplines: ['foley', 'sound-design'],
    country: 'United States',
    countryCode: 'US',
    imdbUrl: 'https://www.imdb.com',
    year: 2023,
    role: 'Foley Artist',
  },
  {
    id: '5',
    title: 'Northern Lights',
    type: 'Documentary',
    disciplines: ['recording', 'field-recording'],
    country: 'Norway',
    countryCode: 'NO',
    year: 2024,
    role: 'Field Recording & Sound Design',
  },
  {
    id: '6',
    title: 'The Last Frame',
    type: 'Short',
    disciplines: ['foley', 'sound-design'],
    country: 'France',
    countryCode: 'FR',
    imdbUrl: 'https://www.imdb.com',
    year: 2023,
    role: 'Foley Artist & Sound Designer',
  },
  {
    id: '7',
    title: 'Crimson Tide',
    type: 'Serie',
    disciplines: ['sound-design', 'mixing'],
    country: 'Belgium',
    countryCode: 'BE',
    imdbUrl: 'https://www.imdb.com',
    year: 2024,
    role: 'Sound Designer',
  },
  {
    id: '8',
    title: 'Velocity',
    type: 'Commercial',
    disciplines: ['sound-design'],
    country: 'Netherlands',
    countryCode: 'NL',
    year: 2024,
    role: 'Sound Designer',
  },
];

export const allDisciplines = Array.from(
  new Set(projects.flatMap((p) => p.disciplines))
).sort();

export const allTypes = Array.from(
  new Set(projects.map((p) => p.type))
).sort();
