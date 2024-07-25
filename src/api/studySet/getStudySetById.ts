import axios from "axios";
import { StudySet } from "../../../type";

async function getStudySetById(studySetID: string): Promise<StudySet> {
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const res = await axios.get(`${BASE_BACKEND_URL}/studysets/${studySetID}`);

  return res.data;
}

export default getStudySetById;
