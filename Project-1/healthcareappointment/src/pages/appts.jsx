import { useEffect, useState } from "react";
import Form from "../components/form";
import List from "../components/list";

const Appts = ({ apts, onDel, onAdd }) => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem("selDoc"));
    if (d) {
      setDoc(d);
      localStorage.removeItem("selDoc");
    }
  }, []);

  return (
    <>
      <h1>Appointments</h1>

      {doc && <Form doc={doc} onAdd={onAdd} />}

      <List apts={apts} onDel={onDel} />
    </>
  );
};

export default Appts;
