import axios, { AxiosError } from "axios";
import type {InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "https://travelblog.skillbox.cc";

export const api = axios.create({
  baseURL:BASE_URL,
});

// Работа с токеном

const getToken = () => localStorage.getItem("token");

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

// REQUEST INTERCEPTOR

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// RESPONSE INTERCEPTOR

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // токен истёк или невалидный
      setAuthToken(null);

      // // редирект на логин
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);