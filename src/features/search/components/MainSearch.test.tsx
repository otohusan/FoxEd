import { render, screen, fireEvent } from "@testing-library/react";
import MainSearch from "./MainSearch";
import type { Mocked } from "vitest";
import axios from "axios";
import type { AxiosStatic } from "axios";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../components/auth/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import "@testing-library/jest-dom";
import { QuizProvider } from "../../../components/quiz/QuizContext";
import { ColorModeProvider } from "../../../components/colorMode/ColorModeContext";

vi.mock("axios");

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

describe("MainSearch", () => {
  it("正常にレンダリングされ、検索が成功する", async () => {
    const mockedAxios = axios as Mocked<AxiosStatic>;

    // axiosのgetの返り値を指定
    mockedAxios.get.mockResolvedValue({ data: mockStudySets });

    render(
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

    const input = screen.getByPlaceholderText("学習セットを探す");
    const button = screen.getByText("検索");

    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);

    const result = await screen.findByText("Test Study Set");
    expect(result).toBeInTheDocument();
  });
});
