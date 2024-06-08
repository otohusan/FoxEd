import "./style/LoginPrompt.css";
import { useNavigate } from "react-router-dom";

const LoginPrompt: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // ログインページへのリダイレクト
  };

  return (
    <div className="login-prompt">
      <p>この機能を利用するにはログインが必要です。</p>
      <button onClick={handleLoginClick}>ログインする</button>
    </div>
  );
};

export default LoginPrompt;
