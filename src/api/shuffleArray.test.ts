import { describe, it, expect } from "vitest";
import shuffleArray from "./shuffleArray";

describe("shuffleArray", () => {
  it("配列をシャッフルして新しい配列を返す", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);

    // 配列の内容が同じであることを確認（順序は異なる可能性がある）
    expect(shuffledArray).toEqual(expect.arrayContaining(array));
    expect(shuffledArray).toHaveLength(array.length);
  });

  it("同じ要素を異なる順序で含む新しい配列を返する", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);

    // シャッフルされた配列が元の配列と異なることを確認
    expect(shuffledArray).not.toEqual(array);
  });

  it("空の配列を処理する", () => {
    const array: number[] = [];
    const shuffledArray = shuffleArray(array);

    // 空の配列が空のままであることを確認
    expect(shuffledArray).toEqual([]);
  });

  it("1つの要素のみを持つ配列を処理する", () => {
    const array = [1];
    const shuffledArray = shuffleArray(array);

    // 1要素の配列が変わらないことを確認
    expect(shuffledArray).toEqual([1]);
  });
});
