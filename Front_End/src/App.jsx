import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './Componet/Form/Form';
import Home from './Componet/Home/Home';
import Login from './Componet/login&sign/Login';
import Profile from './Componet/Profile/Profile';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
