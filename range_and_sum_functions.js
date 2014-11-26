function range(start, end, step) {
    var allnum = [];
    var ascending;
    var descending;
    if (start < end) {
        // loop for cases in which the range start number is smaller than the range end.
        if (typeof step === "undefined") {
            // "smthng === undefined" IS A NO NO
             step = 1;
        // the argument is already automatically defined as a variable by JS. no need to explicitly assign it again.

        }

        for (ascending = start; ascending <= end; ascending += step) {
            allnum.push(ascending);
        }

    } else if (start > end) {  // loop for cases in which the range start number is larger than the range end
        if (typeof step === "undefined") {
             step = -1;
        }

        for (descending = start; descending >= end; descending += step) {
            allnum.push(descending);
        }

    }

    return allnum;
}


function sum(array1) {
    var total = 0;
    var i;
    var temp;

    for (i = 0; i < array1.length; i++) {
        temp = array1[i];
        temp = parseFloat(temp, 10);

        if (!temp) {
            temp = 0;
        }

        total += array1[i];
    }

    return total;
}


console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
