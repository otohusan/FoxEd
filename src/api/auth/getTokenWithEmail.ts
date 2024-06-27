import axios from "axios";

async function getTokenWithEmail(
  email: string,
  password: string
): Promise<string> {
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const response = await axios.post(`${BASE_BACKEND_URL}/users/login/email`, {
    Email: email,
    Password: password,
  });

  return response.data.token;
}

export default getTokenWithEmail;
