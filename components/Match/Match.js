import useApi from "../../hooks/useApi";
import styles from "./Match.module.css";
import moment from "moment";
import { format, render, cancel, register } from "timeago.js";
import locale from "../../helpers/timeAgo";
import { useState } from "react";
moment().format();

const Match = ({ flags, match, prediction }) => {
  const [isViewTimeLeft, setViewTimeLeft] = useState(false);
  const [isEditPredict, setEditPredict] = useState(false);
  
  prediction = 1

  return (
    <div className={styles.contenedor}>
      {isViewTimeLeft ? (
        <span
          className={styles.contenedor__date}
          onClick={() => setViewTimeLeft(false)}
        >
          {format(moment.utc(match.utcDate).local().format(), "es_ES")}
        </span>
      ) : (
        <span
          className={styles.contenedor__date}
          onClick={() => setViewTimeLeft(true)}
        >
          {moment.parseZone(match.utcDate).local().format("DD/MM")} •{" "}
          {moment.parseZone(match.utcDate).local().format("HH:mm")}
        </span>
      )}

      <div className={styles.contenedor__teamsScores}>
        <div className={styles.contenedor__teamsScores__team}>
          <img
            className={styles.contenedor__teamsScores__team__flag}
            src={flags.home?.crestUrl}
            alt={`Bandera de ${match.homeTeam.name}`}
          />
          <span className={styles.contenedor__teamsScores__team__team}>
            {match.homeTeam.name}
          </span>
        </div>
        <div className={styles.contenedor__teamsScores__score}>
          <span className={styles.contenedor__teamsScores__score__text}>
            {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
          </span>
        </div>
        <div className={styles.contenedor__teamsScores__team}>
          <img
            className={styles.contenedor__teamsScores__team__flag}
            src={flags.away?.crestUrl}
            alt={`Bandera de ${match.awayTeam.name}`}
          />
          <span className={styles.contenedor__teamsScores__team__team}>
            {match.awayTeam.name}
          </span>
        </div>
      </div>
      <div className={styles.contenedor__predictResult}>
        {
          !isEditPredict
            ? <div className={styles.contenedor__predictResult__actions}>
            <div onClick={() => setEditPredict(true)} className={styles.contenedor__predictResult__actions__action}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
              />
              <span class="material-symbols-outlined">edit</span>
              <span
                className={
                  styles.contenedor__predictResult__actions__action__text
                }
              >
                Editar
              </span>
            </div>
          </div>
          : <div className={styles.contenedor__predictResult__actions}>
          <div onClick={() => setEditPredict(false)} className={styles.contenedor__predictResult__actions__action}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <span class="material-symbols-outlined">check</span>
            <span
              className={
                styles.contenedor__predictResult__actions__action__text
              }
            >
              Confirmar
            </span>
          </div>
        </div>
        }
        

        <div className={styles.contenedor__predictResult__pronostico}>
          <span className={styles.contenedor__predictResult__pronostico__title}>
            Tu pronóstico
          </span>
          {isEditPredict ? (
            <div
              className={
                styles.contenedor__predictResult__pronostico__scoreEditable
              }
            >
              <div
                className={
                  styles.contenedor__predictResult__pronostico__scoreEditable__inputContenedor
                }
              >
                <input
                  className={
                    styles.contenedor__predictResult__pronostico__scoreEditable__inputContenedor__input
                  }
                  defaultValue="0"
                  type="text"
                />
              </div>
              <div
                className={
                  styles.contenedor__predictResult__pronostico__scoreEditable__inputContenedor
                }
              >
                <span>-</span>
              </div>
              <div
                className={
                  styles.contenedor__predictResult__pronostico__scoreEditable__input
                }
              >
                <input
                  className={
                    styles.contenedor__predictResult__pronostico__scoreEditable__inputContenedor__input
                  }
                  defaultValue="1"
                  type="text"
                />
              </div>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
              <span onClick={() => setEditPredict(false)} class="material-symbols-outlined">
                close
              </span>
            </div>
          ) : (
            <span
              className={styles.contenedor__predictResult__pronostico__score}
            >
              0 - 1
            </span>
          )}
        </div>
        <div className={styles.contenedor__predictResult__result}>
          <span className={styles.contenedor__predictResult__result__points}>
            3
          </span>
          <span className={styles.contenedor__predictResult__pronostico__title}>
            Puntos
          </span>
        </div>
      </div>
    </div>
  );
};

export { Match };
