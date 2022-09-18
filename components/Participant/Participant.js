import styles from "./Participant.module.css";

const Participant = ({ participant }) => {
  return (
    <tr className={styles.rowParticipant}>
      {participant.positionChange !== "normal" ? (
        participant.positionChange === "ascendió" ? (
          <>
            <td className={styles.positionState}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
              />
              <span
                class="material-symbols-outlined"
                className={`material-symbols-outlined ${styles.positionState__iconAscendio}`}
              >
                arrow_drop_up
              </span>
              <span
                className={styles.positionState__differencePositionAscendio}
              >
                +{participant.differencePosition}
              </span>
            </td>
          </>
        ) : (
          <>
            <td className={styles.positionState}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
              />
              <span
                className={styles.positionState__differencePositionDescendio}
              >
                -{participant.differencePosition}
              </span>
              <span
                class="material-symbols-outlined"
                className={`material-symbols-outlined ${styles.positionState__iconDescendio}`}
              >
                arrow_drop_down
              </span>
            </td>
          </>
        )
      ) : (
        <td>&nbsp;</td>
      )}
      <td className={styles.participantPosition}>{participant.position}</td>
      <td className={styles.participantName}>{participant.name}</td>
      <td className={styles.participantPoints}>
        <div className={styles.participantPoints__pointer}>
          <strong>{participant.points}</strong>
          <small>Puntos</small>
        </div>
      </td>
    </tr>
  );
};

export { Participant };
