function range(start, end, step) {
    var allnum = [];
    var ascending;
    var descending;    
    if (start < end) {
        if (step === undefined) {
             step = 1;
        }

        for (ascending = start; ascending <= end; ascending += step) {
            allnum.push(ascending);
        }

    } else if (start > end) {
        if (step === undefined) {
             step = -1;
        }

        for (descending = start; descending >= end; descending += step) {
            allnum.push(descending);
        } 

    }

    return allnum; 
}     


function sum(array1)	{
    var total = 0; 

    for (var i in array1) {
        total += array1[i];
    } 

    return total;
}


console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
