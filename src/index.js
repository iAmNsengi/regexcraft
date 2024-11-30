/**
 * RegexCraft - A utility class for building regular expressions.
 * Provides a good interface for creating common regex patterns.
 */

class RegexCraft {
  constructor() {
    this.patterns = [];
    this.flags = "";
    this.description = [];
    this.errorMessages = new Map();

    // Initializing presets
    this.presets = {
      password: {
        low: [
          { pattern: "(?=.{6,})", message: "At least 6 characters" },
          {
            pattern: "(?=.*\\d)",
            message: "At least one number",
          },
        ],
        medium: [
          { pattern: "(?=.{8,})", message: "At least 8 characters" },
          {
            pattern: "(?=.*\\d)",
            message: "At least one number",
          },
          {
            pattern: "(?=.*[a-z])",
            message: "At least one lowercase letter",
          },
          {
            pattern: "(?=.*[A-Z])",
            message: "At least one uppercase letter",
          },
        ],
        high: [
          { pattern: "(?=.{10,})", message: "At least 8 characters" },
          {
            pattern: "(?=.*\\d{2,0})",
            message: "At least two number",
          },
          {
            pattern: "(?=.*[a-z])",
            message: "At least one lowercase letter",
          },
          {
            pattern: "(?=.*[A-Z])",
            message: "At least one uppercase letter",
          },
          {
            pattern: "(?=.*[!@#$%^&*])",
            message: "At least one special character",
          },
        ],
      },
      username: {
        standard: [
          {
            pattern: "^[a-zA-Z][a-zA-Z0-9_]{2,29}",
            message:
              "Letters, numbers and underscore only, at least 2 characters",
          },
        ],
        strict: [
          {
            pattern: "^[a-zA-Z][a-zA-Z0-9]{5,29}",
            message: "Letters and numbers only, at least 5 characters",
          },
        ],
      },
    };
  }

  /**
   * ---------------------------------Length validators ----------------------------------------
   */

  hasMinLength(length, message = `Minimum length of ${length} characters`) {
    this.addPattern(`^.{${length},}$`, message);
    return this;
  }

  hasMaxLength(length, message = `Maximum length of ${length} characters`) {
    this.addPattern(`^.{0,${length}}$`, message);
    return this;
  }

  hasLengthBetween(
    min,
    max,
    message = `Length should be between ${min} and ${max} characters`
  ) {
    this.addPattern(`^.{${min},${max}}$`, message);
    return this;
  }
  hasExactLength(
    length,
    message = `Length should be exactly ${length} characters`
  ) {
    this.addPattern(`(?=^.{${length}}$)`, message);
    return this;
  }

  /**
   * Character validations
   */

  hasLetter(
    count = 1,
    message = `At least ${count} letter${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?=.*[a-zA-Z]){${count}})`, message);
    return this;
  }

  hasLowerCase(
    count = 1,
    message = `At least ${count} lowercase letter${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?:.*[a-z]){${count}})`, message);
    return this;
  }
  /**
   * Requires specified number of uppercase letters
   * @param {number} count - Minimum number of uppercase letters required
   * @param {string} message - Custom error message
   * @returns {RegexCraft} - Returns this for method chaining
   */
  hasUpperCase(
    count = 1,
    message = `At least ${count} uppercase letter${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?:.*[A-Z]){${count}})`, message);
    return this;
  }
  hasNumber(
    count = 1,
    message = `At least ${count} number${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?:.*\\d)${count})`, message);
    return this;
  }
  hasSpecialCharacter(
    count = 1,
    message = `At least ${count} special character${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?=.*[!@#$%^&-?~*]){${count}})`, message);
    return this;
  }
  /**
   * Common format validators
   */
  isEmail(message = "Valid email address") {
    this.addPattern(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message
    );
    return this;
  }
  isURL(options = { protocol: true }, message = "Valid URL") {
    const protocol = options.protocol ? "https?:\\/\\/" : "";
    this.addPattern(
      `^${protocol}([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?$`,
      message
    );
    return this;
  }

  isIPv4(message = "Valid IPv4 address") {
    this.addPattern(
      "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
      message
    );
    return this;
  }

  isDate(format = "YYYY-MM-DD", message = `Valid date in ${format} format`) {
    const formats = {
      "YYYY-MM-DD": "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$",
      "MM/DD/YYYY": "^(?:0[1-9]|1[0-2])/(?:0[1-9]|[12]\\d|3[01])/\\d{4}$",
      "DD/MM/YYYY": "^(?:0[1-9]|[12]\\d|3[01])/(?:0[1-9]|1[0-2])/\\d{4}$",
      ISO: "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])T(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z|[+-](?:[01]\\d|2[0-3]):[0-5]\\d)$",
    };
    this.addPattern(formats[format] || formats["YYYY-MM-DD"], message);
    return this;
  }

  /**
   * -------------------- Presets
   */

  usePreset(type, level = "medium") {
    const preset = this.presets[type]?.[level];
    if (!preset) {
      throw new Error(`Preset not found: ${type}:${level}`);
    }

    preset.forEach(({ pattern, message }) => {
      this.addPattern(pattern, message);
    });

    return this;
  }

  /**
   *  Visualisation and testing
   */

  test(examples) {
    const regex = this.build();
    return examples.map((example) => ({
      value: example,
      isValid: regex.test(example),
      failedRequirements: this.getFailedRequirements(example),
    }));
  }

  visualize() {
    return {
      pattern: this.build().toString(),
      requirements: this.description,
    };
  }

  /**
   * --------------------------------------------------------------
   */

  // utility methods
  addPattern(pattern, message) {
    this.patterns.push(pattern);
    this.description.push(message);
    return this;
  }
  getFailedRequirements(value) {
    return this.patterns
      .map((pattern, index) => ({
        requirement: this.description[index],
        passed: new RegExp(pattern).test(value),
      }))
      .filter((result) => !result.passed)
      .map((result) => result.requirement);
  }

  build() {
    if (this.patterns.length === 0) return new RegExp(".*", this.flags);

    // Combine patterns with positive lookaheads for AND logic
    const pattern = this.patterns.map((p) => `(?=${p})`).join("") + ".+";
    return new RegExp(`^${pattern}$`, this.flags);
  }
}

export default RegexCraft;
