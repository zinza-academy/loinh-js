export const API_ENDPOINTS = {
  API_BASE_URL: "http://localhost:8080",
  LOCATIONS: "/location",
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
  },
  VACCINATION_SITE: {
    CREATE: "/vaccination-sites",
    GET_ALL: "/vaccination-sites",
    GET_BY_ID: (id: string | number) => `/vaccination-sites/${id}`,
    UPDATE: (id: string | number) => `/vaccination-sites/${id}`,
    DELETE: (id: string | number) => `/vaccination-sites/${id}`,
  },
  
};
