import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {};
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error) => {
    if (error instanceof AxiosError) {
      let errorMessage = "something wrong from server";
      if (error && error.message) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }
);
