export type Quiz = {
  question: string;
  // 最終的に他のクイズのアンサーから選択肢を作るようにする
  // その移行前段階として、nullを許容するように変更
  choices?: string[];
  answer: string;
  partOfSpeech?: number;
};
