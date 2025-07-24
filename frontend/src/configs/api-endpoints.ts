
export const API_ENDPOINTS = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  LOCATIONS: "/location",
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    CHANGE_PASSWORD: "/auth/change-password",
  },
  VACCINATION_SITE: {
    CREATE: "/vaccination-sites",
    GET_ALL: "/vaccination-sites",
    GET_BY_ID: (id: string | number) => `/vaccination-sites/${id}`,
    UPDATE: (id: string | number) => `/vaccination-sites/${id}`,
    DELETE: (id: string | number) => `/vaccination-sites/${id}`,
  },
  VACCINATION_REGISTRATION: {
    CREATE: "/vaccination-registrations",
    GET_ALL: "/vaccination-registrations",
    GET_BY_ID: (id: string | number) => `/vaccination-registrations/${id}`,
    UPDATE: (id: string | number) => `/vaccination-registrations/${id}`,
    DELETE: (id: string | number) => `/vaccination-registrations/${id}`,
  },
  USER: {
    CREATE: "/users",
    GET_ALL: "/users",
    GET_BY_ID: (id: string | number) => `/users/${id}`,
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
    UPLOAD_AVATAR: '/users/upload-avatar',
  },
};
