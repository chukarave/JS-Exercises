// Your code here.
function deepEqual(object, object1) {
    var count = 0;
    var count1 = 0;
    var obj;
    var obj1;
    if (typeof object !== "object" || typeof object1 !== "object" ||
            object === null || object1 === null) {
                return false;
            }
    // in this case it was better to have negative if conditions, and return false each time they are met.
    // instead of writing an "else" to each condition that fails, the program will just go on to the next block of code.
    // At the end of the function, if no false was returned till then, true will be returned once.
    for (obj in object) {
        if (object.hasOwnProperty(obj)) {
            count++;
        }
    }
    // This part loops over the properties of an object and counts them.
    for (obj1 in object1) {
        if (object1.hasOwnProperty(obj1)) {
            count1++;
        }
    }
    if (count !== count1) {
        return false;
    }
    // If the number of properties is not the same, return false. If it is, continue to compare the values.
    for (obj in object) {
        if (!object1.hasOwnProperty(obj)) {
            return false;
        }
        // if the properties of object1 are not named the same as the properties in object (represented by the variable obj), return false.

        // if (typeof object[obj] === "object" && typeof object1[obj] === "object") {
        // the above code could perform the same function, but it actually does the same as the block in the beginning of the function.
        // This justified a recursive call to the function with the object properties (object[obj]) as arguments.

        if (!deepEqual(object[obj], object1[obj])) {
            if (object[obj] !== object1[obj]) {
                return false;
            }
        }
    }

        // If the recursive call to the function returns false, it could be that:
        // - not both object properties are object themselves
        // - they are both objects, but might not have the same number of properties
        // - they do have the same number of properties but not the same property names
        // - they have the same property name but not the same values (this already requires a second recursion)
        // - if none is false, return true
    return true;
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual({a: 0/0}, {a: 0/0}));
// → false, should be true. This is going to be hard to fix ;)
