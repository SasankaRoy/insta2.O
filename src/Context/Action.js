export const LogInStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LogInSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LogInError = (error) => ({
  type: "LOGIN_ERROR",
  payload: error,
});
