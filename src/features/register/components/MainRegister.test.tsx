import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainRegister from "./MainRegister";
import { vi } from "vitest";
import registerWithEmail from "../api/registerWithEmail";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";
import { AuthProvider } from "../../../components/auth/AuthContext";
import { QuizProvider } from "../../../components/quiz/QuizContext";

vi.mock("../api/registerWithEmail");

const mockRegisterWithEmail = registerWithEmail as unknown as ReturnType<
  typeof vi.fn
>;

const user = userEvent.setup();

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <ColorModeProvider>
              <MainRegister />
            </ColorModeProvider>
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
};

describe("MainRegister", () => {
  beforeEach(() => {
    mockRegisterWithEmail.mockReset();
  });

  it("フォームが正常にレンダリングされる", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("名前")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByText("登録")).toBeInTheDocument();
    expect(screen.getByText("Googleで新規登録")).toBeInTheDocument();
  });

  it("フォーム入力が全て揃った時に登録ボタンが有効になる", async () => {
    expect.assertions(2);
    renderComponent();

    const nameInput = screen.getByPlaceholderText("名前");
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("登録") as HTMLButtonElement;

    // ここではボタンは押せない
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("不適切な入力の場合は登録ボタンが無効のまま", async () => {
    expect.assertions(4);
    renderComponent();

    const nameInput = screen.getByPlaceholderText("名前");
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("登録") as HTMLButtonElement;

    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");

    // 不適切な入力、文字数が足りない
    await userEvent.clear(passwordInput);
    await user.type(passwordInput, "Passw");
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // 不適切な入力、数字がない
    await userEvent.clear(passwordInput);
    await user.type(passwordInput, "Passdaafafa");
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // 不適切な入力、英語がない
    await userEvent.clear(passwordInput);
    await user.type(passwordInput, "1213141241");
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // 記号は使える
    await userEvent.clear(passwordInput);
    fireEvent.change(passwordInput, {
      target: { value: "fadga134!@#$%^&*(),.?:{}|<>_-" },
    });
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  it("登録成功後に成功メッセージが表示される", async () => {
    mockRegisterWithEmail.mockResolvedValueOnce({});
    renderComponent();

    const nameInput = screen.getByPlaceholderText("名前");
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("登録");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    fireEvent.click(submitButton);

    const result = await screen.findByText(
      /入力されたメールアドレスにリンクを送信しました！/
    );
    expect(result).toBeInTheDocument();
  });

  it("メールアドレスが既に存在する場合にエラーメッセージが表示される", async () => {
    mockRegisterWithEmail.mockRejectedValueOnce(
      new Error("メールアドレスは既に存在します")
    );
    renderComponent();

    const nameInput = screen.getByPlaceholderText("名前");
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("登録");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText("このメールアドレスは既に使用されいるよ")
      ).toBeInTheDocument()
    );
  });

  it("ユーザー名が既に存在する場合にエラーメッセージが表示される", async () => {
    mockRegisterWithEmail.mockRejectedValueOnce(
      new Error("ユーザー名は既に存在します")
    );
    renderComponent();

    const nameInput = screen.getByPlaceholderText("名前");
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("登録");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText("このユーザ名は既に使用されいるよ")
      ).toBeInTheDocument()
    );
  });
});
