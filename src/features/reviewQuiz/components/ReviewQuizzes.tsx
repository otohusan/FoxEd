// import { useState } from "react";
import { reviewQuizzesIndex } from "../../../assets/reviewQuizzes";
import { quizzes } from "../../../assets/quizzes";

// type Quiz = {
//   question: string;
//   choices: string[];
//   answer: string;
// };

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

  const listItem = reviewQuizzesIndex.map((value) => (
    <li> {quizzes[value].answer}</li>
  ));

  return (
    <div>
      <ul>
        {/* {quizzes.map((item, index) => (
          <li key={index}>
            {item.question}
            {item.answer}
          </li>
        ))} */}
        {listItem}
      </ul>
      {/* <button onClick={deleteRandomQuiz}>Delete Random Quiz</button> */}
    </div>
  );
}

export default ReviewQuizzes;
