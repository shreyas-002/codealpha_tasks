import s from "./list.module.css";

const List = ({ apts, onDel }) => {
  if (!apts.length) return <p className={s.emp}>No appointments yet.</p>;

  const now = new Date();

  return (
    <div className={s.list}>
      <h3>My Appointments</h3>

      {apts.map((a) => {
        const t = new Date(`${a.dt}T${a.tm}`);
        let st = "Upcoming";
        if (t < now) st = "Past";
        else if (t - now < 3600000) st = "Today";

        return (
          <div key={a.id} className={s.itm}>
            <div>
              <p className={s.doc}>{a.doc}</p>
              <p>{a.pt}</p>
              <p>{a.dt} at {a.tm}</p>
              <span className={`${s.badge} ${s[st]}`}>{st}</span>
            </div>

            <button className={s.del} onClick={() => onDel(a.id)}>
              Cancel
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
