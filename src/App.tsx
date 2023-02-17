import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Components/auth/authMethods";
import "./App.css";

// Components
import { Home, Login } from "./Components";

const App: React.FC = () => {
  const [user] = useAuthState(auth) as null | any;
  return <div className="App">{user ? <Home /> : <Login />}</div>;
};
export default App;
