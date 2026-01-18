import { NavLink, useNavigate } from "react-router-dom";
import s from "./navbar.module.css";

const Nav = () => {
  const nav = useNavigate();

  const out = () => {
    localStorage.removeItem("usr");
    nav("/login");
  };

  return (
    <header className={s.nav}>
      <div className={s.box}>
        <h2 className={s.logo}>🩺 DocCare</h2>

        <nav className={s.links}>
          <NavLink to="/home" className={s.lk}>Home</NavLink>
          <NavLink to="/appointments" className={s.lk}>Appointments</NavLink>
          <NavLink to="/profile" className={s.lk}>Profile</NavLink>
          <button className={s.out} onClick={out}>Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
