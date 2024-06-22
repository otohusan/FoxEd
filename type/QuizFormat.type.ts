import { Quiz, Flashcard } from "./index";

export type QuizFormat = {
  id?: string;
  user_id?: string;
  label: string;
  description?: string;
  created_at: string;
  updated_at: string;
  body: Quiz[] | Flashcard[];
};
