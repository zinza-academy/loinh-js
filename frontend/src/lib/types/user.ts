export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export enum UserGender {
  MALE = 'MALE',
  FEMALE = "FEMALE",
  OTHER = 'OTHER',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}