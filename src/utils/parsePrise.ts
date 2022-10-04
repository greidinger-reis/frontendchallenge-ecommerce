export function parsePriceString(value: string) {
  return parseFloat(value.split(" ")[1]?.replace(",", ".") || "0");
}
