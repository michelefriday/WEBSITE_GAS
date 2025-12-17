import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'USB',
    client: 'Fred Again..',
    type: 'artist',
    // Live, sweaty, club atmosphere, blue/purple lighting
    thumbnailUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop',
    description: 'Infinite loop. The ongoing USB project compiling sketches, edits, and collaborations from the road.',
    credits: ['Live Visuals: T. Gander', 'Mix: F. Gibson'],
    links: [{ label: 'Boiler Room', url: '#' }]
  },
  {
    id: 'p2',
    title: 'NOSTALGIA',
    client: 'Skye Newman',
    type: 'artist',
    // Cinematic portrait, soft lighting, moody, film look
    thumbnailUrl: 'https://images.unsplash.com/photo-1615234346884-28b971a8f906?q=80&w=1200&auto=format&fit=crop',
    description: 'Debut EP exploring themes of memory and digital decay. Shot on 16mm film in Tokyo.',
    credits: ['Director: A. Wong', 'Color: Company 3'],
    links: [{ label: 'Watch Video', url: '#' }]
  },
  {
    id: 'p3',
    title: 'VELVET ROPE',
    client: 'Scarlett Loran',
    type: 'artist',
    // Cinematic, moody, dark water/reflection
    thumbnailUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop',
    description: 'The debut visual album from Scarlett Loran. A collection of ethereal soundscapes matched with stark, brutalist imagery.',
    credits: ['Director: K. Hale', 'DOP: M. Varg'],
    links: [{ label: 'Watch', url: '#' }, { label: 'Listen', url: '#' }]
  },
  {
    id: 'p4',
    title: 'PROTOCOL V',
    client: 'Wraith9',
    type: 'records',
    // Dark, grainy, abstract texture - industrial techno vibe
    thumbnailUrl: 'https://images.unsplash.com/photo-1594235048794-efa44f92cbe2?q=80&w=1200&auto=format&fit=crop',
    description: 'Underground release for the enigmatic producer Wraith9. Heavy industrial techno pressed on 180g clear vinyl.',
    credits: ['Mastering: Berlin Dubplates'],
    links: [{ label: 'Buy Vinyl', url: '#' }]
  },
  {
    id: 'p5',
    title: 'ECHOES',
    client: 'Zulan',
    type: 'management',
    // High contrast, mysterious, fashion/abstract
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    description: 'Global representation for the avant-pop icon Zulan. Upcoming world tour "ECHOES" starts Fall 2025.',
    credits: ['Creative Direction: FRIDAY'],
    links: [{ label: 'Tour Dates', url: '#' }]
  }
];

export const INITIAL_WINDOW_WIDTH = 600;
export const INITIAL_WINDOW_HEIGHT = 500;