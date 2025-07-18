export const TOAST_MESSAGES = {
  UPLOAD_USER_AVATAR_SUCCESS: {
    title: "Upload Avatar Success",
    description: "Your avatar has been successfully uploaded.",
    duration: 2000,
  },
  UPLOAD_USER_AVATAR_ERROR: {
    title: "Upload Avatar Error",
    description: "There was an error uploading your avatar.",
    variant: "destructive" as const,
  },
};
