import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navbar";
import Form from "./form";
import List from "./list";
import Updateform from "./updateform";
// import Home from "./home";
import Loader from "./loader";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/Employee/Create"} />} />
        <Route path="/Employee/Create" element={<Form />} />
        <Route path="/Employee/View" element={<List />} />
        <Route path="/Employee/Update/:id" element={<Updateform />} />

      </Routes>
    </Router>
    // <>
    // <Loader /></>
  );
}

export default App;
