// lib/api.ts — questo file lo scrivi una volta sola
import axios from "axios";

const API_BASE = process.env.API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: `${API_BASE}`,
  withCredentials: true, // sostituisce "credentials: include" ovunque
});

// questo intercettore "guarda" ogni singola risposta di OGNI chiamata
// fatta con "api." in tutta l'app, automaticamente
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await api.post("/auth/refresh");
      return api(error.config); // ritenta la chiamata che ha fallito
    }
    return Promise.reject(error);
  }
);