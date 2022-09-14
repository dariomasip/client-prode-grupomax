import Head from "next/head";
import flagsData from "../data/flagsData.json";
import Image from "next/image";
import { Match } from "../components/Match/Match";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import styles from "../styles/Pronosticos.module.css";

export default function Pronosticos() {
  const [matchesApi] = useApi("http://localhost:3001/api/partidos");
  const [predictionsUser] = useApi("http://localhost:3001/pronosticos");

  const [matches, setMatches] = useState([]);
  console.log(
    "🚀 ~ file: pronosticos.js ~ line 15 ~ Pronosticos ~ matches",
    matches
  );
  const [currentJornada, setCurrentJornada] = useState(1);

  useEffect(() => {
    setMatches(
      matchesApi.filter((match) =>
        match
          ? match.matchday === currentJornada
          : match.stage === currentJornada
      )
    );
  }, [currentJornada, matchesApi]);

  return (
    <>
      <Head>
        <title>Pronosticos | Prode Grupo Max</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Mis pronósticos</h1>
        <div className={styles.header__filters}>
          <ul className={styles.header__filters__listItems}>
            <li
              onClick={() => setCurrentJornada(1)}
              className={`${
                currentJornada === 1
                  ? styles.header__filters__listItems__itemListActive
                  : styles.header__filters__listItems__itemList
              }`}
            >
              Fecha 1
            </li>
            <li
              onClick={() => setCurrentJornada(2)}
              className={`${
                currentJornada === 2
                  ? styles.header__filters__listItems__itemListActive
                  : styles.header__filters__listItems__itemList
              }`}
            >
              Fecha 2
            </li>
            <li
              onClick={() => setCurrentJornada(3)}
              className={`${
                currentJornada === 3
                  ? styles.header__filters__listItems__itemListActive
                  : styles.header__filters__listItems__itemList
              }`}
            >
              Fecha 3
            </li>
            <li
              onClick={() => setCurrentJornada("LAST_16")}
              className={`${
                currentJornada === "LAST_16"
                  ? styles.header__filters__listItems__itemListActive
                  : styles.header__filters__listItems__itemList
              }`}
            >
              16vos
            </li>
            <li
              onClick={() => setCurrentJornada("LAST_8")}
              className={styles.header__filters__listItems__itemList}
            >
              Octavos
            </li>
            <li
              onClick={() => setCurrentJornada(1)}
              className={styles.header__filters__listItems__itemList}
            >
              Cuartos
            </li>
            <li
              onClick={() => setCurrentJornada(1)}
              className={styles.header__filters__listItems__itemList}
            >
              Semifinal
            </li>
            <li
              onClick={() => setCurrentJornada(1)}
              className={styles.header__filters__listItems__itemList}
            >
              3er puesto
            </li>
            <li
              onClick={() => setCurrentJornada(1)}
              className={styles.header__filters__listItems__itemList}
            >
              Final
            </li>
          </ul>
        </div>
      </header>
      {matches.map((match) => {
        const flagsFilter = {
          home: flagsData.filter((data) => data.id === match.homeTeam.id)[0],
          away: flagsData.filter((data) => data.id === match.awayTeam.id)[0],
        };

        const prediction = predictionsUser[0]?.predictions.filter(
          (data) => data.match?.id === match?.id
        );

        const predictionUser = {
          home: prediction ? prediction[0]?.score.homeTeam : null,
          away: prediction ? prediction[0]?.score.awayTeam : null,
          result: prediction ? prediction[0]?.result : null,
        };

        return (
          <Match
            flags={flagsFilter}
            match={match}
            prediction={predictionUser}
          />
        );
      })}
    </>
  );
}
