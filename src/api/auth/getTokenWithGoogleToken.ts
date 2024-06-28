import axios from "axios";

async function getTokenWithGoogleToken(access_token: string): Promise<string> {
  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const response = await axios.post(`${VITE_BASE_BACKEND_URL}/auth/google`, {
    access_token: access_token,
  });

  return response.data.token;
}

export default getTokenWithGoogleToken;
