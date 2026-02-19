// ─── CREDITS SYSTEM ─────────────────────────────────────────────────
// Single source of truth for all credits.
// Each HEAD category has sub-credits. Projects store sub-credit IDs.
// Filtering on the Projects page works by HEAD category — selecting a
// HEAD shows all projects that have any sub-credit in that category.
// Used on: Work page, Projects filter, Admin page, ProjectCard.
// ─────────────────────────────────────────────────────────────────────

export interface SubCredit {
  id: string;
  label: string;
}

export interface CreditCategory {
  id: string;
  label: string;
  description: string;
  subCredits: SubCredit[];
}

export const CREDITS: CreditCategory[] = [
  {
    id: 'foley',
    label: 'Foley',
    description:
      'Recreating and recording everyday sound effects added in post-production to film and television to enrich the audio experience.',
    subCredits: [
      { id: 'foley-artist', label: 'Foley Artist' },
      { id: 'foley-recordist', label: 'Foley Recordist' },
      { id: 'foley-editor', label: 'Foley Editor' },
    ],
  },
  {
    id: 'sound-design',
    label: 'Sound Design',
    description:
      'Creating, editing and integrating sound effects and sonic textures that shape the atmosphere and narrative of a production.',
    subCredits: [
      { id: 'sound-designer', label: 'Sound Designer' },
    ],
  },
  {
    id: 'set-recording',
    label: 'Set Recording',
    description:
      'Professional on-set sound recording, capturing clean dialogue and production audio during filming.',
    subCredits: [
      { id: 'set-recordist', label: 'Set Recordist' },
    ],
  },
  {
    id: 'adr',
    label: 'ADR',
    description:
      'Automated Dialogue Replacement: re-recording dialogue in a controlled studio environment for perfect audio quality.',
    subCredits: [
      { id: 'adr-recordist', label: 'ADR Recordist' },
      { id: 'adr-recording-assistant', label: 'ADR Recording Assistant' },
      { id: 'adr-editor', label: 'ADR Editor' },
      { id: 'loopgroup-recordist', label: 'Loopgroup Recordist' },
      { id: 'loopgroup-editor', label: 'Loopgroup Editor' },
    ],
  },
  {
    id: 'audio-description',
    label: 'Audio Description',
    description:
      'Recording and editing audio descriptions that make visual media accessible to blind and visually impaired audiences.',
    subCredits: [
      { id: 'ad-recordist', label: 'Audio Description Recordist' },
      { id: 'ad-editor', label: 'Audio Description Editor' },
    ],
  },
  {
    id: 'dubbing',
    label: 'Dubbing',
    description:
      'Audio engineering for dubbed productions, ensuring seamless voice replacement and audio quality across languages.',
    subCredits: [
      { id: 'dubbing-engineer', label: 'Audio Engineer - Dubbing (Dutch / NL)' },
    ],
  },
];

// All sub-credit IDs in a flat list
export const ALL_SUB_CREDITS: SubCredit[] = CREDITS.flatMap((c) => c.subCredits);

// Lookup: sub-credit ID → its label
export const SUB_CREDIT_LABELS: Record<string, string> = Object.fromEntries(
  ALL_SUB_CREDITS.map((sc) => [sc.id, sc.label])
);

// Lookup: sub-credit ID → parent HEAD category ID
export const SUB_CREDIT_TO_HEAD: Record<string, string> = Object.fromEntries(
  CREDITS.flatMap((c) => c.subCredits.map((sc) => [sc.id, c.id]))
);

// HEAD category IDs
export const CREDIT_HEAD_IDS = CREDITS.map((c) => c.id);
export const CREDIT_HEAD_LABELS: Record<string, string> = Object.fromEntries(
  CREDITS.map((c) => [c.id, c.label])
);

// Helper: given a list of sub-credit IDs, get the matching HEAD category IDs
export const getHeadCredits = (subCreditIds: string[]): string[] =>
  Array.from(new Set(subCreditIds.map((id) => SUB_CREDIT_TO_HEAD[id]).filter(Boolean)));

// Helper: given a HEAD category ID, get all sub-credit IDs in that category
export const getSubCreditIds = (headId: string): string[] =>
  CREDITS.find((c) => c.id === headId)?.subCredits.map((sc) => sc.id) ?? [];
