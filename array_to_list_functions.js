// Your code here.
function arrayToList(array1) {   // converts an array into a list by looping over the array backwords and changing the list variable
    var last = array1.length -1;
    var list;
    var i;

    for (i = last; i >= 0; i--) {
        list = {value: (array1[i]), rest: list};
    }

    return list;
}

function listToArray(list) {   // converts a list into an array by looping over the list and pushing list.value into the array.
    var node;
    var array1 = [];

    for (node = list; node; node = node.rest) { // navigating to the next list element is done by referring to the list.rest property.
        array1.push(node.value);
    }

    return array1;
}

function prepend(element, next) {  // this function gets the value and rest as arguments and creates a new list with them.
    var list;
    list = {
        value: element,
        rest: next
    };

    return list;
}

function nth(list, num) {
    var node = list;
    var i = 0;

    while (node && i < num) {   // the while loop gets two consecutive conditions. This resolves having to compare num with i at a later point.
        node = node.rest;
        i++;
    }

    if (!node) return undefined; // if there is no value in the position specified return undefined.

    return node.value;
    /*
       for (; node && i < num; node = node.rest) {
       for (node = list; node; node = node.rest) {
       if (i === num) {
       value = node.value;
       console.log(list(20));
       }
       else {
       i++;
       }
       }

       return value;
       */
}



console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30, 40]), 1));
// → 20
