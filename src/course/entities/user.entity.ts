export class Course {
  id: number;
  name: string;
  code: string;
  term: string;
  totalMark: number;
  goalMark: number;
  assMarks: assessments[];
}

export class assessments {
  code: string;
  name: string;
  weighting: number;
  marks: number;
}

export class WAM {
  term: string;
  WAM: number;
}
