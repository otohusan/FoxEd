import { Flashcard } from "./index";

export type StudySet = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  flashcards: Flashcard[];
};
