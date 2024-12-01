declare module "regexcraft" {
  interface PresetPattern {
    pattern: string;
    message: string;
  }

  interface Presets {
    password: {
      low: PresetPattern[];
      medium: PresetPattern[];
      high: PresetPattern[];
    };
    username: {
      low: PresetPattern[];
      medium: PresetPattern[];
      high: PresetPattern[];
    };
  }

  type;

  interface URLOptions {
    protocol?: boolean;
  }

  interface TestResult {
    value: string;
    isValid: boolean;
    failedRequirements: string[];
  }

  interface VisualizationResult {
    pattern: string;
    requirements: string[];
  }

  class RegexCraft {
    constructor();

    hasMinLength(length: number, message?: string): RegexCraft;
    hasMaxLength(length: number, message?: string): RegexCraft;
    hasLengthBetween(min: number, max: number, message?: string): RegexCraft;
    hasExactLength(length: number, message?: string): RegexCraft;
    hasLetter(count?: number, message?: string): RegexCraft;
    hasLowerCase(count?: number, message?: string): RegexCraft;
    hasUpperCase(count?: number, message?: string): RegexCraft;
    hasNumber(count?: number, message?: string): RegexCraft;
    hasSpecialCharacter(count?: number, message?: string): RegexCraft;

    isEmail(message?: string): RegexCraft;
    isURL(options?: URLOptions, message?: string): RegexCraft;
    isIPv4(message?: string): RegexCraft;
    isDate(format?: string, message?: string): RegexCraft;

    isPhone(country?: string, message?: string): RegexCraft;

    field(name: string, rules: string): RegexCraft;
    usePreset(
      type: "password" | "username",
      level?: "low" | "medium" | "high"
    ): RegexCraft;

    testOne(example: string): TestResult;
    test(examples: string[]): TestResult[];
    visualize(): VisualizationResult;
    build(): RegExp;

    private addPattern(pattern: string, message: string): RegexCraft;
    private getFailedRequirements(value: string): string[];
  }

  // Added a function to use Presets
  function usePresets(presets: Presets): void {
    // Placeholder function
  }

  export default RegexCraft;
}
