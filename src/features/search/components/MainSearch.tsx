import { useEffect, useState } from "react";
import "../style/MainSearch.css"; // スタイルを別ファイルで管理する場合
import { HeadDataHelmet, Header } from "../../../components";
import { StudySet } from "../../../../type";
import ChooseQuizContainer from "../../chooseQuiz/components/ChooseQuizContainer";
import axios from "axios";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../chooseQuiz/components/FavoriteButton";
import { useAuth } from "../../../components/auth/useAuth";
import LoginPrompt from "../../../components/LoginPrompt";

function MainSearch() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();

  // セッションストレージに値が存在したら、それを初期値に
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearchTerm = sessionStorage.getItem("searchTerm");
    return savedSearchTerm ? savedSearchTerm : "";
  });

  const [results, setResults] = useState<StudySet[]>(() => {
    const savedResults = sessionStorage.getItem("searchResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });
  const { setQuizFormat } = useQuizContext();
  const navigate = useNavigate();

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  // 検索を行う関数
  const handleSearch = async () => {
    if (!searchTerm) {
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_BACKEND_URL}/studysets/search?title=${searchTerm}`
      );

      if (!response.data) {
        alert("学習セットが見つかりませんでした");
      }

      setResults(response.data);
      // セッションストレージに割り当て
      sessionStorage.setItem("searchResults", JSON.stringify(response.data));
      sessionStorage.setItem("searchTerm", searchTerm);
    } catch (error) {
      console.error("Error fetching study sets:", error);
      setResults([]);
    }
  };

  return (
    <div className="main-search">
      <HeadDataHelmet pageTitle="検索ページ" />
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
        {results &&
          results.map((result) => (
            <div
              className="search-quiz-result"
              key={result.id}
              onClick={() => {
                setQuizFormat({
                  id: result.id,
                  user_id: result.user_id,
                  label: result.title,
                  description: result.description,
                  body: result.flashcards,
                });

                navigate("/PrepareQuiz");
              }}
            >
              <ChooseQuizContainer
                quizFormat={{
                  id: result.id,
                  label: result.title,
                  description: result.description,
                  body: result.flashcards,
                }}
              />
              <div className="search-quiz-menus">
                <FavoriteButton studySet={result} />
              </div>
            </div>
          ))}
      </div>

      {!user && results && (
        <div className="search-quiz-login-prompt-container">
          <LoginPrompt promptText="ログインすれば、学習セットをお気に入り登録できる" />
        </div>
      )}
    </div>
  );
}

export default MainSearch;
