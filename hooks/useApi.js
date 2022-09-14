import axios from "axios";
import React, { useEffect, useState } from "react";

const useApi = (url) => {
  const [data, getData] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((response) => getData(response.data));
  }, [url]);

  return [data];
};

export default useApi;
