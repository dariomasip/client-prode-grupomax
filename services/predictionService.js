import axios from "axios";
const baseUrl = "http://localhost:3001/api/pronosticos";

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
    .get(baseUrl, config)
    .then(({ data }) => data)
    .catch((error) => console.error(error));

  return request;
};

const save = (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios
    .post(baseUrl, data, config)
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  return request;
};

export default { setToken, getAll, save };
