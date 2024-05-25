function generateRandomInteger(min: number, max: number): number {
  // Math.random() は 0 以上 1 未満の浮動小数点の擬似乱数を返すため、
  // 最小値と最大倂との差を乗じ、最小値を足すことで目的の範囲を生成
  // Math.floor() を使用して整数に丸める
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default generateRandomInteger;
