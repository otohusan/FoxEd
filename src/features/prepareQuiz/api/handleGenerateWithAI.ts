import axios from "axios";

async function handleGenerateWithAI(prompt: string) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("ログインしてね");
    return;
  }

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const response = await axios.post(
    `${BASE_BACKEND_URL}/flashcards/generate`,
    {
      question: prompt,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  return response;
}

export default handleGenerateWithAI;
