import { StudySet, User } from "../../../../type";
import { useFetch } from "../../../hooks";
import StudySetOverview from "./StudySetOverview";

type SelectedStudySetsByKonwalkProps = {
  handleClickStudySet: (studyset: StudySet) => void;
  handleClickMenu: (e: React.MouseEvent<Element, MouseEvent>) => void;
  user: User | null;
};

type SelectedStudySetsByKonwalkContainerProps = {
  searchTerm: string;
  categoryTitle: string;
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
      />
      <SelectedStudySetsByKonwalkContainer
        searchTerm="日本史"
        categoryTitle="日本史"
      />
    </div>
  );

  // handleあたりのpropsを毎回渡すのが煩わしいから、この中で定義してる
  function SelectedStudySetsByKonwalkContainer({
    searchTerm,
    categoryTitle,
  }: SelectedStudySetsByKonwalkContainerProps) {
    const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
    const url = `${BASE_BACKEND_URL}/studysets/search?keyword=${searchTerm}`;
    const response = useFetch<StudySet[]>(url);

    return (
      <div>
        {response.data && response.data.length > 0 && (
          <StudySetOverview
            title={categoryTitle}
            studySets={response.data}
            user={user || null}
            handleClickStudySet={handleClickStudySet}
            handleClickMenu={handleClickMenu}
          />
        )}
      </div>
    );
  }
}

export default SelectedStudySetsByKonwalk;
