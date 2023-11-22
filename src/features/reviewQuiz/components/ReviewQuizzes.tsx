// import { useState } from "react";
import { quizzes } from "../../../assets/quizzes";

type ReviewQuizProps = {
  reviewQuizzes1: number[];
};

function ReviewQuizzes({ reviewQuizzes1 }: ReviewQuizProps) {
  //   const [quizzes, setQuizzes] = useState<Quiz[]>(reviewQuizzes);

  //   const deleteRandomQuiz = () => {
  //     const randomIndex = Math.floor(Math.random() * quizzes.length);
  //     setQuizzes((prevQuizzes) =>
  //       prevQuizzes.filter((_, index) => index !== randomIndex)
  //     );
  //   };

  const listItem = reviewQuizzes1.map((value) => (
    <li key={value}> {quizzes[value].answer}</li>
  ));

  return (
    <div>
      <ul>{listItem}</ul>
      {/* <button onClick={deleteRandomQuiz}>Delete Random Quiz</button> */}
    </div>
  );
}

export default ReviewQuizzes;
