export const setAuthToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("accessToken");
};
