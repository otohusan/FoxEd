type returnNextQuizIndexProps = {
  quizIndex: number;
  quizSize: number;
  next: number;
};

function returnNextQuizIndex(
  quizIndex: returnNextQuizIndexProps["quizIndex"],
  quizSize: returnNextQuizIndexProps["quizSize"],
  next: returnNextQuizIndexProps["next"]
): number {
  const nextIndex: number = quizIndex + next;

  if (nextIndex < 0) {
    return quizSize - 1;
  }

  if (nextIndex > quizSize - 1) {
    return 0;
  }

  return nextIndex;
}

export default returnNextQuizIndex;
