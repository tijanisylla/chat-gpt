import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "../config/config";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const facebookProvider =
  new FacebookAuthProvider() as FacebookAuthProvider;

export const googleProvider = new GoogleAuthProvider() as GoogleAuthProvider;
export const githubProvider = new GithubAuthProvider() as GithubAuthProvider;
export const yahooProvider = new OAuthProvider("yahoo.com");
