import { render, screen } from "@testing-library/react";
import ChooseQuiz from "./ChooseQuiz";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "../../../components/auth/AuthContext";
import { useAuth } from "../../../components/auth/useAuth";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";
import { QuizProvider } from "../../../components/quiz/QuizContext";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { useFetch, usePopupMenu } from "../../../hooks";

// モックの作成
vi.mock("axios");
vi.mock("../../../components/auth/useAuth");
vi.mock("../../../components/quiz/useQuizContext");
vi.mock("../../../hooks/usePopupMenu");
vi.mock("../../../hooks/useFetch");

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

const mockUseFetch = useFetch as unknown as ReturnType<typeof vi.fn>;

const mockStudySets = [
  {
    id: 1,
    user_id: 1,
    title: "Test Study Set 1",
    description: "This is a test study set 1",
    flashcards: [],
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
  {
    id: 2,
    user_id: 1,
    title: "Test Study Set 2",
    description: "This is a test study set 2",
    flashcards: [],
    created_at: "2023-01-02",
    updated_at: "2023-01-02",
  },
];

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <ColorModeProvider>
              <ChooseQuiz />
            </ColorModeProvider>
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
};

describe("ChooseQuiz", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { ID: 1, name: "Test User" },
      favoriteItems: mockStudySets,
      userStudySets: mockStudySets,
    });
    mockUseQuizContext.mockReturnValue({
      quizFormat: mockStudySets,
      setQuizFormat: vi.fn(),
    });
    mockUseFetch.mockReturnValue({ data: mockStudySets, setData: vi.fn() });

    let isPopupMenuOpen = false;
    const handleOpenPopupMenu = vi.fn(() => {
      isPopupMenuOpen = true;
    });
    const handleClosePopupMenu = vi.fn(() => {
      isPopupMenuOpen = false;
    });

    mockUsePopupMenu.mockReturnValue({
      isPopupMenuOpen,
      popupMenuAnchor: null,
      handleOpenPopupMenu,
      handleClosePopupMenu,
    } as ReturnType<typeof usePopupMenu>);
    vi.clearAllMocks();
  });

  test("コンポーネントが正しくレンダリングされる", () => {
    renderComponent();
    expect(screen.getByText("Home")).toBeInTheDocument();
    const elements = screen.getAllByText("学習セット");
    expect(elements[0]).toBeInTheDocument();
  });

  test("ログインしていない場合、ログインプロンプトが表示される", () => {
    mockUseAuth.mockReturnValue({ user: null, favoriteItems: [] });
    renderComponent();
    expect(
      screen.getByText("ログインすれば、オリジナル学習セットを作成できる")
    ).toBeInTheDocument();
  });

  test("学習セットが正しく表示される", () => {
    renderComponent();
    expect(screen.getByText("学習セット")).toBeInTheDocument();
    expect(screen.getByText("お気に入り")).toBeInTheDocument();
    const result1 = screen.getAllByText("Test Study Set 1");
    const result2 = screen.getAllByText("Test Study Set 2");
    expect(result1[0]).toBeInTheDocument();
    expect(result1[1]).toBeInTheDocument();
    expect(result2[0]).toBeInTheDocument();
    expect(result2[1]).toBeInTheDocument();
  });

  test("自身の学習セットがない場合は、催促メッセージを表示", () => {
    mockUseQuizContext.mockReturnValue({
      quizFormat: [],
      setQuizFormat: vi.fn(),
    });
    mockUseAuth.mockReturnValue({
      user: { ID: 1, name: "Test User" },
      userStudySets: [],
    });

    renderComponent();

    const element = screen.getByText((content, element) => {
      if (!element) {
        return false;
      }

      return (
        element.tagName.toLowerCase() === "span" &&
        content.startsWith("プロフィール")
      );
    });

    expect(element).toBeInTheDocument();

    expect(
      screen.getByText("から、オリジナル学習セットを作成しよう！")
    ).toBeInTheDocument();
  });

  test("お気に入りと自分の学習セットが空の場合は何も表示されない", () => {
    mockUseFetch.mockReturnValue({ data: [], setData: vi.fn() });
    mockUseAuth.mockReturnValue({
      user: { ID: 1, name: "Test User" },
      favoriteItems: [],
    });

    renderComponent();

    expect(screen.queryByText("あなたの学習セット")).not.toBeInTheDocument();
    expect(screen.queryByText("あなたのお気に入り")).not.toBeInTheDocument();
  });

  // TODO: ポップアップメニューのテストがうまくできない
});
