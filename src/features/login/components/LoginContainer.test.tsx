import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../components/auth/AuthContext";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";
import { QuizProvider } from "../../../components/quiz/QuizContext";
import LoginContainer from "./LoginContainer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { vi } from "vitest";
import "@testing-library/jest-dom";

const user = userEvent.setup();

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <AuthProvider>
          <QuizProvider>
            <ColorModeProvider>
              <LoginContainer />
            </ColorModeProvider>
          </QuizProvider>
        </AuthProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
};

describe("LoginContainer", () => {
  it("正常にレンダーされる", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.getByText("Googleでログイン")).toBeInTheDocument();
  });

  it("フォーム入力が全て揃った時にログインボタンが有効になる", async () => {
    expect.assertions(2);
    renderComponent();

    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("ログイン") as HTMLButtonElement;

    // ここではボタンは押せない
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("不適切な入力の場合はログインボタンが無効のまま", async () => {
    expect.assertions(4);
    renderComponent();

    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByText("ログイン") as HTMLButtonElement;

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
});
