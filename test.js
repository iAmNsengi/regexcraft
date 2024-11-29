import RegexCraft from "./src/index.js";

const passwordValidator = new RegexCraft()
  .hasMaxLength(10)
  .hasLengthBetween(2, 5)
  .hasMinLength(1)
  .hasMaxLength(1)
  .visualize();

console.log(passwordValidator);
