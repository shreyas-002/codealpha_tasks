import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./login.module.css";

const Login = () => {
  const [nm, setNm] = useState("");
  const nav = useNavigate();

  const sub = (e) => {
    e.preventDefault();

    if (!nm.trim()) return;

    localStorage.setItem(
      "usr",
      JSON.stringify({ nm })
    );

    nav("/home");
  };

  return (
    <div className={s.wrap}>
      <form className={s.box} onSubmit={sub}>
        <h1 className={s.h1}>Login to DocCare</h1>
        <p className={s.p}>Enter your name to continue</p>

        <input
          className={s.inp}
          type="text"
          placeholder="Your full name"
          value={nm}
          onChange={(e) => setNm(e.target.value)}
        />

        <button className={s.btn}>Continue</button>
      </form>
    </div>
  );
};

export default Login;
