import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Form from "./form";
import List from "./list";
import Updateform from "./updateform";
import Home from "./home";
import Loader from "./loader";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/list" element={<List />} />
        <Route path="/updateform/:id" element={<Updateform />} />

      </Routes>
    </Router>
    // <>
    // <Loader /></>
  );
}

export default App;
