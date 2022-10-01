import Head from "next/head";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import loginService from "../services/loginService";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/Context";
import matchService from "../services/matchService";
import predictionService from "../services/predictionService";

export default function Login() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const userString = JSON.parse(loggedUserJSON);
      if (userString) {
        router.push("/pronosticos");
      }
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const user = await loginService.login({
      username,
      password,
    });
    console.log("🚀 ~ file: login.js ~ line 38 ~ handleLogin ~ user", user);
    matchService.setToken(user.token);
    predictionService.setToken(user.token);
    setUser(user);
    if (user) {
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      router.push("/pronosticos");
    }
  };

  return (
    <>
      <Head>
        <title>Iniciar sesión | Prode Grupo Max</title>
      </Head>
      <form onSubmit={handleLogin} className={styles.form}>
        <legend>Iniciar sesión</legend>
        <div className={styles.form__contenedorInput}>
          <label
            className={styles.form__contenedorInput__label}
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={styles.form__contenedorInput__input}
            type="password"
            name="password"
            id="password"
          />
        </div>
        {isLoading ? (
          <button
            onClick={() => setLoading(false)}
            className={styles.buttonLoading}
            type="submit"
          >
            Iniciando sesión...
          </button>
        ) : (
          <button className={styles.form__submit} type="submit">
            Iniciar sesión
          </button>
        )}
      </form>
    </>
  );
}
