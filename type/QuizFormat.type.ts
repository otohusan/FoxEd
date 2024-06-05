import { Quiz } from "./Quiz.type";

interface Flashcard {
  ID: string;
  StudySetID: string;
  Question: string;
  Answer: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export type QuizFormat = {
  id?: string;
  label: string;
  user_id?: string;
  body: Quiz[] | Flashcard[];
};
