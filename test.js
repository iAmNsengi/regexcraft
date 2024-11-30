import RegexCraft from "./src/index.js";

const passwordValidator = new RegexCraft().usePreset("password", "low");
//   .hasLengthBetween(2, 8);

console.log(passwordValidator.test(["nsengi1988888", "trsting"]));
console.log(passwordValidator.test(["my password"]).isValid);
