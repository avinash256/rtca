import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route path="/chat" exact element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
