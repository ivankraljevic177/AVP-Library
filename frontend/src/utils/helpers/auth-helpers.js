import Cookies from "js-cookie";

const authToken = "AUTH_TOKEN";
export const getAuthToken = () => Cookies.get(authToken);

export const setAuthToken = (token) => {
  /**
   * Since we're not using any date parsing libraries, 0.35 resembles 8hrs until the token expires.
   * In the future, when we add a library for parsing dates, we should handle this in a better way.
   */
  Cookies.set(authToken, token, {
    sameSite: "Strict",
    secure: true,
    expires: 0.35,
  });
};

export const removeAuthToken = () => {
  Cookies.remove(authToken);
};
