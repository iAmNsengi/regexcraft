import RegexCraft from "./src/index.js";

const passwordValidator = new RegexCraft().usePreset("password", "low");
//   .hasLengthBetween(2, 8);

console.log(passwordValidator.test(["nsengi1988888"]));
console.log(passwordValidator.test(["nsengi1988888"]));
console.log(passwordValidator.test(["my password"]).isValid);

const lengthValidator = new RegexCraft()
  .hasLengthBetween(2, 4)
  .hasExactLength(3);

console.log(lengthValidator.test(["123333"]));

const characterValidator = new RegexCraft()
  .hasLetter(2)
  .hasUpperCase("2")
  .hasNumber(2)
  .hasSpecialCharacter(5);
console.log(characterValidator.test(["123@^4AR4"]));
