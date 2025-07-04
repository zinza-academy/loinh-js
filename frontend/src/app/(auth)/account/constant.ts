export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: {
    title: "Login successful!",
    description: "Welcome back!",
    duration: 2000,
  },
  LOGIN_ERROR: {
    title: "Login failed!",
    duration: 3000,
    variant: "destructive" as const,
  },
  REGISTER_SUCCESS: {
    title: "Registration successful!",
    description: "You can now log in with your new account.",
    duration: 2000,
  },
  REGISTER_ERROR: {
    title: "Registration failed!",
    description: "Please check your details and try again.",
    duration: 3000,
    variant: "destructive" as const,
  },
  LOGOUT_SUCCESS: {
    title: "Logout successful!",
    description: "You have been logged out.",
    duration: 2000,
  },
  LOGOUT_ERROR: {
    title: "Logout failed!",
    description: "Please try again later.",
    duration: 3000,
    variant: "destructive",
  },
} as const;
