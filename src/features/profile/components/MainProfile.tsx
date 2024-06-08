import { Header } from "../../../components";
import LoginPrompt from "../../../components/LoginPrompt";
import { useAuth } from "../../../components/auth/useAuth";

function MainProfile() {
  const { user } = useAuth();
  return (
    <div>
      <Header HeaderTitle="Profile" />
      <div className="">{!user && <LoginPrompt />}</div>
    </div>
  );
}

export default MainProfile;
