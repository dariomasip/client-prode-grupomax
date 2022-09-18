import Head from "next/head";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";

export default function Login() {
  return (
    <>
      <Head>
        <title>Iniciar sesión | Prode Grupo Max</title>
      </Head>
      <form className={styles.form}>
        <legend>Iniciar sesión</legend>
        <div className={styles.form__contenedorInput}>
          <label
            className={styles.form__contenedorInput__label}
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            className={styles.form__contenedorInput__input}
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className={styles.form__contenedorInput}>
          <label
            className={styles.form__contenedorInput__label}
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className={styles.form__contenedorInput__input}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button className={styles.form__submit} type="submit">
          Iniciar sesión
        </button>
      </form>
    </>
  );
}
