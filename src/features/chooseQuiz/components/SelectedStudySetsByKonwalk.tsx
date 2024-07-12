import { StudySet, User } from "../../../../type";
import { useFetch } from "../../../hooks";
import StudySetOverview from "./StudySetOverview";

type SelectedStudySetsByKonwalkProps = {
  handleClickStudySet: (studyset: StudySet) => void;
  handleClickMenu: (e: React.MouseEvent<Element, MouseEvent>) => void;
  user: User | null;
};

function SelectedStudySetsByKonwalk({
  handleClickStudySet,
  handleClickMenu,
  user,
}: SelectedStudySetsByKonwalkProps) {
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const url = `${BASE_BACKEND_URL}/studysets/search?title=IT`;
  const response = useFetch<StudySet[]>(url);

  return (
    <div>
      {response.data && response.data.length > 0 && (
        <StudySetOverview
          title="IT用語"
          studySets={response.data}
          user={user || null}
          handleClickStudySet={handleClickStudySet}
          handleClickMenu={handleClickMenu}
        />
      )}
    </div>
  );
}

export default SelectedStudySetsByKonwalk;
