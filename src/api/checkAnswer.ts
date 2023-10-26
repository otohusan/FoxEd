function useCheckAnswer(clickedChoice: string, answer: string) {
  if (clickedChoice === answer) {
    return true;
  } else {
    return false;
  }
}

export default useCheckAnswer;
