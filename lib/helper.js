var singularize = require("inflection").singularize;

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
};

//Singularize arrays (named array elements)
exports.singularizeArrays = function(miObject) {
    return JSON.parse(JSON.stringify(miObject, function(key, value) {
        if (value && (Array.isArray(value))) {
            var replacement = [];
            for (var k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                    var singular = (key) ? singularize(key) : "item";
                    var m = {};
                    m[singular] = value[k];
                    replacement[k] = m;
                }
            }
            return replacement;
        }
        return value;
    }));
};


//Flatten js object and return in CSV format
exports.flattenjs2csv = function(obj) { 
    
    var flattenjs2csv = function(obj) {
        
        var addCol = function(line, obj) {
            if (line.length > 0) line += ',';
            line += JSON.stringify(obj).replace(/"/g, '');
            return line;
        };
        
        var addCols = function (dest, objA, objB){
            objB.forEach(function (val, index) {
                if (index > 0)     
                    dest.push(addCol(objA[1], val));
                else if (dest.length === 0) 
                    dest.push(addCol(objA[0], val));     
            });
            return dest;
        };
            
        var flatObj = function(obj) {
            if (Array.isArray(obj))
                return ['',''];
            if ((typeof obj !== 'object') || (obj instanceof Date))
               return ['item', addCol('',obj)];
            var res = ['','']; 
            for (var i in obj) {
                if ((typeof obj[i] !== 'object') || (obj[i] instanceof Date)) {
                    res[0] = addCol(res[0], i);
                    res[1] = addCol(res[1], obj[i]);   
                }
            }
            return res;   
        };
        
        var res = [];
        var objA = flatObj(obj); 
        for (var i in obj) {
            if (Array.isArray(obj[i])) {
                for (var x in obj[i]) {
                    if(Object.prototype.hasOwnProperty.call( obj[i], x)){
                        var objB = flattenjs2csv(obj[i][x]); 
                        res = addCols(res, objA, objB);
                    }
                }
            }    
        }
        return (res.length===0) ? objA : res;
    };
    
    var res = '';
    flattenjs2csv(obj).forEach( function(entry) {
        res += entry + '\n';   
    });
    return res;
};
