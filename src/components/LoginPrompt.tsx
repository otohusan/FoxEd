import "./style/LoginPrompt.css";
import { useNavigate } from "react-router-dom";

type LoginPromptProps = {
  promptText: string;
};

const LoginPrompt = ({ promptText }: LoginPromptProps) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // ログインページへのリダイレクト
  };

  return (
    <div className="login-prompt">
      <p>{promptText}</p>
      <button onClick={handleLoginClick}>ログインする</button>
    </div>
  );
};

export default LoginPrompt;
