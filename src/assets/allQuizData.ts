import { toeicStandard } from "./toeicStandard.ts";
import { toeicEntry } from "./toeicEntry.ts";
import { QuizFormat } from "../../type/index.ts";

export const allQuizzes: QuizFormat[] = [toeicEntry, toeicStandard];
