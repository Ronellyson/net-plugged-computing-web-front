export interface PhaseData {
  phase: Phase;
}

export interface Phase {
  id: number;
  title: string;
  phasePresentation: Presentation;
  topics: Topic[];
  questionsPresentation: Presentation;
  questions: Question[];
}

export interface Presentation {
  title: string;
}

export interface Topic {
  title: string;
  contents: Content[];
}

export interface Content {
  type: 'text' | 'image' | 'video';
  icon?: string;
  text?: string;
  url?: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}
