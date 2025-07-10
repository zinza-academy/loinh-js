export const TOAST_MESSAGES = {
  UPDATE_USER_INFO_SUCCESS: {
    title: "update successful!",
    description: "Your information has been updated successfully.",
    duration: 2000,
  },
  UPDATE_USER_INFO_ERROR: {
    title: "update failed!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
};
