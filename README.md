# Cyril Jansen - Portfolio Website

Professional portfolio website for Cyril Jansen, a Foley artist, sound designer, and recording engineer based in Amsterdam.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **GSAP** - Animations

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Layout.tsx      # Page layout wrapper
│   ├── ProjectCard.tsx # Project display card
│   ├── SearchBar.tsx   # Search input component
│   └── FilterBar.tsx   # Tag filter component
├── pages/              # Route pages
│   ├── Home.tsx        # Homepage with intro and featured projects
│   ├── Projects.tsx    # Full project grid with search and filters
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact information
├── data/               # Static data
│   └── projects.ts     # Project data and mock content
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
└── App.tsx             # Root component with routing
```

## Features

### Homepage
- Clean, minimal introduction
- Featured project highlights
- Subtle GSAP animations on page load

### Projects Page
- Grid layout optimized for film poster aspect ratios (2:3)
- Real-time search by project title
- Multi-tag filtering system
- Country flags for international productions
- Direct IMDb links where available
- Responsive grid (1-4 columns based on viewport)

### About Page
- Professional biography
- Studio information
- Clean typography and spacing

### Contact Page
- Email contact
- Location information
- External links (IMDb, LinkedIn)

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Design Decisions

### Styling Approach
- Minimal, clean aesthetic with focus on whitespace
- No heavy color palette - primarily neutral tones
- Typography-driven hierarchy
- Consistent spacing using Tailwind's spacing scale

### Animation Strategy
- GSAP for smooth, professional animations
- Subtle entrance animations (fade + translate)
- Staggered animations for lists and grids
- Performance-optimized with proper cleanup

### UX Considerations
- Instant search feedback with no debouncing needed (small dataset)
- Clear visual feedback for active filters
- Accessible navigation with proper semantic HTML
- Mobile-first responsive design

### Scalability
- Type-safe data structure for easy project additions
- Automatic tag and type extraction from project data
- Component-based architecture for easy maintenance
- Modular filtering logic for future enhancements

## Future Enhancements

- Add actual project images/posters
- Implement project detail pages
- Add loading states for images
- Consider pagination for large project lists
- Add animation preferences (respect prefers-reduced-motion)
- Integrate with a CMS for easier content management

## Deployment

Ready to deploy to Vercel:

```bash
npm run build
# Deploy the 'dist' folder to Vercel
```
