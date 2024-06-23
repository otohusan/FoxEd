export type Quiz = {
  id?: string;
  question: string;
  answer: string;
  // なくなる予定移行前段階として、nullを許容するように変更
  partOfSpeech?: number;
  study_set_id?: string;
  updated_at?: string;
  created_at?: string;
};
