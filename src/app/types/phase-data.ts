export interface Phase {
  id: number;
  title: string;
  phasePresentation: {
    title: string;
  };
  topics: Topic[];
  questionsPresentation: {
    title: string;
  };
  questions: Question[];
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
