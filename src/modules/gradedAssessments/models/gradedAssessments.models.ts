import { IAssessment, IQuestion } from '@/modules/assessments/models';

export interface IGivenAnswers {
  questionId: string;
  optionId?: string;
}

export interface IAnswer {
  question: IQuestion;
  givenAnswer: IGivenAnswers;
  isCorrect: boolean;
  points: number;
}

export interface IGradeAssessment {
  id: string;
  startDate: Date;
  endDate: Date;
  grade: number;
  correctAnswers: number;
  wrongAnswers: number;
  assessment: IAssessment;
}

export interface IGradeAssessmentDetail {
  id: string;
  answers: Array<IAnswer>;
  startDate: Date;
  endDate: Date;
  grade: number;
  correctAnswers: number;
  wrongAnswers: number;
}
