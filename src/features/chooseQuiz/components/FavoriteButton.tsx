import { useAuth } from "../../../components/auth/useAuth";
import { StudySet } from "../../../../type";

type FavoriteButtonProps = {
  studySet: StudySet;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ studySet }) => {
  const { favoriteItems, toggleFavorite } = useAuth();

  const handleFavoriteClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleFavorite(studySet, isFavorited ? "remove" : "add");
  };

  const isFavorited =
    favoriteItems && favoriteItems.some((item) => item.id === studySet.id);

  return (
    <button onClick={(e) => handleFavoriteClicked(e)}>
      {isFavorited ? "お気に入り解除" : "お気に入り"}
    </button>
  );
};

export default FavoriteButton;
