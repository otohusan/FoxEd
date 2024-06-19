import { useAuth } from "../../../components/auth/useAuth";
import { StudySet } from "../../../../type";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import "../style/FavoriteButton.css";

type FavoriteButtonProps = {
  studySet: StudySet;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ studySet }) => {
  const { favoriteItems, toggleFavorite } = useAuth();
  const ICON_SIZE = "25px";

  const handleFavoriteClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleFavorite(studySet, isFavorited ? "remove" : "add");
  };

  const isFavorited =
    favoriteItems && favoriteItems.some((item) => item.id === studySet.id);

  return (
    <button onClick={(e) => handleFavoriteClicked(e)} className="favorite-btn">
      {isFavorited ? (
        <div className="favorite-btn-favorited">
          <IoBookmark size={ICON_SIZE} />
        </div>
      ) : (
        <IoBookmarkOutline size={ICON_SIZE} />
      )}
    </button>
  );
};

export default FavoriteButton;
