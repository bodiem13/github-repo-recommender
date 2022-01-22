import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import { FaRegFileCode } from 'react-icons/fa';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;