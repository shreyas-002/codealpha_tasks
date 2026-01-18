import { useNavigate } from "react-router-dom";
import s from "./drbox.module.css";

const DrBox = ({ doc }) => {
  const nav = useNavigate();

  const book = () => {
    localStorage.setItem("selDoc", JSON.stringify(doc));
    nav("/appointments");
  };

  return (
    <div className={s.card}>
      <h3>{doc.nm}</h3>
      <p>{doc.sp}</p>
      <p>{doc.exp} experience</p>

      <button className={s.btn} onClick={book}>
        Book Appointment
      </button>
    </div>
  );
};

export default DrBox;
