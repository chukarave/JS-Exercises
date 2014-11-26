var isNumber = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
}


 // Is the given value `NaN`? (NaN is the only number which does not equal itself).
var isNaN = function(obj) {
return isNumber(obj) && obj !== +obj;
};

console.log("true", isNaN(0/0));
console.log("false", isNaN(1));
console.log("false", isNaN(true));
console.log("false", isNaN({}));
console.log("false", isNaN(null));
console.log("false", isNaN([]));
