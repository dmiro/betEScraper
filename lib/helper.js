// Format emulate
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return args[n];
  });
};

// array of numbers located in the string
String.prototype.numbers = function () {
    return this.match(/\d+/g);
};

// first number located in the string
String.prototype.firstNumber = function () {
    var m;
    if ((m = this.match(/\d+/)) !== null){
        return m[0];
    }
};

// delete all blank spaces
String.prototype.deleteBlankSpaces = function () {
    return this.replace(/\s/gi,"");
};

//delete all pattern occurrences 
String.prototype.deleteOccurrences = function (pattern) {
    return this.replace (RegExp(pattern,'gi'),"");
};

//replace all pattern occurrences 
String.prototype.replaceOccurrences = function (pattern, replace) {
    return this.replace (RegExp(pattern,'gi'),replace);
};

// apply string format to all elements of array and return result
Array.prototype.format=function(prefix)
{
    var result = [];
    this.forEach(function(entry) {
        result.push(prefix.format(entry));
    });
    return result;
};

// return last element of array
Array.prototype.last = Array.prototype.last || function() {
    var l = this.length;
    return this[l-1];
};

// return UTC Month formatted
Date.prototype.getUTCMonthFormatted = function() {
    var month = this.getUTCMonth();
    return month < 10 ? '0' + (month+1) : month+1;
};

// return UTC Date formatted
Date.prototype.getUTCDateFormatted = function() {
    var date = this.getUTCDate();
    return date < 10 ? '0' + date : date; 
};

// validate date
exports.isValidDate = function(d) {
    if (Object.prototype.toString.call(d) !== "[object Date]") return false;
    return !isNaN(d.getTime());
}
