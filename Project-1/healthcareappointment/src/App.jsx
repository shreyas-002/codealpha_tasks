import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Appts from "./pages/appts";

import s from "./App.module.css";

const App = () => {
  const [apts, setApts] = useState([]);

  const usr = JSON.parse(localStorage.getItem("usr"));

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem("apts"));
    if (d) setApts(d);
  }, []);

  useEffect(() => {
    localStorage.setItem("apts", JSON.stringify(apts));
  }, [apts]);

  const add = (a) => {
    setApts([...apts, a]);
  };

  const del = (id) => {
    setApts(apts.filter((a) => a.id !== id));
  };

  return (
    <BrowserRouter>
      {usr && <Nav />}

      <main className={s.main}>
        <Routes>
          <Route
            path="/"
            element={usr ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={usr ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={usr ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/appointments"
            element={
              usr ? (
                <Appts apts={apts} onAdd={add} onDel={del} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
