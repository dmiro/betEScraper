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
}
