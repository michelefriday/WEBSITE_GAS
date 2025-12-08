import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'VELVET ROPE',
    client: 'Scarlett Loran',
    type: 'artist',
    // Cinematic, moody, dark water/reflection - looks like a paused video frame
    thumbnailUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop',
    description: 'The debut visual album from Scarlett Loran. A collection of ethereal soundscapes matched with stark, brutalist imagery.',
    credits: ['Director: K. Hale', 'DOP: M. Varg'],
    links: [{ label: 'Watch', url: '#' }, { label: 'Listen', url: '#' }]
  },
  {
    id: 'p2',
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
    id: 'p3',
    title: 'SOFT FOCUS',
    client: 'Vanya',
    type: 'management',
    // Motion blur, flash photography, nightlife feel
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    description: '360 management for breakout pop-noir artist Vanya. Includes global tour strategy and brand partnerships.',
    credits: ['Manager: FRIDAY'],
    links: [{ label: 'Tour Dates', url: '#' }]
  },
  {
    id: 'p4',
    title: 'VOID',
    client: 'Echo Collective',
    type: 'publishing',
    // Atmospheric, smoky, cinematic landscape
    thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=1200&auto=format&fit=crop',
    description: 'Publishing administration for the avant-garde jazz ensemble Echo Collective.',
    credits: ['Legal: FRIDAY'],
    links: [{ label: 'Catalog', url: '#' }]
  },
  {
    id: 'p5',
    title: 'STRUCTURE',
    client: 'Mono Inc.',
    type: 'artist',
    // Red neon, dark, structural - art installation vibe
    thumbnailUrl: 'https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=1200&auto=format&fit=crop',
    description: 'Sound installation for the Tate Modern Turbine Hall. Generative audio reacting to visitor movement.',
    credits: ['Artist: Mono Inc.', 'Production: FRIDAY'],
    links: [{ label: 'Exhibition', url: '#' }]
  },
  {
    id: 'p6',
    title: 'NIGHT RIDER',
    client: 'Kavinsky',
    type: 'records',
    // Car, night, motion, cinematic drive
    thumbnailUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop',
    description: 'Re-issue of the classic synthwave anthem with new remixes by emerging artists.',
    credits: ['A&R: FRIDAY'],
    links: [{ label: 'Stream', url: '#' }]
  },
  {
    id: 'p7',
    title: 'GLASS',
    client: 'Prism',
    type: 'publishing',
    // Abstract light refraction, clean, glossy
    thumbnailUrl: 'https://images.unsplash.com/photo-1496482475496-a91f31e0386c?q=80&w=1200&auto=format&fit=crop',
    description: 'Sync placement for the new luxury fragrance campaign "Glass" by Prism.',
    credits: ['Supervisor: L. Chen'],
    links: [{ label: 'Watch Spot', url: '#' }]
  },
  {
    id: 'p8',
    title: 'STATIC',
    client: 'Noise Unit',
    type: 'management',
    // Glitchy, cyber, distorted technology
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    description: 'Development deal for the noise-rock outfit Noise Unit.',
    credits: ['Agent: FRIDAY'],
    links: [{ label: 'Bio', url: '#' }]
  }
];

export const INITIAL_WINDOW_WIDTH = 600;
export const INITIAL_WINDOW_HEIGHT = 500;