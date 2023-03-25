import api from "@/api/api";
import { sortBy } from "lodash";
import styles from "./page.module.css";

type Props = {
  params: {
    code: string;
  };
};

const days = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 6,
};

export default async function Subject({ params: { code } }: Props) {
  const subject: any = await api.subject.one(
    `http://academica.psi.uba.ar/Psi/Ver154_.php?catedra=${code}`
  );

  const orderedSubjectByDay = sortBy(subject.practical, (p) => days[p.day], [
    "asc",
  ]);

  return (
    <div>
      <h1> {subject.description} </h1>
      <h2> Alternativas </h2>
      <div>
        {Object.entries(orderedSubjectByDay).map(([_, value], key) => {
          const theory = subject.theory[value.theoryKey];
          const seminar = subject.seminar[value.seminarKey];

          return (
            <div className={styles.box} key={key}>
              <p>{`Vacantes: ${value.slots}`}</p>
              <p>{`Practico: (${value.key}) ${value.day} ${value.start}-${value.end}`}</p>
              <p>{`Teoria: (${theory.key}) ${theory.day} ${theory.start}-${theory.end}`}</p>
              {seminar && (
                <p>{`Seminario: (${seminar.key}) ${seminar.day} ${seminar.start}-${seminar.end}`}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
