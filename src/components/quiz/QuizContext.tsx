import React, { createContext, useContext, useState, ReactNode } from "react";
import { Quiz } from "../../../type";

interface QuizContextType {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (updatedQuiz: Quiz) => void;
  deleteQuiz: (quizId: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const addQuiz = (quiz: Quiz) => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, quiz]);
  };

  const updateQuiz = (updatedQuiz: Quiz) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === updatedQuiz.id ? updatedQuiz : quiz
      )
    );
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz.id !== quizId)
    );
  };

  return (
    <QuizContext.Provider
      value={{ quizzes, setQuizzes, addQuiz, updateQuiz, deleteQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
