
function every(array, predicate) {  
  for (var i = 0; i < array.length; i++) {
    if (!predicate(array[i])) { 
      return false; //if the predicate returns false once, return false immediately and quit the function.
    }
  }

  return true; // if no false has been returned continue to return true
};


function some(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return true;  // If one of the elements is true it is enough in order to return true and quit the function.
    }
  }

  return false; // if no true has been returned continue to return false
};


console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
