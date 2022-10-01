import Head from "next/head";
import flagsData from "../data/flagsData.json";
import { Match } from "../components/Match/Match";
import { useEffect, useState } from "react";
import styles from "../styles/Pronosticos.module.css";
import matchService from "../services/matchService";
import predictionService from "../services/predictionService";
import { useAppContext } from "../contexts/Context";

export default function Pronosticos() {
  const { user } = useAppContext;
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const [currentJornada, setCurrentJornada] = useState(null);
  const [isChangedJornada, setChangedJornada] = useState(false);

  useEffect(() => {
    matchService.getAll().then((initialMatches) => {
      setMatches(initialMatches);
    });
    predictionService.getAll().then((initialPredictions) => {
      setPredictions(initialPredictions);
    });
  }, [user]);

  useEffect(() => {
    matchService
      .getAll()
      .then((initialMatches) => {
        setMatches(
          initialMatches.filter((match) =>
            match
              ? match.matchday === currentJornada
              : match.stage === currentJornada
          )
        );
      })
      .then(
        setChangedJornada(true),
        setTimeout(() => {
          setChangedJornada(false);
        }, 30)
      );

    predictionService.getAll().then((initialPredictions) => {
      setPredictions(initialPredictions);
    });
  }, [currentJornada]);

  useEffect(() => {
    !currentJornada && setCurrentJornada(matches[0]?.season?.currentMatchday);
  }, [matches]);

  return (
    <>
      <Head>
        <title>Pronósticos | Prode Grupo Max</title>
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
      <div
        className={`
        ${isChangedJornada ? styles.contenedor : styles.contenedorFadeIn}
      `}
      >
        {matches.map((match, key) => {
          const flagsFilter = {
            home: flagsData.filter((data) => data.id === match.homeTeam.id)[0],
            away: flagsData.filter((data) => data.id === match.awayTeam.id)[0],
          };

          const predictionFilter = predictions?.filter(
            (prediction) => prediction?.match?.id === match.id
          )[0];

          return (
            <Match
              key={key}
              currentJornada={currentJornada}
              flags={flagsFilter}
              match={match}
              prediction={predictionFilter}
            />
          );
        })}
      </div>
    </>
  );
}
