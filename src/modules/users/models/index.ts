export interface IUser {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  companyCode: string;
  roles: string[];
}

export interface IGradeAssessment {
  id: string;
  startDate: Date;
  endDate: Date;
  grade: number;
  correctAnswers: number;
  wrongAnswers: number;
}
