import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { getUsername } from "../helper/helper";
import { useAuthStore } from "../store/store"; // Importez le store Zustand

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  const setApiData = useAuthStore((state) => state.setApiData); // Récupère la fonction pour mettre à jour les données dans Zustand

  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      const { username } = !query ? await getUsername() : '';
      const { data, status } = await axios.get(`/api/user/${username}`);

      if (status === 200 || status === 201) {
        setApiData(data); // Utilise `setApiData` pour stocker les données dans Zustand

        setData((prev) => ({
          ...prev,
          apiData: data,
          status: status,
          isLoading: false,
        }));
      } else {
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setData((prev) => ({
        ...prev,
        isLoading: false,
        serverError: error,
      }));
    }
  }, [query, setApiData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [getData, setData];
}
