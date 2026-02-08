export interface Project {
  id: string;
  title: string;
  type: 'Film' | 'Serie' | 'Commercial' | 'Documentary' | 'Short';
  disciplines: string[];
  country: string;
  countryCode: string;
  imdbUrl?: string;
  year: number;
  role: string;
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
