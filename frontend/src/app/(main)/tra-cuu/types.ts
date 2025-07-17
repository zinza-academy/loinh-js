export interface GetregistVaccinationSuccessResponse {
  id: number;
  healthInsuranceNumber: null | number;
  userId: number;
  priorityGroup: string;
  registrationDate: null | number;
  vaccineType: string;
  status: null | number;
  currentJob: null | number;
  currentAddressId: null | number;
  preferredSession: null | string;
  vaccinationSiteId: null | number;
  user: {
    name: string;
    identityNumber: string;
    birthDate: Date;
    gender: string;
    wardId: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserParams {
  name?: string;
  identityNumber?: string;
  birthDate?: string;
  gender?: string;
  wardId?: string | number;
}

export interface UpdateUserResponse {
  id: number;
  identityNumber: string;
  gender: string;
  name: string;
  birthDate: null | Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  phone: string | null;
  avatar: string | null;
  wardId: number;
}

export interface UploadUserAvatarResponse {
  success: boolean;
  message: string;
  url: string;
}
