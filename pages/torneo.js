import Head from "next/head";
import styles from "../styles/Torneo.module.css";
import flagsData from "../data/flagsData.json";
import Image from "next/image";
import { Match } from "../components/Match/Match";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Participant } from "../components/Participant/Participant";

export default function Torneos() {
  const participants = [
    {
      name: "Ariel Rodriguez",
      points: 58,
      position: 1,
      positionChange: "ascendió",
      differencePosition: 2,
    },
    {
      name: "Ariel Rodriguez",
      points: 47,
      position: 2,
      positionChange: "normal",
      differencePosition: 1,
    },
    {
      name: "Ariel Rodriguez",
      points: 42,
      position: 3,
      positionChange: "descendió",
      differencePosition: 3,
    },
    {
      name: "Ariel Rodriguez",
      points: 33,
      position: 4,
      positionChange: "normal",
      differencePosition: 3,
    },
    {
      name: "Ariel Rodriguez",
      points: 32,
      position: 5,
      positionChange: "normal",
      differencePosition: 3,
    },
    {
      name: "Ariel Rodriguez",
      points: 24,
      position: 6,
      positionChange: "normal",
      differencePosition: 3,
    },
  ];

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
            <strong>{participants.length}</strong>
          </div>
          <div className={styles.details__torneo__detail}>
            <small>Puntos en total</small>
            <strong>647</strong>
          </div>
          <div className={styles.details__torneo__detail}>
            <small>Finaliza el</small>
            <strong>12/09</strong>
          </div>
        </div>
        <div className={styles.contenedor__participants}>
          <table>
            <tbody>
              {participants.map((participant) => {
                return (
                  <Participant
                    participant={participant}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
