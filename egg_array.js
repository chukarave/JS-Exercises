// Modify these definitions...

topEnv["array"] = function(i) {
  return Array.prototype.slice.call(arguments, 0);
};

topEnv["length"] = function(arr) {
  return arr.length;
};

topEnv["element"] = function(arr, i) {
  return arr[i];
};

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
// → 6
