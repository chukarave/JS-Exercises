// Your code here.
function reverseArray(array1) {
    var last = array1.length - 1;
    var newarray = [];
    var i;

    for (i = last; i >= 0; i--) {
        newarray.push(array1[i]);
    }

    return newarray;
}


function reverseArrayInPlace(arrayValue) {
    var half = (Math.floor(arrayValue.length / 2));
    var i;
    var save;
    var beforelast;

    for (i = 0; i < half; i++) {
        save = arrayValue[i];
        beforelast = arrayValue.length - 1 - i;
        arrayValue[i] = arrayValue[beforelast];
        arrayValue[beforelast] = save;
    }

    return arrayValue;

}
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
