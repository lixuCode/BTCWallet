"use strict";

var constants = require("./constants"),
  _ = require("lodash");

var validatorFunctions = {
  shouldBeDefined: function (val, message) {
    if(_.isUndefined(val)) {
      var msg = message || constants.ShouldBeDefined;
      throw new Error(msg);
    }
    return this;
  },
  shouldBeUndefined: function (val, message) {
    if(!_.isUndefined(val)) {
      var msg = message || constants.ShouldBeUndefined;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeArray: function (val, message) {
    if(!_.isArray(val)) {
      var msg = message || constants.ShouldBeArray;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeArray: function (val, message) {
    if(_.isArray(val)) {
      var msg = message || constants.ShouldNotBeArray;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeObject: function (val, message) {
    if(!_.isObject(val)) {
      var msg = message || constants.ShouldBeObject;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeObject: function (val, message) {
    if(_.isObject(val)) {
      var msg = message || constants.ShouldNotBeObject;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeEmpty: function (val, message) {
    if(!_.isEmpty(val)) {
      var msg = message || constants.ShouldBeEmpty;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeEmpty: function (val, message) {
    if(_.isEmpty(val)) {
      var msg = message || constants.ShouldNotBeEmpty;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeFunction: function (val, message) {
    if(!_.isFunction(val)) {
      var msg = message || constants.ShouldBeFunction;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeFunction: function (val, message) {
    if(_.isFunction(val)) {
      var msg = message || constants.ShouldNotBeFunction;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeString: function (val, message) {
    if(!_.isString(val)) {
      var msg = message || constants.ShouldBeString;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeString: function (val, message) {
    if(_.isString(val)) {
      var msg = message || constants.ShouldNotBeString;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeNumber: function (val, message) {
    if(!_.isNumber(val)) {
      var msg = message || constants.ShouldBeNumber;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeNumber: function (val, message) {
    console.log("val: " + val);
    if(_.isNumber(val)) {
      var msg = message || constants.ShouldNotBeNumber;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeFinite: function (val, message) {
    if(!_.isFinite(val)) {
      var msg = message || constants.ShouldBeFinite;
      throw new Error(msg);
    }
    return this;
  },
  shouldBeInfinite: function (val, message) {
    if(_.isFinite(val)) {
      var msg = message || constants.ShouldBeInfinite;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeBoolean: function (val, message) {
    if(!_.isBoolean(val)) {
      var msg = message || constants.ShouldBeBoolean;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeBoolean: function (val, message) {
    if(_.isBoolean(val)) {
      var msg = message || constants.ShouldNotBeBoolean;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeDate: function (val, message) {
    if(!_.isDate(val)) {
      var msg = message || constants.ShouldBeDate;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeDate: function (val, message) {
    if(_.isDate(val)) {
      var msg = message || constants.ShouldNotBeDate;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeRegExp: function (val, message) {
    if(!_.isRegExp(val)) {
      var msg = message || constants.ShouldBeRegExp;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeRegExp: function (val, message) {
    if(_.isRegExp(val)) {
      var msg = message || constants.ShouldNotBeRegExp;
      throw new Error(msg);
    }
    return this;
  },

  shouldBeFalsey: function (val, message) {
    if(!_.isNaN(val) && !_.isNull(val) && !_.isUndefined(val)) {
      var msg = message || constants.ShouldBeFalsey;
      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeFalsey: function (val, message) {
    if(_.isNaN(val) || _.isNull(val) || _.isUndefined(val)) {
      var msg = message || constants.ShouldNotBeFalsey;
      throw new Error(msg);
    }
    return this;
  },

  checkArgument: function (val, message) {
    if(!val) {
        var msg = message || constants.IllegalArgument;
        throw new Error(msg);
    }
    return this;
  },
  checkState: function (val, message) {
    if(!val) {
      var msg = message || constants.IllegalState;
      throw new Error(msg);
    }
    return this;
  },

  checkElementIndex: function (index, size, message) {
    if (index < 0 || index >= size) {
      var msg = message || constants.ShouldHaveValidIndex;
      throw new Error(msg);
    }
    return this;
  },
  checkPositionIndex: function (index, size, message) {
    if (index < 0 || index > size) {
      var msg = message || constants.ShouldHaveValidPosition;
      throw new Error(msg);
    }
    return this;
  },
  checkPositionIndexes: function (start, end, size, message) {
    var msg;
    if (end < start) {
      msg = message || constants.StartBeforeEnd;
      throw new Error(msg);
    }
    if (start < 0 || end > size) {
      msg = message || constants.ShouldHaveValidPositions;
      throw new Error(msg);
    }
    return this;
  }
};

module.exports = validatorFunctions;