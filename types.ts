// types.ts
import type { ReactNode } from "react";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Division = "records" | "publishing" | "management";

export type Project = {
  id: string;
  client: string;
  title: string;
  thumbnailUrl: string;
  division: Division;
  hoverClips: string[];
  windowVideoUrl: string;
  hoverVideoUrl?: string;
  windowTitle?: string;
  windowType?: string;
  embedUrl?: string;
  type?: string;
  description?: string;
  credits?: string[];
  links?: ProjectLink[];
  sliceImageUrl?: string;
  videoErrorMessage?: string;
  customContent?: ReactNode;
};

export type WindowState = {
  id: string;
  projectId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
};
