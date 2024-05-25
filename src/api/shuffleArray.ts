function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = array.slice(); // 元の配列をコピーして新しい配列を作成
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default shuffleArray;
