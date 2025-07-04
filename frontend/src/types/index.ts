export interface CommonResponse<T> {
  data: T;
}

export interface LocationsResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  districts: District[];
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
