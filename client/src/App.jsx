import "./App.css";
// import MovilPerfil from "./views/MovilPerfil";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import RequireAuth from "./components/RequireAuth";
import WebChat from "./views/WebChat";
import UserDetails from "./views/UserDetails";

import Busqueda from "./views/Busqueda";
import CommingSoon from "./views/CommingSoon";
import WebBlog from "./views/WebBlog";
import WebPagos from "./views/WebPagos";
import WebNoticias from "./views/WebNoticias";
function App() {
  return (
    <>
      {/* <MovilPerfil /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<WebChat />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/noticias" element={<WebNoticias />} />
            <Route path="/blog" element={<WebBlog />} />
            <Route path="/cursos" element={<CommingSoon />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/pagos" element={<WebPagos />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
