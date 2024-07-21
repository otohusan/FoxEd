import React, { useEffect, useState } from "react";
import { StudySet, User } from "../../../../type";
import StudySetOverview from "./StudySetOverview";
import axios from "axios";

type SelectedStudySetsByKonwalkProps = {
  handleClickStudySet: (studyset: StudySet) => void;
  handleClickMenu: (e: React.MouseEvent<Element, MouseEvent>) => void;
  user: User | null;
};

type SelectedStudySetsByKonwalkContainerProps = {
  searchTerm: string;
  categoryTitle: string;
  handleClickStudySet: (studyset: StudySet) => void;
  handleClickMenu: (e: React.MouseEvent<Element, MouseEvent>) => void;
  user: User | null;
};

function SelectedStudySetsByKonwalk({
  handleClickStudySet,
  handleClickMenu,
  user,
}: SelectedStudySetsByKonwalkProps) {
  return (
    <div>
      <SelectedStudySetsByKonwalkContainer
        searchTerm="IT"
        categoryTitle="IT用語"
        handleClickStudySet={handleClickStudySet}
        handleClickMenu={handleClickMenu}
        user={user}
      />
      <SelectedStudySetsByKonwalkContainer
        searchTerm="日本史"
        categoryTitle="日本史"
        handleClickStudySet={handleClickStudySet}
        handleClickMenu={handleClickMenu}
        user={user}
      />
      <SelectedStudySetsByKonwalkContainer
        searchTerm="世界史"
        categoryTitle="世界史"
        handleClickStudySet={handleClickStudySet}
        handleClickMenu={handleClickMenu}
        user={user}
      />
    </div>
  );
}

// TODO: 更新や削除をした場合に、際レンダーされず、すぐに反映されない
function SelectedStudySetsByKonwalkContainer({
  searchTerm,
  categoryTitle,
  handleClickStudySet,
  handleClickMenu,
  user,
}: SelectedStudySetsByKonwalkContainerProps) {
  const [studySets, setStudySets] = useState<StudySet[] | null>(null);
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_BACKEND_URL}/studysets/search?keyword=${searchTerm}`
        );
        const data = await response.data;
        setStudySets(data);
      } catch (error) {
        console.error("Error fetching study sets:", error);
      }
    };

    fetchData();
  }, [searchTerm, BASE_BACKEND_URL]);

  return (
    <div>
      {studySets && studySets.length > 0 && (
        <StudySetOverview
          title={categoryTitle}
          studySets={studySets}
          user={user || null}
          handleClickStudySet={handleClickStudySet}
          handleClickMenu={handleClickMenu}
        />
      )}
    </div>
  );
}

export default SelectedStudySetsByKonwalk;
