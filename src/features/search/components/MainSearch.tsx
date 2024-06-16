import { useState } from "react";
import "../style/MainSearch.css"; // スタイルを別ファイルで管理する場合
import { Footer, Header } from "../../../components";
import { QuizFormat } from "../../../../type";
import ChooseQuizContainer from "../../chooseQuiz/components/ChooseQuizContainer";

function MainSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<QuizFormat[]>([]);

  const handleSearch = async () => {
    // ここでバックエンドAPIを呼び出し、結果を取得します
    // 例：const response = await fetch(`/api/search?query=${searchTerm}`);
    // const data = await response.json();
    const data: QuizFormat[] = [
      {
        label: "結果1",
        body: [
          { question: "question1", answer: "answer1", partOfSpeech: 1 },
          { question: "question2", answer: "answer2", partOfSpeech: 2 },
        ],
      },
      {
        label: "結果2",
        body: [
          { question: "question3", answer: "answer3", partOfSpeech: 1 },
          { question: "question4", answer: "answer4", partOfSpeech: 2 },
        ],
      },
      {
        label: "結果3",
        body: [
          { question: "question5", answer: "answer5", partOfSpeech: 1 },
          { question: "question6", answer: "answer6", partOfSpeech: 2 },
        ],
      },
      {
        label: "結果4",
        body: [
          { question: "question7", answer: "answer7", partOfSpeech: 1 },
          { question: "question8", answer: "answer8", partOfSpeech: 2 },
        ],
      },
    ]; // ダミーデータを使用
    setResults(data);
  };

  return (
    <div className="main-search">
      <Header HeaderTitle="Search" />
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="学習セットを探す"
        />
        <button onClick={handleSearch}>検索</button>
      </div>
      <div className="search-quiz-results">
        {results.map((result, index) => (
          <div className="search-quiz-result">
            <ChooseQuizContainer key={index} quizFormat={result} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MainSearch;
