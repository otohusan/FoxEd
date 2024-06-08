import LoginPrompt from "../components/LoginPrompt";
import { useAuth } from "../components/auth/useAuth";

function Profile() {
  const { user } = useAuth();
  if (!user) {
    return <LoginPrompt />;
  }
  return <div>Profile</div>;
}

export default Profile;
