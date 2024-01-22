import React from "react";
import Landing from "./Pages/Landing/landing.jsx";
import Dashboard from "./Pages/Dashboard/dashboard.jsx";
import Application from "./Pages/Application/application.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
