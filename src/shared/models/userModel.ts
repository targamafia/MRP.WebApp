export interface UserModel {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  companyCode: string;
  roles?: string[];
}
