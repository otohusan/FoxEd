import { quizData1 } from "./quizData1";
import { quizData2 } from "./quizData2";
import { toeicStandard } from "./toeicStandard.ts";
import { toeicEntry } from "./toeicEntry.ts";
import { QuizFormat } from "../../type/index.ts";

export const allQuizzes: QuizFormat[] = [
  toeicEntry,
  toeicStandard,
  quizData1,
  quizData2,
];
