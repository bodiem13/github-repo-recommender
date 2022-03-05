import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Contact from './pages/contact'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home/>} />
        <Route path={"/contact"} element={<Contact/>} />
      </Routes>
    </Router>
  );
};

export default App;