export function formatPrice(value: number | ""): string {
  if (value === "") return "0";
  return value.toLocaleString("fa-IR");
}
export function toPersianDigits(num: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
}