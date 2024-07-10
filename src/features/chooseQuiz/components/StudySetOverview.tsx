// StudySetList.tsx
import React from "react";
import ChooseQuizContainer from "./ChooseQuizContainer";
import { StudySet, User } from "../../../../type/index.ts";
import FavoriteButton from "./FavoriteButton.tsx";
import { RxDotsHorizontal } from "react-icons/rx";
import "../style/ChooseQuizContainer.css";
import { useNavigate } from "react-router-dom";

type StudySetListProps = {
  title: string;
  studySets: StudySet[];
  user: User;
  handleClickStudySet: (studyset: StudySet) => void;
  handleClickMenu: (e: React.MouseEvent) => void;
};

const StudySetOverview: React.FC<StudySetListProps> = ({
  title,
  studySets,
  user,
  handleClickStudySet,
  handleClickMenu,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {studySets.length > 0 && (
        <div className="ChooseQuizListTitle">{title}</div>
      )}
      {studySets.length > 0 ? (
        <div className="ChooseQuizDataList">
          {studySets
            .slice()
            .reverse()
            .map((studyset) => (
              <div
                onClick={() => {
                  handleClickStudySet(studyset);
                  navigate("/PrepareQuiz");
                }}
                className="ChooseQuizContainerWrapper"
                key={studyset.id}
              >
                <ChooseQuizContainer
                  key={studyset.id}
                  quizFormat={{
                    id: studyset.id,
                    label: studyset.title,
                    description: studyset.description,
                    body: studyset.flashcards,
                    created_at: studyset.created_at,
                    updated_at: studyset.updated_at,
                  }}
                />
                <div className="choose-quiz-menus">
                  <FavoriteButton studySet={studyset} IconSize="25px" />
                  {studyset.id &&
                    studyset.description &&
                    user?.ID == studyset.user_id && (
                      <button
                        className="owner-drop-menu"
                        data-testid="owner-drop-menu"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickStudySet(studyset);
                          handleClickMenu(e);
                        }}
                      >
                        <RxDotsHorizontal size={"23px"} />
                      </button>
                    )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default StudySetOverview;
