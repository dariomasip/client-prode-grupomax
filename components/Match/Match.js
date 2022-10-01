import styles from "./Match.module.css";
import moment from "moment";
import { format, render, cancel, register } from "timeago.js";
import locale from "../../helpers/timeAgo";
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/Context";
import predictionService from "../../services/predictionService";
moment().format();

const Match = ({ flags, match, prediction, currentJornada }) => {
  const { user } = useAppContext();
  const { token } = user;

  const [isViewTimeLeft, setViewTimeLeft] = useState(false);
  const [isEditPredict, setEditPredict] = useState(false);
  const [editPrediction, setEditPrediction] = useState({});

  useEffect(() => {
    setEditPrediction({
      home: prediction?.score?.homeTeam ? prediction?.score?.homeTeam : null,
      away: prediction?.score?.awayTeam ? prediction?.score?.awayTeam : null,
    });
  }, [prediction, currentJornada]);

  const handlePredict = (e) => {
    setEditPrediction({ ...editPrediction, [e.target.name]: e.target.value });
  };

  const savePredicts = () => {
    predictionService.save({
      idMatch: match.id,
      homeTeam: editPrediction?.home,
      awayTeam: editPrediction?.away,
    });
    setEditPredict(false);
  };

  return (
    <div className={styles.contenedor}>
      {match?.status === "IN_LIVE" ? (
        <div className={styles.contenedor__date}>
          <span className={styles.contenedor__dateInLive}>En vivo</span>
          <div className={styles.contenedor__date__animation}></div>
        </div>
      ) : isViewTimeLeft && match?.status === "SCHEDULED" ? (
        <span
          className={styles.contenedor__date}
          onClick={() => setViewTimeLeft(false)}
        >
          {format(moment.utc(match?.utcDate).local().format(), "es_ES")}
        </span>
      ) : !isViewTimeLeft && match?.status === "SCHEDULED" ? (
        <span
          className={styles.contenedor__date}
          onClick={() => setViewTimeLeft(true)}
        >
          {moment.parseZone(match?.utcDate).local().format("DD/MM")} •{" "}
          {moment.parseZone(match?.utcDate).local().format("HH:mm")}
        </span>
      ) : (
        match?.status === "FINISHED" && (
          <span className={styles.contenedor__date}>
            {format(moment.utc(match.utcDate).local().format(), "es_ES")}
          </span>
        )
      )}

      <div className={styles.contenedor__teamsScores}>
        <div className={styles.contenedor__teamsScores__team}>
          <img
            className={styles.contenedor__teamsScores__team__flag}
            src={flags?.home?.crestUrl}
          />
          <span className={styles.contenedor__teamsScores__team__team}>
            {match?.homeTeam?.name}
          </span>
        </div>
        <div className={styles.contenedor__teamsScores__score}>
          {match?.status !== "SCHEDULED" ? (
            <span className={styles.contenedor__teamsScores__score__text}>
              {match?.score?.fullTime?.homeTeam} -{" "}
              {match?.score?.fullTime?.awayTeam}
            </span>
          ) : (
            <span className={styles.contenedor__teamsScores__score__textVersus}>
              vs.
            </span>
          )}
        </div>
        <div className={styles.contenedor__teamsScores__team}>
          <img
            className={styles.contenedor__teamsScores__team__flag}
            src={flags?.away?.crestUrl}
          />
          <span className={styles.contenedor__teamsScores__team__team}>
            {match?.awayTeam?.name}
          </span>
        </div>
      </div>
      <div className={styles.contenedor__predictResult}>
        {!editPrediction?.home &&
        !editPrediction?.away &&
        !isEditPredict &&
        match?.status === "SCHEDULED" ? (
          <>&nbsp;</>
        ) : !isEditPredict ? (
          <div className={styles.contenedor__predictResult__actions}>
            {match?.status === "IN_LIVE" || match?.status === "FINISHED" ? (
              <div
                className={styles.contenedor__predictResult__actions__action}
              >
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
                />
                <span class="material-symbols-outlined">visibility</span>
                <span
                  className={
                    styles.contenedor__predictResult__actions__action__text
                  }
                >
                  Ver pronósticos
                </span>
              </div>
            ) : match?.status === "SCHEDULED" ? (
              <div
                onClick={() => setEditPredict(true)}
                className={styles.contenedor__predictResult__actions__action}
              >
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
            ) : null}
          </div>
        ) : (
          <div className={styles.contenedor__predictResult__actions}>
            <div
              onClick={() => savePredicts()}
              className={styles.contenedor__predictResult__actions__actionCheck}
            >
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
              />
              <span
                onClick={() => savePredicts}
                class="material-symbols-outlined"
              >
                check
              </span>
            </div>
            <div
              onClick={() => setEditPredict(false)}
              className={styles.contenedor__predictResult__actions__action}
            >
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
              />
              <span
                onClick={() => setEditPredict(false)}
                class="material-symbols-outlined"
              >
                close
              </span>
            </div>
          </div>
        )}
        <div className={styles.contenedor__predictResult__pronostico}>
          {!isEditPredict &&
          !editPrediction?.home &&
          !editPrediction?.away &&
          match?.status === "SCHEDULED" ? (
            <button
              onClick={() => setEditPredict(true)}
              className={styles.contenedor__predictResult__pronostico__button}
            >
              Pronosticar
            </button>
          ) : isEditPredict ? (
            <>
              <span
                className={styles.contenedor__predictResult__pronostico__title}
              >
                Tu pronóstico
              </span>
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
                    autoFocus
                    onChange={handlePredict}
                    className={
                      styles.contenedor__predictResult__pronostico__scoreEditable__inputContenedor__input
                    }
                    defaultValue={editPrediction?.home}
                    type="number"
                    name="home"
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
                    onChange={handlePredict}
                    defaultValue={editPrediction?.away}
                    type="number"
                    name="away"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <span
                className={styles.contenedor__predictResult__pronostico__title}
              >
                Tu pronóstico
              </span>
              <span
                className={styles.contenedor__predictResult__pronostico__score}
              >
                {editPrediction?.home} - {editPrediction?.away}
              </span>
            </>
          )}
        </div>
        <div className={styles.contenedor__predictResult__result}>
          {prediction?.result ? (
            <span className={styles.contenedor__predictResult__result__points}>
              {prediction.result}
            </span>
          ) : (
            <span className={styles.contenedor__predictResult__result__points}>
              -
            </span>
          )}
          <span className={styles.contenedor__predictResult__pronostico__title}>
            Puntos
          </span>
        </div>
      </div>
    </div>
  );
};

export { Match };
