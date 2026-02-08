export interface Discipline {
  id: string;
  label: string;
  description: string;
}

// ─── VASTE LIJST VAN DISCIPLINES ────────────────────────────────────
// Dit is de enige bron van waarheid voor alle disciplines.
// Wordt gebruikt op: Over pagina (blokjes), Projecten filter, Admin pagina.
// ─────────────────────────────────────────────────────────────────────

export const DISCIPLINES: Discipline[] = [
  {
    id: 'foley',
    label: 'Foley',
    description:
      'Het nabootsen en opnemen van alledaagse geluidseffecten die in post-productie aan film en televisie worden toegevoegd om de audio-ervaring te verrijken.',
  },
  {
    id: 'sound-design',
    label: 'Sound Design',
    description:
      'Het creëren, bewerken en integreren van geluidseffecten en sonische texturen die de sfeer en het verhaal van een productie vormgeven.',
  },
  {
    id: 'recording',
    label: 'Recording',
    description:
      'Professionele opname van geluid in studio-omgevingen met state-of-the-art apparatuur voor optimale audiokwaliteit.',
  },
  {
    id: 'mixing',
    label: 'Mixing',
    description:
      'Het samenvoegen en balanceren van alle audiolagen — dialoog, muziek, effecten — tot een coherente en impactvolle eindmix.',
  },
  {
    id: 'adr',
    label: 'ADR',
    description:
      'Automated Dialogue Replacement: het opnieuw opnemen van dialoog in een gecontroleerde studio-omgeving voor perfecte audiokwaliteit.',
  },
  {
    id: 'field-recording',
    label: 'Field Recording',
    description:
      'Het opnemen van authentieke geluiden op locatie — van natuurlijke ambiances tot specifieke geluidseffecten voor gebruik in producties.',
  },
];

export const DISCIPLINE_IDS = DISCIPLINES.map((d) => d.id);
export const DISCIPLINE_LABELS = DISCIPLINES.map((d) => d.label);
