/**
 * 指定されたクエリパラメータの値を取得する関数
 * @param key - クエリパラメータのキー
 * @returns クエリパラメータの値（存在しない場合は null）
 */
const getQueryParam = (key: string): string | null => {
  // 現在のURLからクエリパラメータを取得
  const urlParams = new URLSearchParams(window.location.search);
  // 指定されたキーの値を返す（存在しない場合は null）
  return urlParams.get(key);
};

// 使用例
// const userId = getQueryParam("userId");
// console.log("User ID:", userId);
