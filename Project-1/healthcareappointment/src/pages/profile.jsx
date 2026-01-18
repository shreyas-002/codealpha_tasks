import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./profile.module.css";

const Profile = () => {
  const nav = useNavigate();
  const u = JSON.parse(localStorage.getItem("usr")) || {};

  const [nm, setNm] = useState(u.name || "");
  const [age, setAge] = useState(u.age || "");
  const [ph, setPh] = useState(u.phone || "");

  const save = () => {
    localStorage.setItem(
      "usr",
      JSON.stringify({ name: nm, age, phone: ph })
    );
    nav("/home");
  };

  return (
    <div className={s.container}>
      <h1>My Profile</h1>

      <input
        className={s.inp}
        placeholder="Full Name"
        value={nm}
        onChange={(e) => setNm(e.target.value)}
      />

      <input
        className={s.inp}
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        className={s.inp}
        placeholder="Phone"
        value={ph}
        onChange={(e) => setPh(e.target.value)}
      />

      <button className={s.btn} onClick={save}>
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
