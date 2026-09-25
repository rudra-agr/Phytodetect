import axios from "axios";

export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";
export const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK_API === "true";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

export async function checkApiHealth(): Promise<boolean> {
  if (USE_MOCK_API) return true;
  try {
    await apiClient.get("/", { timeout: 5000 });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return true;
    }
    return false;
  }
}
