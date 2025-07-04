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
} as const;
