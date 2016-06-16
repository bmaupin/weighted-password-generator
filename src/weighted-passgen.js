var WeightedPasswordGen = (function () {
  var charClass = function(chars) {
    this.chars = chars;
    this.enabled = true;
    this.weight = 1;
  };

  // Leave out easily confused characters by default (l, I, 1, O, 0)
  var _lowerLetters = new charClass('abcdefghijkmnopqrstuvwxyz');
  // Give lowercase characters greater weight by default
  _lowerLetters.weight = 25;
  var _upperLetters = new charClass('ABCDEFGHJKLMNPQRSTUVWXYZ');
  var _numbers = new charClass('23456789');
  var _symbols = new charClass('!@#$%^&*-=_+?');

  var charClasses = {
    'lowerLetters': _lowerLetters,
    'upperLetters': _upperLetters,
    'numbers': _numbers,
    'symbols': _symbols
  };

  var _passwordLength = 16;

  var _getWeightedRandomClass = function() {
    var cumulativeWeight = 0;
    var totalWeight = 0;

    // Calculate the total weight
    for (var className in charClasses) {
      // Don't include disabled classes
      if (charClasses[className].enabled === true) {
        totalWeight += charClasses[className].weight;
      }
    }

    var random = (Math.random() * totalWeight);

    for (className in charClasses) {
      // Don't include disabled classes
      if (charClasses[className].enabled === true) {
        cumulativeWeight += charClasses[className].weight;
        if (random < cumulativeWeight) {
          return charClasses[className];
        }
      }
    }
  };

  var _shuffle = function(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    return array;
  };

  var genPassword = function() {
    var passwordChars = [];

    // Make sure we include at least one character from all enabled classes
    // (this isn't a strict weighted random)
    for (var className in charClasses) {
      if (charClasses[className].enabled === true) {
        // Get a random character from the character class
        passwordChars.push(
          charClasses[className].chars.charAt(
            Math.floor(
              Math.random() * charClasses[className].chars.length
            )
          )
        );
      }
    }

    // Now fill the remaining characters
    for (var i = 0, len = _passwordLength - passwordChars.length; i < len; i++) {
      charClass = _getWeightedRandomClass();
      // Get a random character from the character class
      passwordChars.push(
        charClass.chars.charAt(
          Math.floor(
            Math.random() * charClass.chars.length
          )
        )
      );
    }

    // Now shuffle it all up for good measure
    passwordChars = _shuffle(passwordChars);
    // And put it all together in a string
    return passwordChars.join('');
  };

  var getPasswordLength = function() {
    return _passwordLength;
  };

  var setPasswordLength = function(newPasswordLength) {
    _passwordLength = newPasswordLength;
  };

  return {
    charClass: charClass,
    charClasses: charClasses,
    genPassword: genPassword,
    getPasswordLength: getPasswordLength,
    setPasswordLength: setPasswordLength,
  };
})();
