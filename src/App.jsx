import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import "./index.css";
const App = () => {
  return (
    <div className="app-container">
      <div className="app-content">
        <Sidebar />
        <Main username="Sam" />
      </div>
    </div>
  );
};

export default App;
