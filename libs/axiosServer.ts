import "server-only";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "@/env";
import { decryptToken } from "@/libs/cryptoToken";

const axiosServer = axios.create({
  baseURL: ENV.API_BASE_URL,
});

axiosServer.interceptors.request.use(
  (config) => {
    // Headers par défaut pour toutes les requêtes
    if (!config.headers["Accept"]) {
      config.headers["Accept"] = "application/json";
    }

    // Content-Type pour les requêtes avec body
    if (["post", "put", "patch"].includes(config.method || "")) {
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosServer.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
const DEFAULT_METHOD: Method = "GET";

/**
 * Call an API endpoint with Bearer token authentication.
 * @param token - Bearer token for authentication
 * @param endpoint - API endpoint to call
 * @param data - Data to send in the request body (for POST/PUT/PATCH)
 * @param method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param withAuth - Whether to include the token in the headers
 * @param customHeaders - Custom headers to include in the request
 */
export const callApiWithToken = async <T = unknown>(
  token: string,
  endpoint: string,
  data?: unknown,
  method: Method = DEFAULT_METHOD,
  withAuth: boolean = true,
  customHeaders?: Record<string, string>
): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    headers: {
      ...customHeaders, // Headers personnalisés
    },
  };

  if (withAuth) {
    const decryptedToken = await decryptToken(token);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${decryptedToken}`,
    };
  }

  // Only include data for methods that support a body
  if (["POST", "PUT", "PATCH"].includes(method) && data !== undefined) {
    config.data = data;
  }

  try {
    const response: AxiosResponse<T> = await axiosServer(config);
    return response.data;
  } catch (error) {
    // Optionally, add more error context here
    throw error;
  }
};

export default axiosServer;
