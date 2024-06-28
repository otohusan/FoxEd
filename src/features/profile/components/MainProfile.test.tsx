import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../components/auth/AuthContext";
import { useAuth } from "../../../components/auth/useAuth";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";
import { QuizProvider } from "../../../components/quiz/QuizContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useFetch } from "../../../hooks";
import MainProfile from "./MainProfile";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// モックを作成
vi.mock("axios");
vi.mock("../../../hooks/useFetch");
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

// テスト用のモックデータ
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

// useAuthフックをモック
vi.mock("../../../components/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = useAuth as unknown as ReturnType<typeof vi.fn>;

// useFetchフックをモック
const mockUseFetch = useFetch as unknown as ReturnType<typeof vi.fn>;

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <ColorModeProvider>
              <MainProfile />
            </ColorModeProvider>
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
};

describe("MainProfile", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { ID: 1, name: "Test User" } });
    mockUseFetch.mockReturnValue({ data: mockStudySets, setData: vi.fn() });
    vi.clearAllMocks();
  });

  test("ログインしていない場合、ログインプロンプトが表示される", async () => {
    mockUseAuth.mockReturnValue({ user: null });
    renderComponent();
    expect(
      screen.getByText("ログインして、自分だけの学習セットを作成しよう")
    ).toBeInTheDocument();
  });

  test("ログインしている場合、ユーザー情報が表示される", async () => {
    renderComponent();
    expect(screen.getByText("ニックネーム:")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("ユーザーID:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("ユーザーが学習セットを持っていない場合、プロンプトが表示される", async () => {
    mockUseFetch.mockReturnValue({ data: [], setData: vi.fn() });
    renderComponent();
    expect(
      await screen.findByText(/自分だけの学習セット作ってみよう！/)
    ).toBeInTheDocument();
  });

  test("ユーザーが学習セットを持っている場合、それらが表示される", async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText("あなたの学習セット")).toBeInTheDocument();
    });
    expect(screen.getByText("Test Study Set 1")).toBeInTheDocument();
    expect(screen.getByText("Test Study Set 2")).toBeInTheDocument();
  });

  test("学習セットがクリックされた時に、クイズ準備ページに遷移する", async () => {
    renderComponent();

    const studySet = await screen.findByText("Test Study Set 1");
    fireEvent.click(studySet);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith("/PrepareQuiz");
    });
  });
});
