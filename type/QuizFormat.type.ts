import { Quiz, Flashcard } from "./index";

export type QuizFormat = {
  id?: string;
  user_id?: string;
  label: string;
  description?: string;
  body: Quiz[] | Flashcard[];
};
