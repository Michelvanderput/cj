export interface Discipline {
  id: string;
  label: string;
  description: string;
}

// ─── FIXED LIST OF DISCIPLINES ──────────────────────────────────────
// Single source of truth for all disciplines.
// Used on: Work page (service blocks), Projects filter, Admin page.
// ─────────────────────────────────────────────────────────────────────

export const DISCIPLINES: Discipline[] = [
  {
    id: 'foley',
    label: 'Foley',
    description:
      'Recreating and recording everyday sound effects added in post-production to film and television to enrich the audio experience.',
  },
  {
    id: 'sound-design',
    label: 'Sound Design',
    description:
      'Creating, editing and integrating sound effects and sonic textures that shape the atmosphere and narrative of a production.',
  },
  {
    id: 'recording',
    label: 'Recording',
    description:
      'Professional sound recording in studio environments with state-of-the-art equipment for optimal audio quality.',
  },
  {
    id: 'mixing',
    label: 'Mixing',
    description:
      'Combining and balancing all audio layers — dialogue, music, effects — into a coherent and impactful final mix.',
  },
  {
    id: 'adr',
    label: 'ADR',
    description:
      'Automated Dialogue Replacement: re-recording dialogue in a controlled studio environment for perfect audio quality.',
  },
  {
    id: 'field-recording',
    label: 'Field Recording',
    description:
      'Capturing authentic sounds on location — from natural ambiences to specific sound effects for use in productions.',
  },
];

export const DISCIPLINE_IDS = DISCIPLINES.map((d) => d.id);
export const DISCIPLINE_LABELS = DISCIPLINES.map((d) => d.label);
