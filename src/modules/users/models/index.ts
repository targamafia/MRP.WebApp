import { IAssessment } from '@/modules/assessments/models';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  companyCode: string;
  roles: string[];
}

export interface IApplicant {
  id: string;
}

export interface IGradeAssessment {
  id: string;
  startDate: Date;
  endDate: Date;
  grade: number;
  correctAnswers: number;
  wrongAnswers: number;
  assessment: IAssessment;
  applicant?: IApplicant;
}
