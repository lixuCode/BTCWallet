"use strict";

var validatorFunctions = require("./validatorFunctions"),
  _ = require("lodash");

function Preconditions (objectUnderTest) {
  //out = Object Under Test
  this.out = objectUnderTest;
}

/**
 * Loops through all of the variables (based on dot notation) in the 'out' object and executes the verification function on each.
 * Example: - configPath = "variable1.variable2.variable3"
 *          - validate will verify that { variable1: { variable2: {variable3: "val"}}} exists &
 *          - that the verification function is true on variable3
 * @param configPath
 * @param verification
 */
Preconditions.prototype.validate = function (configPath, verification, message) {
  var variables = configPath.split(".");

  var current = this.out || {};
  var count = 0;

  _.forEach(variables, function (variable) {
    //If statement needed because we need to be able to verify shouldBeUndefined.
    if (count !== variables.length-1) {
      validatorFunctions.shouldBeDefined(current[variable], message);
    }

    current = current[variable];
    count++;
  });

  verification(current);
};

Preconditions.prototype.shouldBeDefined = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeDefined(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldBeUndefined = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeUndefined(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeNonEmptyArray = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeArray(val, message);
    validatorFunctions.shouldNotBeEmpty(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeArray = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeArray(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeArray = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeArray(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeObject = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeObject(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeObject = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeObject(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeEmpty = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeEmpty(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeEmpty = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeEmpty(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeFunction = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeFunction(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeFunction = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeFunction(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeString = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeString(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeString = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeString(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeNumber = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeNumber(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeNumber = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeNumber(val, message);
  }, message);

  return this;
};


Preconditions.prototype.shouldBeFinite = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeFinite(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldBeInfinite = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeInfinite(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeBoolean = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeBoolean(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeBoolean = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeBoolean(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeDate = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeDate(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeDate = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeDate(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeRegExp = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeRegExp(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeRegExp = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeRegExp(val, message);
  }, message);

  return this;
};

Preconditions.prototype.shouldBeFalsey = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldBeFalsey(val, message);
  }, message);

  return this;
};
Preconditions.prototype.shouldNotBeFalsey = function (configPath, message) {
  this.validate(configPath, function (val) {
    validatorFunctions.shouldNotBeFalsey(val, message);
  }, message);

  return this;
};

Preconditions.prototype.checkArgument = function (val, message) {
  validatorFunctions.checkArgument(val, message);
  return this;
};
Preconditions.prototype.checkState = function (val, message) {
  validatorFunctions.checkState(val, message);
  return this;
};

Preconditions.prototype.checkElementIndex = function (index, size, message) {
  validatorFunctions.checkElementIndex(index, size, message);
  return this;
};
Preconditions.prototype.checkPositionIndex = function (index, size, message) {
  validatorFunctions.checkPositionIndex(index, size, message);
  return this;
};
Preconditions.prototype.checkPositionIndexes = function (start, end, size, message) {
  validatorFunctions.checkPositionIndexes(start, end, size, message);
  return this;
};

module.exports = {

  /**
   * Validate ObjectUnderTest with preconditions object.
   * @param objectUnderTest - Object Under Test
   * @returns Preconditions object with object for testing.
   */
  instance: function (objectUnderTest) {
    return new Preconditions(objectUnderTest);
  },
  constructor: function () {
    return Preconditions;
  },
  singleton: function () {
    return validatorFunctions;
  }

};