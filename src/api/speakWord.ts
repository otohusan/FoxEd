let isSpeaking = false;

export default function speakWord(word: string) {
  if (isSpeaking) {
    return; // 既に発話中であれば、関数の実行を中止
  }

  isSpeaking = true; // 発話を開始する前にフラグを設定

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // 英語を指定
  synth.speak(utterance);

  setTimeout(() => {
    isSpeaking = false; // 発話が終了したとみなし、フラグをリセット
  }, 1000); // 発話の終了を待ってフラグをリセット
}
