import axios from "axios";
const baseUrl = "http://localhost:3001/api/partidos";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios
    .get(baseUrl)
    .then(({ data }) => data)
    .catch((error) => console.error(error));
  return request;
};

export default { setToken, getAll, token };
