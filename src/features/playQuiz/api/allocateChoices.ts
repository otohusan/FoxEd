import { Quiz } from "../../../../type";
import { generateRandomInteger, shuffleArray } from "../../../api";

function allocateChoices(
  quizLength: number,
  quizIndex: number,
  quizTrueAnswer: string,
  quizzes: Quiz[]
): string[] {
  // クイズの総量が5未満だとダミー問題が作れなくて無限ループになるから
  if (quizLength < 5) {
    return [];
  }

  const res: string[] = [];
  res.push(quizTrueAnswer);

  // 選択肢が4つ出来るまで、配列に追加
  while (res.length < 4) {
    const randomInt = generateRandomInteger(0, quizLength - 1);
    // 同じ回答が追加されないように
    if (randomInt == quizIndex || res.includes(quizzes[randomInt].answer))
      continue;

    res.push(quizzes[randomInt].answer);
  }

  return shuffleArray(res);
}

export default allocateChoices;
