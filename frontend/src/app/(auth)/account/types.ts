export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface SignupParams {
  email: string;
  password: string;
  name: string;
  wardId: number;
  identityNumber: string;
  gender: string;
}

export interface SignupResponse {
  message: string;
}
export interface LogoutResponse {
  message: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: number;
  avatarUrl: string;
  name: string;
  role: UserRole;
  birthDate: Date;
  isActive: boolean;
  gender: string;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  name: string;
  wardId: number;
  identityNumber: string;
  gender: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordParams {
  newPassword: string;
}
