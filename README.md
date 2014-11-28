weighted-password-generator
===========================

Weighted (loosely) password generator module for JavaScript

```javascript
// Adding a new character class
var accentedChars = new WeightedPasswordGen.charClass("àçèêé");  // Make sure you specify UTF8 encoding if you try this example
accentedChars.weight = 50;
WeightedPasswordGen.charClasses["accentedChars"] = accentedChars;

// Modifying the password length
WeightedPasswordGen.setPasswordLength(8);

// Modifying an included character class
WeightedPasswordGen.charClasses["lowerLetters"].enabled = false;

// Generating a password
var newPassword = WeightedPasswordGen.genPassword();
```
