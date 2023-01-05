import React from "react";
import "./App.css";
import { Header, Home } from "./Components";

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <Header />
        <Home />
      </main>
      <footer>
        <p>© 2021 Chat GPT Sylla</p>
      </footer>
    </div>
  );
};
export default App;
