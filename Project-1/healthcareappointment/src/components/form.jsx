import { useState } from "react";
import s from "./form.module.css";

const Form = ({ doc, onAdd }) => {
  const [pt, setPt] = useState("");
  const [dt, setDt] = useState("");
  const [tm, setTm] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const sub = (e) => {
    e.preventDefault();

    if (!pt || !dt || !tm) return;
    if (dt < today) return;

    onAdd({
      id: Date.now(),
      doc: doc.nm,
      sp: doc.sp,
      pt,
      dt,
      tm,
    });

    setPt("");
    setDt("");
    setTm("");
  };

  return (
    <form className={s.frm} onSubmit={sub}>
      <h3 className={s.h3}>
        Book Appointment with <span>{doc.nm}</span>
      </h3>

      <input
        className={s.inp}
        type="text"
        placeholder="Patient Name"
        value={pt}
        onChange={(e) => setPt(e.target.value)}
        required
      />

      <input
        className={s.inp}
        type="date"
        min={today}
        value={dt}
        onChange={(e) => setDt(e.target.value)}
        required
      />

      <input
        className={s.inp}
        type="time"
        value={tm}
        onChange={(e) => setTm(e.target.value)}
        required
      />

      <button className={s.btn} type="submit">
        Confirm Appointment
      </button>
    </form>
  );
};

export default Form;
