import { useState } from "react";
import DrBox from "../components/drbox";
import s from "../App.module.css";

const specs = [
  {
    sp: "Cardiology",
    docs: [
      { id: 4, nm: "Dr. Anil Mehra", exp: "12 yrs" },
      { id: 5, nm: "Dr. Kavita Joshi", exp: "9 yrs" }
    ]
  },
  {
    sp: "Dermatology",
    docs: [
      { id: 6, nm: "Dr. Ritu Malhotra", exp: "8 yrs" },
      { id: 7, nm: "Dr. Sameer Jain", exp: "6 yrs" }
    ]
  },
  {
    sp: "ENT",
    docs: [
      { id: 15, nm: "Dr. Rakesh Bansal", exp: "13 yrs" }
    ]
  },
  {
    sp: "General Physician",
    docs: [
      { id: 1, nm: "Dr. Suresh Iyer", exp: "15 yrs" },
      { id: 2, nm: "Dr. Meenal Patil", exp: "10 yrs" },
      { id: 3, nm: "Dr. Rajiv Menon", exp: "18 yrs" }
    ]
  },
  {
    sp: "Gynecology",
    docs: [
      { id: 13, nm: "Dr. Pooja Nair", exp: "11 yrs" },
      { id: 14, nm: "Dr. Shalini Verma", exp: "8 yrs" }
    ]
  },
  {
    sp: "Neurology",
    docs: [
      { id: 10, nm: "Dr. Rohit Sengupta", exp: "15 yrs" }
    ]
  },
  {
    sp: "Ophthalmology",
    docs: [
      { id: 16, nm: "Dr. Vinay Kulkarni", exp: "12 yrs" }
    ]
  },
  {
    sp: "Orthopedics",
    docs: [
      { id: 8, nm: "Dr. Arjun Khanna", exp: "14 yrs" },
      { id: 9, nm: "Dr. Neha Kapoor", exp: "10 yrs" }
    ]
  },
  {
    sp: "Pediatrics",
    docs: [
      { id: 11, nm: "Dr. Ananya Bose", exp: "9 yrs" },
      { id: 12, nm: "Dr. Kunal Shah", exp: "7 yrs" }
    ]
  },
  {
    sp: "Psychiatry",
    docs: [
      { id: 17, nm: "Dr. Sneha Mukherjee", exp: "10 yrs" }
    ]
  }
].sort((a, b) => a.sp.localeCompare(b.sp));

const Home = () => {
  const [flt, setFlt] = useState("All");

  const list =
    flt === "All" ? specs : specs.filter((g) => g.sp === flt);

  return (
    <>
      <h1>Select a Doctor</h1>

      <div style={{ margin: "1.5rem 0" }}>
        <label style={{ marginRight: "0.6rem", fontWeight: 500 }}>
          Filter by Specialization:
        </label>

        <select
          value={flt}
          onChange={(e) => setFlt(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        >
          <option value="All">All</option>
          {specs.map((g) => (
            <option key={g.sp} value={g.sp}>
              {g.sp}
            </option>
          ))}
        </select>
      </div>

      {list.map((g) => (
        <section key={g.sp} style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ color: "#1e88e5", marginBottom: "1rem" }}>
            {g.sp}
          </h2>

          <div className={s.grid}>
            {g.docs.map((d) => (
              <DrBox
                key={d.id}
                doc={{ ...d, sp: g.sp }}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default Home;
