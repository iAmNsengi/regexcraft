# RegexCraft 🛠️

[![npm version](https://badge.fury.io/js/regexcraft.svg)](https://badge.fury.io/js/regexcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

RegexCraft is a powerful utility class for building and managing regular expressions with a fluent, chainable API. It simplifies the process of creating complex regex patterns while providing clear validation messages.

## Table of Contents

- [Features](#features-)
- [Installation](#installation-)
- [Quick Start](#quick-start-)
- [Usage Examples](#usage-examples-)
- [API Reference](#api-reference-)
- [Contributing](#contributing-)
- [License](#license-)
- [Support](#support-)
- [Author](#author-)

## Features ✨

- 🔗 Chainable API for building complex patterns
- 📝 Built-in validation presets for common use cases
- 🎯 Custom error messages for each validation rule
- 📱 Phone number validation for multiple countries (RW, DRC, US, UK, KE, UG, TZ, NG, ZA, GH)
- 🔒 Password strength validation
- 👤 Username format validation
- 📧 Email validation
- 🌐 URL validation
- 📅 Date format validation
- 🔍 Pattern testing and visualization

## Installation 📦

### Requirements

- Node.js 12.x or higher
- npm 6.x or higher

```bash
npm install regexcraft
# or
yarn add regexcraft
```

## Quick Start 🚀

```javascript
import RegexCraft from "regexcraft";

// Create a new instance
const regex = new RegexCraft();

// Test a single value
const result = regex
  .hasMinLength(8)
  .hasUpperCase(1)
  .hasLowerCase(1)
  .hasNumber(1)
  .hasSpecialCharacter(1)
  .testOne("MyPassword123!");

console.log(result);
// { value: "MyPassword123!", isValid: true, failedRequirements: [] }

// Test multiple values (still supported)
const results = regex.test(["MyPassword123!", "weak"]);
```

## Usage Examples 💡

### Password Validation

```javascript
const passwordValidator = new RegexCraft()
  .usePreset("password", "medium") // Use built-in presets
  .build();

// Or create custom rules
const customPassword = new RegexCraft()
  .hasMinLength(10)
  .hasUpperCase(2)
  .hasNumber(2)
  .hasSpecialCharacter(1)
  .build();
```

### Username Validation

```javascript
const usernameValidator = new RegexCraft()
  .usePreset("username", "standard")
  .build();
```

### Email Validation

```javascript
const emailValidator = new RegexCraft().isEmail().build();
```

### Phone Number Validation

```javascript
const phoneValidator = new RegexCraft()
  .isPhone("US") // Supports: US, UK, RW, DRC, KE, UG, TZ, NG, ZA, GH, international
  .build();

// Test a single phone number
const result = phoneValidator.testOne("+1234567890");

// Test multiple numbers
const results = phoneValidator.test(["+1234567890", "+254712345678"]);
```

### Form Field Validation

```javascript
const formValidator = new RegexCraft()
  .field("email", "required|email")
  .field("password", "password:high")
  .field("username", "username:strict")
  .build();
```

### React Example

```jsx
import RegexCraft from "regexcraft";
import { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    const validator = new RegexCraft().usePreset(field, "high").build();
    const result = validator.test([value]);
    if (!result) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validator.getErrorMessage(),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validate(name, value);
  };

  return (
    <form>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.username && <p>{errors.username}</p>}
      {errors.password && <p>{errors.password}</p>}
      {errors.email && <p>{errors.email}</p>}
    </form>
  );
}

export default SignupForm;
```

### Vanilla JavaScript Example

```javascript
const form = document.querySelector("#signupForm");
const emailInput = form.querySelector('input[name="email"]');
const errorContainer = form.querySelector(".error-messages");

const validator = new RegexCraft();

emailInput.addEventListener("input", (e) => {
  const email = e.target.value;
  validator.field("email", "required|email");

  const result = validator.test([email])[0];
  errorContainer.innerHTML = "";

  if (!result.isValid) {
    result.failedRequirements.forEach((error) => {
      const errorElement = document.createElement("p");
      errorElement.textContent = error;
      errorContainer.appendChild(errorElement);
    });
  }
});
```

## API Reference 📚

### Basic Validators

| Method                                 | Description              | Example                    |
| -------------------------------------- | ------------------------ | -------------------------- |
| `hasMinLength(length, message?)`       | Validates minimum length | `.hasMinLength(8)`         |
| `hasMaxLength(length, message?)`       | Validates maximum length | `.hasMaxLength(20)`        |
| `hasLengthBetween(min, max, message?)` | Validates length range   | `.hasLengthBetween(8, 20)` |
| `hasExactLength(length, message?)`     | Validates exact length   | `.hasExactLength(10)`      |

### Character Type Validators

| Method                                  | Description                 | Example                  |
| --------------------------------------- | --------------------------- | ------------------------ |
| `hasLetter(count?, message?)`           | Requires letters            | `.hasLetter(2)`          |
| `hasLowerCase(count?, message?)`        | Requires lowercase letters  | `.hasLowerCase()`        |
| `hasUpperCase(count?, message?)`        | Requires uppercase letters  | `.hasUpperCase(1)`       |
| `hasNumber(count?, message?)`           | Requires numbers            | `.hasNumber(2)`          |
| `hasSpecialCharacter(count?, message?)` | Requires special characters | `.hasSpecialCharacter()` |

### Format Validators

| Method                        | Description             | Example                      |
| ----------------------------- | ----------------------- | ---------------------------- |
| `isEmail(message?)`           | Validates email format  | `.isEmail()`                 |
| `isURL(options?, message?)`   | Validates URL format    | `.isURL({ protocol: true })` |
| `isIPv4(message?)`            | Validates IPv4 address  | `.isIPv4()`                  |
| `isDate(format?, message?)`   | Validates date format   | `.isDate('YYYY-MM-DD')`      |
| `isPhone(country?, message?)` | Validates phone numbers | `.isPhone('US')`             |

### Presets

```javascript
// Available preset types and levels
const presets = {
  password: ["low", "medium", "high"],
  username: ["standard", "strict"],
};

// Usage
regex.usePreset("password", "high");
```

### Testing and Visualization

```javascript
// Test multiple values
const results = regex.test(["test1", "test2"]);

// Visualize the pattern
const visualization = regex.visualize();
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💖

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

## Author ✍️

Eliezer Nsengi

- GitHub: [@iAmNsengi](https://github.com/iAmNsengi)

## Acknowledgments 🙏

- Thanks to all contributors who have helped shape RegexCraft
- Inspired by the need for simpler regex pattern creation
