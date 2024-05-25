import { describe, it, expect } from "vitest";
import returnNextQuizIndex from "./returnNextQuizIndex";

describe("returnNextQuizIndex", () => {
  it("範囲内であればnextを足した値を返す", () => {
    const quizIndex = 3;
    const quizSize = 5;
    const next = 1;

    const result = returnNextQuizIndex(quizIndex, quizSize, next);

    expect(result).toBe(4);
  });

  it("クイズのサイズを超えれば0を返す", () => {
    const quizIndex = 4;
    const quizSize = 5;
    const next = 1;

    const result = returnNextQuizIndex(quizIndex, quizSize, next);

    expect(result).toBe(0);
  });

  it("マイナスの値になればクイズのサイズ-1を返す", () => {
    const quizIndex = 0;
    const quizSize = 5;
    const next = -1;

    const result = returnNextQuizIndex(quizIndex, quizSize, next);

    expect(result).toBe(4);
  });
});
