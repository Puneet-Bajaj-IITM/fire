import React from "react";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home";
import ReportPage from "./pages/page";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
