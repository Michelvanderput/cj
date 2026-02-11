import type { Project } from '../types';

// ─── ADD NEW PROJECT ─────────────────────────────────────────────────
// Copy the template below and paste it at the TOP of the array (so it
// appears first). Fill in your details and save — the site will be
// automatically rebuilt.
//
// {
//   id: '9',                              ← unique number (increment from last)
//   title: 'Project Name',               ← title on the card
//   type: 'Film',                         ← Film | Serie | Documentary | Short | Commercial
//   credits: ['foley-artist', 'sound-designer'], ← sub-credit IDs from credits.ts
//   country: 'Netherlands',               ← full country name
//   countryCode: 'NL',                    ← 2-letter ISO code (shows flag)
//   posterUrl: '/img/posters/name.jpg',   ← optional, image in public/img/posters/
//   imdbUrl: 'https://www.imdb.com/...',  ← optional, remove line if none
//   year: 2025,                           ← year of release
// },
// ─────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    type: 'Film',
    credits: ['foley-artist', 'sound-designer'],
    country: 'Netherlands',
    countryCode: 'NL',
    imdbUrl: 'https://www.imdb.com',
    year: 2024,
  },
  {
    id: '2',
    title: 'Midnight Chronicles',
    type: 'Serie',
    credits: ['adr-recordist', 'adr-editor'],
    country: 'United Kingdom',
    countryCode: 'GB',
    imdbUrl: 'https://www.imdb.com',
    year: 2023,
  },
  {
    id: '3',
    title: 'Urban Pulse',
    type: 'Commercial',
    credits: ['sound-designer'],
    country: 'Germany',
    countryCode: 'DE',
    year: 2024,
  },
  {
    id: '4',
    title: 'Shadows of Tomorrow',
    type: 'Film',
    credits: ['foley-artist', 'foley-recordist', 'sound-designer'],
    country: 'United States',
    countryCode: 'US',
    imdbUrl: 'https://www.imdb.com',
    year: 2023,
  },
  {
    id: '5',
    title: 'Northern Lights',
    type: 'Documentary',
    credits: ['set-recordist', 'ad-recordist'],
    country: 'Norway',
    countryCode: 'NO',
    year: 2024,
  },
  {
    id: '6',
    title: 'The Last Frame',
    type: 'Short',
    credits: ['foley-artist', 'sound-designer'],
    country: 'France',
    countryCode: 'FR',
    imdbUrl: 'https://www.imdb.com',
    year: 2023,
  },
  {
    id: '7',
    title: 'Crimson Tide',
    type: 'Serie',
    credits: ['dubbing-engineer'],
    country: 'Belgium',
    countryCode: 'BE',
    imdbUrl: 'https://www.imdb.com',
    year: 2024,
  },
  {
    id: '8',
    title: 'Velocity',
    type: 'Commercial',
    credits: ['sound-designer'],
    country: 'Netherlands',
    countryCode: 'NL',
    year: 2024,
  },
];

export const allCredits = Array.from(
  new Set(projects.flatMap((p) => p.credits))
).sort();

export const allTypes = Array.from(
  new Set(projects.map((p) => p.type))
).sort();
