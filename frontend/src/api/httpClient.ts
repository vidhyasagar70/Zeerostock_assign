import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiErrorPayload } from "../types/inventory";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || "/api";

const createRequestId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set("x-request-id", createRequestId());
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Request failed. Please try again.";

    return Promise.reject(new Error(message));
  }
);

export { apiClient };
