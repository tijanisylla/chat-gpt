interface TypeConfig {
  apiKey: string | undefined;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export const firebaseConfig: TypeConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ai-react-auth.firebaseapp.com",
  projectId: "ai-react-auth",
  storageBucket: "ai-react-auth.appspot.com",
  messagingSenderId: "962712107263",
  appId: "1:962712107263:web:ac29bc9004d68be0c3f4ca",
  measurementId: "G-KDRXW8GEVM",
};
