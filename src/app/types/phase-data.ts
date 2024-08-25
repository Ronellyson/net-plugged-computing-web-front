// src/app/types/phase-data.ts

export interface Content {
  id: number;
  type: string;
  title?: string;
  icon?: string;
  text?: string;
  url?: string;
  question?: string;
  options?: string[];
  answer?: string;
}

export interface Phase {
  id: number;
  title: string;
  contents: Content[];
}
