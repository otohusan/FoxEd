import { quizData1 } from "./quizData1";
import { quizData2 } from "./quizData2";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
  partOfSpeech: number;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

export const allQuizzes: QuizFormat[] = [quizData1, quizData2];
