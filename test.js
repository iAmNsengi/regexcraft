import RegexCraft from "./src/index.js";

const passwordValidator = new RegexCraft()
  .hasLengthBetween(2, 5)
  .hasMaxLength(2);

console.log(passwordValidator.test(["11255"]));
