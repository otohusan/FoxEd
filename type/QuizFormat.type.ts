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
  user_id?: string;
  label: string;
  body: Quiz[] | Flashcard[];
};
