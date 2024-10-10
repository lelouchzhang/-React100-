// export function convertToEmoji(countryName) {
//   const countryCode = getCountryCode(countryName);
//   if (!countryCode) return "";
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// function getCountryCode(countryName) {
//   const countries = {
//     "United States": "US",
//     China: "CN",
//     Japan: "JP",
//     // 添加更多国家和对应的代码
//   };
//   return countries[countryName] || "";
// }

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
