import { signInWithPopup, AuthProvider } from "firebase/auth";
import { auth } from "./authMethods";

export const socialMediaAuth = (provider: AuthProvider) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      return error;
    });
};
