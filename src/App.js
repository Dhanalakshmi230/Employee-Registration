import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Form from "./form";
import List from "./list";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
