export interface Project {
  id: string;
  title: string;
  client: string;
  type: 'records' | 'publishing' | 'management' | 'artist';
  thumbnailUrl: string; // Vertical aspect ratio image
  videoUrl?: string; // Optional video embed or file
  description: string;
  credits: string[];
  links: { label: string; url: string }[];
}

export interface WindowState {
  id: string;
  projectId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

export interface Position {
  x: number;
  y: number;
}
