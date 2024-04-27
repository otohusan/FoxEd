import { describe, it, expect } from "vitest";
import { quizzes } from "./quizzes";
import { allQuizzes } from "./allQuizData";

const quizCategoryList = [quizzes, allQuizzes];

describe("QuizFormat", () => {
  it("単語データに被りが無いか確認", () => {
    let someCondition = true; // この条件を動的に変更してテストの挙動を確認

    quizCategoryList.map((quizCategory) => {
      const questions: string[] = [];
      const uniqueQuestions = new Set(); // 配列とsetのデータ格納の差を利用する

      quizCategory.map((quizFormat) => {
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
    });

    expect(someCondition).toBe(true);
  });

  it("問題の答えが選択肢に含まれているか", () => {
    let someCondition = true; // この条件を動的に変更してテストの挙動を確認

    quizCategoryList.map((quizCategory) => {
      quizCategory.map((quizFormat) => {
        quizFormat.body.map((quiz) => {
          // 選択肢と答えが適切であるかを判定結果を格納する変数
          let isIncludedOrNot = false;
          // 判定
          quiz.choices.map((choice) => {
            if (choice === quiz.answer) {
              isIncludedOrNot = true;
            }
          });
          // 適切でない場合の処理
          if (!isIncludedOrNot) {
            someCondition = false;
            console.log(
              `${quizFormat.label}の${quiz.question}に適切な答えor選択肢が含まれていない`
            );
          }
        });
      });
    });

    expect(someCondition).toBe(true);
  });
});
