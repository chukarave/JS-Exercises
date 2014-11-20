function range(start, end, step) {
	var allnum = []
 	  if (start < end) {
        if (step === undefined) {
          var step = 1 }
        for (var ascending = start; ascending <= end; ascending += step) {
        allnum.push(ascending);
        }
      } else if (start > end) {
        if (step === undefined) {
          var step = -1 }
        for (var descending = start; descending >= end; descending += step) {
  		allnum.push(descending);
 	 	} 
      }
  return allnum 
}     


function sum(array)	{
  var total = 0 
  for (var i in array) {
  	total += array[i];
  } 
	return total
}


console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
