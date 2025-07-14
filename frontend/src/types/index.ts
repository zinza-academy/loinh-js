import { UserRole } from "@/app/(auth)/account/types";
import { UserGender } from "@/lib/types/user";

export interface CommonResponse<T> {
  data: T;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface LocationsResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  districts: District[];
}

export interface VaccinationSitesResponse {
  id: number;
  name: string;
  headOfVaccination: string;
  addressDetail: string;
  numberOfInjectionTable: string;
  ward: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  province: {
    id: number;
    name: string;
  };
}

export interface District {
  id: number;
  name: string;
  provinceId: number;
  createdAt: string;
  updatedAt: string;
  wards: Ward[];
}

export interface Ward {
  id: number;
  name: string;
  districtId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  identityNumber: string;
  gender: UserGender;
  name: string;
  birthDate: null | Date;
  isActive: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  phone: null | string;
  avatarUrl: null;
  wardId: number;
  location: {
    ward: {
      id: number;
      name: string;
    };
    district: {
      id: number;
      name: string;
    };
    province: {
      id: number;
      name: string;
    };
  };
}
