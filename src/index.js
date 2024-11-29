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

  // Length validators

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

  // presets
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

  // utility methods
  addPattern(pattern, message) {
    this.patterns.push(pattern);
    this.description.push(message);
    return this;
  }

  test(examples) {
    const regex = this.build();
    return examples.map((example) => ({
      value: example,
      isValid: regex.test(example),
    }));
  }

  visualize() {
    return {
      pattern: this.build().toString(),
      requirements: this.description,
    };
  }

  build() {
    if (this.patterns.length === 0) return new RegExp(".*", this.flags);

    // Combine patterns with positive lookaheads for AND logic
    const pattern = this.patterns.map((p) => `(?=${p})`).join("") + ".+";
    return new RegExp(`^${pattern}$`, this.flags);
  }
}

export default RegexCraft;
