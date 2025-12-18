// types.ts
import type { ReactNode } from "react";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  client: string;
  title: string;
  thumbnailUrl: string;
  type?: string;
  description?: string;
  credits?: string[];
  links?: ProjectLink[];
  sliceImageUrl?: string;
  videoUrl?: string;
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
