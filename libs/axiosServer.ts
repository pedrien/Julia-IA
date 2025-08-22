import "server-only";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "@/env";
import { decryptToken } from "@/libs/cryptoToken";

const axiosServer = axios.create({
  baseURL: ENV.API_BASE_URL,
});

axiosServer.interceptors.request.use(
  (config) => {
    if (config.method === "post" || config.method === "put") {
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
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
 */
export const callApiWithToken = async <T = unknown>(
  token: string,
  endpoint: string,
  data?: unknown,
  method: Method = DEFAULT_METHOD,
  withAuth: boolean = true
): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    headers: {},
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
