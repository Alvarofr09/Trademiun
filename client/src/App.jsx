import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import RequireAuth from "./components/RequireAuth";
import Chat from "./views/Chat";
import UserDetails from "./views/UserDetails";
import CreateGroup from "./views/CreateGroup";

import WebBuscador from "./views/WebBuscador";
import WebPagos from "./views/WebPagos";

import WebNoticias from "./views/WebNoticias";
import CommingSoon from "./views/CommingSoon";
import WebLogin from "./views/WebLogin";
import WebRegistro from "./views/WebRegistro";
import WebBlog from "./views/WebBlog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="Weblogin" element={<WebLogin />} />
          <Route path="WebRegistro" element={<WebRegistro />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Chat />} />
            <Route path="/busqueda" element={<WebBuscador />} />
            <Route path="/noticias" element={<WebNoticias />} />
            <Route path="/blog" element={<WebBlog />} />
            <Route path="/cursos" element={<CommingSoon />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/create-group/:id" element={<CreateGroup />} />
            <Route path="/pagos" element={<WebPagos />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
