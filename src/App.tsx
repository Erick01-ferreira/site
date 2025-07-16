import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Relatorios from "./pages/relatorios/Relatorios";
import Login from "./pages/login/Login";
import Ocorrencias from "./pages/ocorrencias/Ocorrencias";
import Usuarios from "./pages/usuarios/Usuarios";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ocorrencias" element={<Ocorrencias />} />
      <Route path="/usuarios" element={<Usuarios />} />
    </Routes>
  );
}
