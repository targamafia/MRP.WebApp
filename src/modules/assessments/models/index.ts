export interface IOption {
  discriminator: 'option';
  value: string;
  isCorrectAnswer: boolean;
  _id: string;
}

export enum QuestionTypes {
  MultipleChoice = 'MULTIPLE_CHOICE',
  Boolean = 'BOOLEAN',
  Options = 'OPTIONS',
  Open = 'OPEN',
}

export interface IQuestion {
  discriminator: 'question';
  _id?: string;
  id?: string;
  title: string;
  imageUrl?: string;
  type: QuestionTypes;
  correctOption: Number;
  options: Array<IOption>;
}

export interface IAssessment {
  discriminator: 'assessment';
  id: string;
  _id: string;
  title: string;
  createdBy: string;
  thumbnailUrl?: string;
  description?: string;
  durationInSeconds?: number;
  rating: number;
  attempts: number;
  averageFinishedTime: number;
  isPrivate: boolean;
  isPremium: boolean;
  startDate?: Date;
  availableDate?: Date;
  expirationDate?: Date;
  categories: string[];
  questions?: IQuestion[];
}

export interface INewAssessment {
  discriminator: 'newAssessment';
  title: string;
  createdBy: string;
  thumbnailUrl?: string;
  description?: string;
  durationInSeconds?: number;
  isPrivate: boolean;
  isPremium: boolean;
  availableDate: Date;
  startDate: Date;
  expirationDate: Date;
  categories: string[];
}

export interface IAssessmentListItem {
  discriminator: 'AssessmentListItem';
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  isPrivate: boolean;
  isPremium: boolean;
  categories: string[];
  rating: number;
}

export interface IAssessmentList {
  discriminator: 'assessmentList';
  pagesCount: number;
  pageSize: number;
  currentPage: number;
  list: Array<IAssessmentListItem>;
  next: string | undefined;
  prev: string | undefined;
}

export interface IServiceResponse {
  discriminator: 'serviceResponse';
  isSuccess: boolean;
  entity?: any;
  error?: string;
}
