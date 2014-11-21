// Your code here.
function reverseArray(array) {
    var last = array.length - 1
        var newarray = []
        for (var i = last; i >= 0; i--) {
            newarray.push(array[i]);
        }
    return newarray
}


function reverseArrayInPlace(arrayValue) {
    half = (Math.floor(arrayValue.length / 2));
        for (i = 0; i < half; i++) {
            var save = arrayValue[i]
                var beforelast = arrayValue.length - 1 - i
                arrayValue[i] = (arrayValue[beforelast]);
            arrayValue[beforelast] = save;
        }
    return arrayValue

}
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
