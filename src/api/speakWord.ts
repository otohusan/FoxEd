export default function speakWord(word: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // 英語を指定
  synth.speak(utterance);
}
