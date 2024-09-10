// src/app/types/phase-data.ts

export interface Content {
  id: number;
  type: string;
  title?: string;
  icon?: string;
  text?: string;
  url?: string;
  videoId?: string;
  question?: string;
  options?: string[];
  answerIndex?: number;
  feedbackEnable?: boolean;
  feedbackFormUrl?:string;
}

export interface Phase {
  id: number;
  title: string;
  contents: Content[];
}
