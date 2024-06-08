import { Header } from "../../../components";
import LoginPrompt from "../../../components/LoginPrompt";
import { useAuth } from "../../../components/auth/useAuth";
import "../style/MainProfile.css";

function MainProfile() {
  const { user } = useAuth();
  return (
    <div>
      <Header HeaderTitle="Profile" />
      <div className="profile-login-prompt">
        {!user && (
          <LoginPrompt promptText="ログインして、自分だけの学習セットを作成しよう" />
        )}
      </div>
    </div>
  );
}

export default MainProfile;
