import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "../store/store"; // Importez le store Zustand

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetchEmploye(query) {
  const setEmployeeData = useAuthStore((state) => state.setEmployeeData); // Récupère la fonction pour les données d'employés
  const [getData, setData] = useState({
    isLoading: false,
    employeeData: undefined, // Utilisez "employeeData" ici pour différencier des autres données
    status: null,
    serverError: null,
  });

  const fetchData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, status } = await axios.get(`/api/${query}`);
      setEmployeeData(data); // Mettre à jour le store avec les données de l'employé

      setData((prev) => ({
        ...prev,
        employeeData: data,
        status: status,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Fetch Error:", error);
      setData((prev) => ({
        ...prev,
        isLoading: false,
        serverError: error,
      }));
    }
  }, [query, setEmployeeData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [getData, setData];
}
