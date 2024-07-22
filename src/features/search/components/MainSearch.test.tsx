import { render, screen } from "@testing-library/react";
import MainSearch from "./MainSearch";
import type { Mocked } from "vitest";
import axios from "axios";
import type { AxiosStatic } from "axios";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import {
  AuthContext,
  AuthProvider,
} from "../../../components/auth/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { QuizProvider } from "../../../components/quiz/QuizContext";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

const user = userEvent.setup();

const mockStudySets = [
  {
    id: 1,
    user_id: 1,
    title: "Test Study Set",
    description: "This is a test study set",
    flashcards: [],
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
];

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <ColorModeProvider>
              <MainSearch />
            </ColorModeProvider>
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
};

describe("MainSearch", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("正常にレンダリングされ、検索が成功する", async () => {
    expect.assertions(1);
    const mockedAxios = axios as Mocked<AxiosStatic>;

    // axiosのgetの返り値を指定
    mockedAxios.get.mockResolvedValue({ data: mockStudySets });

    renderComponent();

    const input = screen.getByPlaceholderText("学習セットを探す");
    const button = screen.getByText("検索");

    await user.type(input, "Test");
    await user.click(button);

    const result = await screen.findByText("Test Study Set");
    expect(result).toBeInTheDocument();
  });

  it("未ログインの場合、検索後にログインプロンプトが表示される", async () => {
    expect.assertions(2);
    const mockedAxios = axios as Mocked<AxiosStatic>;
    mockedAxios.get.mockResolvedValue({ data: mockStudySets });

    // セッションストレージに初期値を設定
    sessionStorage.setItem("searchResults", JSON.stringify([]));
    sessionStorage.setItem("searchTerm", "");

    renderComponent();

    let loginPrompt = screen.queryByText(
      "ログインすれば、学習セットをお気に入り登録できる"
    );
    expect(loginPrompt).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText("学習セットを探す");
    const button = screen.getByText("検索");

    await user.type(input, "Test");
    await user.click(button);

    loginPrompt = await screen.findByText(
      "ログインすれば、学習セットをお気に入り登録できる"
    );
    expect(loginPrompt).toBeInTheDocument();
  });

  it("検索結果がない場合にエラーメッセージが表示される", async () => {
    const mockedAxios = axios as Mocked<AxiosStatic>;
    mockedAxios.get.mockResolvedValue({ data: [] });

    // window.alertをモック
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderComponent();

    const input = screen.getByPlaceholderText("学習セットを探す");
    const button = screen.getByText("検索");

    await user.type(input, "Test");
    await user.click(button);

    expect(alertMock).toHaveBeenCalledWith("学習セットが見つかりませんでした");
  });

  it("ログインしている場合、検索後にログインプロンプトが表示されない", async () => {
    expect.assertions(2);
    const mockedAxios = axios as Mocked<AxiosStatic>;
    mockedAxios.get.mockResolvedValue({ data: mockStudySets });

    const mockUser = {
      ID: "1",
      name: "Test User",
      createdAt: "",
    };
    render(
      <MemoryRouter>
        <HelmetProvider>
          <AuthContext.Provider
            value={{
              user: mockUser,
              setUser: vi.fn(),
              userStudySets: [],
              setUserStudySets: vi.fn(),
              loading: false,
              loginWithEmail: vi.fn(),
              logout: vi.fn(),
              favoriteItems: [],
              toggleFavorite: vi.fn(),
              setFavoriteItems: vi.fn(),
            }}
          >
            <QuizProvider>
              <ColorModeProvider>
                <MainSearch />
              </ColorModeProvider>
            </QuizProvider>
          </AuthContext.Provider>
        </HelmetProvider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("学習セットを探す");
    const button = screen.getByText("検索");

    await user.type(input, "Test");
    await user.click(button);

    const loginPrompt = screen.queryByText(
      "ログインすれば、学習セットをお気に入り登録できる"
    );
    expect(loginPrompt).not.toBeInTheDocument();

    const result = await screen.findByText("Test Study Set");
    expect(result).toBeInTheDocument();
  });

  it("セッションストレージに初期値がある場合は、その学習セットが表示されている", async () => {
    expect.assertions(1);
    const mockedAxios = axios as Mocked<AxiosStatic>;
    mockedAxios.get.mockResolvedValue({ data: mockStudySets });

    // セッションストレージに初期値を設定
    sessionStorage.setItem("searchResults", JSON.stringify(mockStudySets));
    sessionStorage.setItem("searchTerm", "");

    renderComponent();

    const result = await screen.findByText("Test Study Set");
    expect(result).toBeInTheDocument();
  });
});
