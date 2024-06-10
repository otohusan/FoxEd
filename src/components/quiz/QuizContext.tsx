import React, { createContext, useState, ReactNode } from "react";
import { Quiz } from "../../../type/index";
import { quizData2 } from "../../assets/quizData2";
import { QuizFormat } from "../../../type/index";

interface QuizContextType {
  quizFormat: QuizFormat | null;
  setQuizFormat: React.Dispatch<React.SetStateAction<QuizFormat | null>>;
  currentQuizIndex: number;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (updatedQuiz: Quiz) => void;
  deleteQuiz: (quizId: string) => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizFormat, setQuizFormat] = useState<QuizFormat | null>(quizData2);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  const addQuiz = (quiz: Quiz) => {
    if (quizFormat) {
      // からの場合は新たに追加
      setQuizFormat({
        ...quizFormat,
        body: quizFormat.body ? [...quizFormat.body, quiz] : [quiz],
      });
    }
  };

  const updateQuiz = (updatedQuiz: Quiz) => {
    if (quizFormat) {
      setQuizFormat({
        ...quizFormat,
        body: quizFormat.body.map((quiz) =>
          quiz.id === updatedQuiz.id ? updatedQuiz : quiz
        ),
      });
    }
  };

  const deleteQuiz = (quizId: string) => {
    if (quizFormat) {
      setQuizFormat({
        ...quizFormat,
        body: quizFormat.body.filter((quiz) => quiz.id !== quizId),
      });
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizFormat,
        setQuizFormat,
        currentQuizIndex,
        setCurrentQuizIndex,
        addQuiz,
        updateQuiz,
        deleteQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
