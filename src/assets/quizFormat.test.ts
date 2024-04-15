import { describe, it, expect } from "vitest";
import { quizzes } from "./quizzes";

describe("QuizFormat", () => {
  it("should not have duplicate questions", () => {
    let someCondition = true; // この条件を動的に変更してテストの挙動を確認
    const uniqueQuestions = new Set(); // 配列とsetのデータ格納の差を利用する

    const questions: string[] = [];
    quizzes.map((quizFormat) => {
      quizFormat.body.map((quiz) => {
        questions.push(quiz.question);
        uniqueQuestions.add(quiz.question);

        // 重複の確認
        if (uniqueQuestions.size !== questions.length) {
          console.log(
            `「${quizFormat.label}」の「${quiz.question}」が重複している`
          );
          // testの失敗を知らせる
          someCondition = false;
          // 序盤に失敗すると、それ以降にサイズに差が生まれて全てエラーになることを防ぐために乱数をsetに追加してる
          const randomNumber = Math.random().toString();
          uniqueQuestions.add(randomNumber);
        }
      });
    });

    expect(someCondition).toBe(true);
  });
});
