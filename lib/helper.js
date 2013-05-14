//Format emulate
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return args[n];
  });
};

//Array of numbers located in the string
String.prototype.numbers = function () {
    return this.match(/\d+/g);
};

//First number located in the string
String.prototype.firstNumber = function () {
    var m;
    if ((m = this.match(/\d+/)) !== null){
        return m[0];
    }
};

//Delete all blank spaces
String.prototype.deleteBlankSpaces = function () {
    return this.replace(/\s/gi,"");
};

//Delete all pattern occurrences 
String.prototype.deleteOccurrences = function (pattern) {
    return this.replace (RegExp(pattern,'gi'),"");
};

//Replace all pattern occurrences 
String.prototype.replaceOccurrences = function (pattern, replace) {
    return this.replace (RegExp(pattern,'gi'),replace);
};

//Apply string format to all elements of array and return result
Array.prototype.format=function(prefix)
{
    var result = [];
    this.forEach(function(entry) {
        result.push(prefix.format(entry));
    });
    return result;
};

//Return last element of array
Array.prototype.last = Array.prototype.last || function() {
    var l = this.length;
    return this[l-1];
};

//Date format
Date.prototype.format = function(fstr, utc) {
  var that = this;
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return that[utc + 'FullYear'] ();
    case '%m': m = 1 + that[utc + 'Month'] (); break;
    case '%d': m = that[utc + 'Date'] (); break;
    case '%H': m = that[utc + 'Hours'] (); break;
    case '%M': m = that[utc + 'Minutes'] (); break;
    case '%S': m = that[utc + 'Seconds'] (); break;
    default: return m.slice (1); 
    }    
    return ('0' + m).slice (-2);
  });
};

//Validate date
exports.isValidDate = function(d) {
    if (Object.prototype.toString.call(d) !== "[object Date]") return false;
    return !isNaN(d.getTime());
}
