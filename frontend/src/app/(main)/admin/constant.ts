export const TOAST_MESSAGES = {
  CREATE_INJECTION_POINT_SUCCESS: {
    title: "Injection point created successfully!",
    description: "The new injection point has been added.",
    duration: 2000,
  },
  CREATE_INJECTION_POINT_ERROR: {
    title: "Failed to create injection point!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
  UPDATE_INJECTION_POINT_SUCCESS: {
    title: "Injection point updated successfully!",
    description: "The injection point has been updated.",
    duration: 2000,
  },
  UPDATE_INJECTION_POINT_ERROR: {
    title: "Failed to update injection point!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },

  CREATE_INJECTION_REGISTRATION_SUCCESS: {
    title: "Injection registration created successfully!",
    description: "The new injection registration has been added.",
    duration: 2000,
  },
  CREATE_INJECTION_REGISTRATION_ERROR: {
    title: "Failed to create injection registration!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
  UPDATE_INJECTION_REGISTRATION_SUCCESS: {
    title: "Injection registration updated successfully!",
    description: "The injection registration has been updated.",
    duration: 2000,
  },
  UPDATE_INJECTION_REGISTRATION_ERROR: {
    title: "Failed to update injection registration!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },

  // User Management Messages
  CREATE_USER_SUCCESS: {
    title: "User created successfully!",
    description: "The new user has been added.",
    duration: 2000,
  },
  CREATE_USER_ERROR: {
    title: "Failed to create user!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
  UPDATE_USER_SUCCESS: {
    title: "User updated successfully!",
    description: "The user has been updated.",
    duration: 2000,
  },
  UPDATE_USER_ERROR: {
    title: "Failed to update user!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
} as const;
