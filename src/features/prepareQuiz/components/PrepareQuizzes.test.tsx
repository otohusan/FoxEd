import { render, screen } from "@testing-library/react";
import PrepareQuizzes from "./PrepareQuizzes";
import { vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../components/auth/AuthContext";
import { useAuth } from "../../../components/auth/useAuth";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";
import { QuizProvider } from "../../../components/quiz/QuizContext";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { usePopupMenu } from "../../../hooks";

// モックの作成
vi.mock("axios");
vi.mock("../../../components/auth/useAuth");
vi.mock("../../../components/quiz/useQuizContext");
vi.mock("../../../hooks/usePopupMenu");

// 疑問: こんなにモックだらけで、テストの意味があるのか
// ResizeObserver をモック
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// IntersectionObserver をモック
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const mockUseAuth = useAuth as unknown as ReturnType<typeof vi.fn>;
const mockUseQuizContext = useQuizContext as unknown as ReturnType<
  typeof vi.fn
>;
const mockUsePopupMenu = usePopupMenu as unknown as ReturnType<typeof vi.fn>;

const mockQuizFormat = {
  id: 1,
  user_id: 1,
  label: "Test Quiz Format",
  body: [
    { id: 1, question: "Question 1", answer: "Answer 1" },
    { id: 2, question: "Question 2", answer: "Answer 2" },
  ],
};

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <ColorModeProvider>
              <PrepareQuizzes />
            </ColorModeProvider>
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
};

describe("PrepareQuizzes", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { ID: 1, name: "Test User" } });
    mockUseQuizContext.mockReturnValue({
      quizFormat: mockQuizFormat,
      setCurrentQuizIndex: vi.fn(),
      setQuizFormat: vi.fn(),
      deleteQuiz: vi.fn(),
    });
    mockUsePopupMenu.mockReturnValue({
      isPopupMenuOpen: false,
      popupMenuAnchor: null,
      handleOpenPopupMenu: vi.fn(),
      handleClosePopupMenu: vi.fn(),
    });
    vi.clearAllMocks();
  });

  test("コンポーネントが正しくレンダリングされる", () => {
    renderComponent();
    expect(screen.getByText("Prepare")).toBeInTheDocument();
    expect(screen.getByText("Test Quiz Format")).toBeInTheDocument();
  });
});
