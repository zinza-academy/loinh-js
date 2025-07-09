export const TOAST_MESSAGES = {
  CREATE_VACCINATION_RERISTRATION_SUCCESS: {
    title: "Injection point created successfully!",
    description: "The new vaccination registration has been added.",
    duration: 2000,
  },
  CREATE_VACCINATION_RERISTRATION_ERROR: {
    title: "Failed to create vaccination registration!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
  UPDATE_VACCINATION_RERISTRATION_SUCCESS: {
    title: "Injection point updated successfully!",
    description: "The vaccination registration has been updated.",
    duration: 2000,
  },
  UPDATE_VACCINATION_RERISTRATION_ERROR: {
    title: "Failed to update vaccination registration!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
} as const;
