import RegexCraft from "../index.js";

describe("RegexCraft", () => {
  let regex;

  beforeEach(() => {
    regex = new RegexCraft();
  });

  describe("Password Validation", () => {
    test("should validate password with medium preset", () => {
      const validator = regex.usePreset("password", "medium").build();
      expect(validator.test("Password123")).toBeTruthy();
      expect(validator.test("weak")).toBeFalsy();
    });
  });

  describe("Email Validation", () => {
    test("should validate email format", () => {
      const validator = regex.isEmail().build();
      expect(validator.test("test@example.com")).toBeTruthy();
      expect(validator.test("invalid-email")).toBeFalsy();
    });
  });

  describe("Phone Validation", () => {
    test("should validate US phone numbers", () => {
      const validator = regex.isPhone("US").build();
      expect(validator.test("+1-555-555-5555")).toBeTruthy();
      expect(validator.test("invalid")).toBeFalsy();
    });
  });
});
