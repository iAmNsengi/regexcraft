/**
 * RegexCraft - A utility class for building regular expressions.
 * Provides a good interface for creating common regex patterns.
 */

class RegexCraft {
  /**
   * Creates a new RegexCraft instance
   * @constructor
   */
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
          { pattern: "(?=.{10,})", message: "At least 10 characters" },
          {
            pattern: "(?=(?:.*\\d){2})",
            message: "At least two numbers",
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
   * Validates minimum length of the input
   * @param {number} length - Minimum number of characters required
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasMinLength(length, message = `Minimum length of ${length} characters`) {
    this.addPattern(`^.{${length},}$`, message);
    return this;
  }

  /**
   * Validates maximum length of the input
   * @param {number} length - Maximum number of characters allowed
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasMaxLength(length, message = `Maximum length of ${length} characters`) {
    this.addPattern(`^.{0,${length}}$`, message);
    return this;
  }

  /**
   * Validates that input length falls within specified range
   * @param {number} min - Minimum number of characters required
   * @param {number} max - Maximum number of characters allowed
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasLengthBetween(
    min,
    max,
    message = `Length should be between ${min} and ${max} characters`
  ) {
    this.addPattern(`^.{${min},${max}}$`, message);
    return this;
  }
  /**
   * Validates that input has exact length
   * @param {number} length - Required exact length
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasExactLength(
    length,
    message = `Length should be exactly ${length} characters`
  ) {
    this.addPattern(`(?=^.{${length}}$)`, message);
    return this;
  }

  /**
   * Requires specified number of letters (a-z, A-Z)
   * @param {number} [count=1] - Minimum number of letters required
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasLetter(
    count = 1,
    message = `At least ${count} letter${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?=.*[a-zA-Z]){${count}})`, message);
    return this;
  }

  /**
   * Requires specified number of lowercase letters
   * @param {number} [count=1] - Minimum number of lowercase letters required
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
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
  /**
   * Requires specified number of numbers
   * @param {number} [count=1] - Minimum number of numbers required
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasNumber(
    count = 1,
    message = `At least ${count} number${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?:.*\\d)${count})`, message);
    return this;
  }
  /**
   * Requires specified number of special characters
   * @param {number} [count=1] - Minimum number of special characters required
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  hasSpecialCharacter(
    count = 1,
    message = `At least ${count} special character${count > 1 ? "s" : ""}`
  ) {
    this.addPattern(`(?=(?=.*[!@#$%^&*?~]){${count}})`, message);
    return this;
  }
  /**
   * Common format validators
   */
  /**
   * Validates email format
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  isEmail(message = "Must be a valid email address") {
    this.addPattern(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message
    );
    return this;
  }
  /**
   * Validates URL format
   * @param {Object} [options] - URL validation options
   * @param {boolean} [options.protocol=true] - Whether to require protocol (http/https)
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  isURL(options = { protocol: true }, message = "Valid URL") {
    const protocol = options.protocol ? "https?:\\/\\/" : "";
    this.addPattern(
      `^${protocol}([\\w-]+\\.)+[\\w-]+(\\/[\\w- ./?%&=]*)?$`,
      message
    );
    return this;
  }

  /**
   * Validates IPv4 address format
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  isIPv4(message = "Valid IPv4 address") {
    this.addPattern(
      "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
      message
    );
    return this;
  }

  /**
   * Validates date format
   * @param {string} [format="YYYY-MM-DD"] - Date format to validate against
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
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
   * Phone number validators
   */

  /**
   * Validates phone number format for different countries
   * @param {string} [country="international"] - Country code for phone format
   * @param {string} [message] - Custom error message
   * @returns {RegexCraft} Returns this for method chaining
   */
  isPhone(country = "international", message) {
    const phonePatterns = {
      RW: "^(?:\\+?250|0)?7[2-9]\\d{7}$",
      DRC: "^(?:\\+?243|0)?8[1-9]\\d{7}$",
      US: "^\\+?1?[-.]?\\(?[0-9]{3}\\)?[-.]?[0-9]{3}[-.]?[0-9]{4}$",
      UK: "^\\+?44\\s?\\d{10}$",
      KE: "^(?:\\+?254|0)?[71]\\d{8}$",
      UG: "^(?:\\+?256|0)?[7]\\d{8}$",
      TZ: "^(?:\\+?255|0)?[67]\\d{8}$",
      NG: "^(?:\\+?234|0)?[789]\\d{9}$",
      ZA: "^(?:\\+?27|0)?[6-8]\\d{8}$",
      GH: "^(?:\\+?233|0)?[235]\\d{8}$",
      international:
        "\\+?\\d{1,4}?[-.]?\\(?\\d{1,3}?\\)?[-.]?\\d{1,4}[-.]?\\d{1,4}[-.]?\\d{1,9}",
      E164: "^\\+[1-9]\\d{1,14}$",
    };

    this.addPattern(
      phonePatterns[country] || phonePatterns["international"],
      message || `Valid ${country} phone number`
    );
    return this;
  }

  /**
   * Form field validators
   */

  /**
   * Applies validation rules to a form field
   * @param {string} name - Field name
   * @param {string} rules - Pipe-separated list of validation rules
   * @returns {RegexCraft} Returns this for method chaining
   */
  field(name, rules) {
    const ruleList = rules.split("|");
    ruleList.forEach((rule) => {
      const [ruleName, params] = rule.split(":");
      switch (ruleName) {
        case "required":
          this.addPattern(".+", `${name} is required`);
          break;
        case "email":
          this.isEmail(`${name} must be a valid email`);
          break;
        case "phone":
          this.isPhone(params, `${name} must be a valid phone number`);
          break;
        case "password":
          this.usePreset("password", params || "medium");
          break;
        case "username":
          this.usePreset("username", params || "standard");
          break;
        case "min":
          this.hasMinLength(
            parseInt(params),
            `${name} must be at least ${params} characters`
          );
          break;
        case "max":
          this.hasMaxLength(
            parseInt(params),
            `${name} must be at most ${params} characters`
          );
          break;
        case "exact":
          this.hasExactLength(
            parseInt(params),
            `${name} must be exactly ${params} characters`
          );
          break;
        case "url":
          this.isURL({}, `${name} must be a valid URL`);
          break;
        case "date":
          this.isDate(params, `${name} must be a valid date`);
          break;
        default:
          throw new Error(`Unknown validation rule: ${ruleName}`);
      }
    });
    return this;
  }
  /**
   * -------------------- Presets
   */

  /**
   * Applies a preset validation pattern
   * @param {string} type - Preset type (e.g., 'password', 'username')
   * @param {string} [level="medium"] - Validation strictness level
   * @returns {RegexCraft} Returns this for method chaining
   * @throws {Error} If preset type or level is not found
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

  /**
   * Tests a single example against the built regex pattern
   * @param {string} example - String to test
   * @returns {{value: string, isValid: boolean, failedRequirements: string[]}} Test result
   */
  testOne(example) {
    const regex = this.build();
    return {
      value: example,
      isValid: regex.test(example),
      failedRequirements: this.getFailedRequirements(example),
    };
  }

  /**
   * Tests examples against the built regex pattern
   * @param {string[]} examples - Array of strings to test
   * @returns {Array<{value: string, isValid: boolean, failedRequirements: string[]}>} Test results
   */
  test(examples) {
    return examples.map((example) => this.testOne(example));
  }

  /**
   * Returns the current regex pattern and requirements
   * @returns {{pattern: string, requirements: string[]}} Visualization object
   */
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
  /**
   * Adds a pattern and its description to the RegexCraft instance
   * @private
   * @param {string} pattern - Regex pattern to add
   * @param {string} message - Description of the pattern
   * @returns {RegexCraft} Returns this for method chaining
   */
  addPattern(pattern, message) {
    this.patterns.push(pattern);
    this.description.push(message);
    return this;
  }
  /**
   * Gets list of failed requirements for a value
   * @private
   * @param {string} value - Value to test
   * @returns {string[]} Array of failed requirement messages
   */
  getFailedRequirements(value) {
    return this.patterns
      .map((pattern, index) => ({
        requirement: this.description[index],
        passed: new RegExp(pattern).test(value),
      }))
      .filter((result) => !result.passed)
      .map((result) => result.requirement);
  }

  /**
   * Builds the final regex pattern
   * @returns {RegExp} Combined regular expression
   */
  build() {
    if (this.patterns.length === 0) return new RegExp(".*", this.flags);

    // Combine patterns with positive lookaheads for AND logic
    const pattern = this.patterns.map((p) => `(?=${p})`).join("") + ".+";
    return new RegExp(`^${pattern}$`, this.flags);
  }
}

export default RegexCraft;
