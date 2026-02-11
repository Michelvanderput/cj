export interface CountryEntry {
  name: string;
  code: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'Film' | 'Serie' | 'Commercial' | 'Documentary' | 'Short';
  credits: string[];
  countries: CountryEntry[];
  imdbUrl?: string;
  year: number;
  posterUrl?: string;
}

export type ProjectType = Project['type'];

export interface SocialPost {
  id: string;
  type: 'update' | 'instagram';
  content?: string;
  date: string;
  instagramUrl?: string;
}
