import Head from "next/head";
import styles from "../styles/Torneo.module.css";
import flagsData from "../data/flagsData.json";
import { Match } from "../components/Match/Match";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Participant } from "../components/Participant/Participant";
import torneoService from "../services/torneoService";
import { useAppContext } from "../contexts/Context";

export default function Torneos() {
  const { user } = useAppContext;

  const [torneoData, setToneoData] = useState();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    torneoService.getAll().then((initialTorneo) => {
      setToneoData(initialTorneo);
      setParticipants(
        initialTorneo?.participants.sort((a, b) => {
          if (a.position > b.position) {
            return 1;
          }
          if (a.position < b.position) {
            return -1;
          }
          return 0;
        })
      );
    });
  }, [user]);

  return (
    <>
      <Head>
        <title>Torneo | Prode Grupo Max</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Torneo</h1>
      </header>
      <div className={styles.contenedor}>
        <div className={styles.details__torneo}>
          <div className={styles.details__torneo__detail}>
            <small>Participantes</small>
            <strong>{participants?.length}</strong>
          </div>
          <div className={styles.details__torneo__detail}>
            <small>Puntos en total</small>
            <strong>{torneoData?.points}</strong>
          </div>
          <div className={styles.details__torneo__detail}>
            <small>Finaliza el</small>
            <strong>12/09</strong>
          </div>
        </div>
        <div className={styles.contenedor__participants}>
          <table>
            <tbody>
              {participants?.map((participant, key) => {
                return <Participant key={key} participant={participant} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
