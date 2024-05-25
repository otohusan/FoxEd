import { describe, it, expect } from "vitest";
import generateRandomInteger from "./generateRandomInteger";

describe("generateRandomInteger", () => {
  it("範囲内のランダムな値を返す", () => {
    const min = 1;
    const max = 10;
    // テストの信頼性を高めるために複数回テスト
    for (let i = 0; i < 1000; i++) {
      const result = generateRandomInteger(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });
});
