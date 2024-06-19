import React, { useState, useEffect } from "react";
import axios from "axios";

type FavoriteButtonProps = {
  itemId: string;
  userId: string; // ユーザーIDが必要
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ itemId, userId }) => {
  const [favorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const response = await axios.get(`/favorite`, {
          params: { userId, itemId },
        });
        setFavorited(response.data.favorited);
      } catch (error) {
        console.error("Failed to check favorite status", error);
      }
    };

    checkIfFavorited();
  }, [itemId, userId]);

  const handleFavorite = async () => {
    try {
      if (favorited) {
        await axios.delete(`/favorite`, { data: { userId, itemId } });
      } else {
        await axios.post(`/favorite`, { userId, itemId });
      }
      setFavorited(!favorited);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  return (
    <button onClick={handleFavorite}>
      {favorited ? "お気に入り解除" : "お気に入り"}
    </button>
  );
};

export default FavoriteButton;
