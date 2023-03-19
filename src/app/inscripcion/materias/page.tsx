import api from "@/api/api";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Inscripcion() {
  const allSubjects: any = await api.subject.all();

  return (
    <div className={styles.grid}>
      {allSubjects.map((item: any, index: number) => (
        <div
          key={index}
          style={{
            margin: "1rem",
            padding: "0.5rem",
            border: "2px solid black",
          }}
        >
          <h3>{`${item.name}(${item.code})`}</h3>
          <p>{item.department}</p>
          <Link href={`inscripcion/materias/${item.code}`}>Ver</Link>
        </div>
      ))}
    </div>
  );
}
