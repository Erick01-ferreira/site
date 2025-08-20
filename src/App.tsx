import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* você pode adicionar outras rotas aqui */}
    </Routes>
  );
}

export default App; // ✅ aqui é o lugar certo
