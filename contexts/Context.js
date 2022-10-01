import React, { useContext, createContext } from "react";
import matchService from "../services/matchService";
import predictionService from "../services/predictionService";
import torneoService from "../services/torneoService";

//Context
export const AppContext = createContext(null);
//Provider
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = React.useState("");

  //ComponentDidMouunt
  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userJSON = JSON.parse(loggedUserJSON);
      console.log(
        "🚀 ~ file: Context.js ~ line 16 ~ React.useEffect ~ userJSON",
        userJSON
      );

      predictionService.setToken(userJSON.token);
      matchService.setToken(userJSON.token);
      torneoService.setToken(userJSON.token);

      setUser(userJSON);
    }
  }, []);

  //
  const values = React.useMemo(
    () => ({
      user, // States que seran visibles en el contexto.
      setUser, // Funciones que son exportadas para manejo externo.
    }),
    [user]
  ); // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export default useAppContext;
