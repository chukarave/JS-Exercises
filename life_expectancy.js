ancestry = JSON.parse(require("./ancestry"));  // require the JSON file, parsed into an array

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
} // the average method, as provided in the exercise


// Your code here.
var centuries = {}; // empty object variable


ancestry.forEach(function(p) {  // ancestry array iteration
    // person's century and age are packed into variables
    var c = Math.ceil(p.died / 100);    
    var age = p.died - p.born;

    if (typeof centuries[c] === "undefined") {
        centuries[c] = [];
    } // if the current century does not exist in the centuries object, set the current century property to an empty array

    centuries[c].push(age); // push ALL the ages!
});

for (var i in centuries) {
    centuries[i] = average(centuries[i]);
}   // to calculate the avarage of the age array per century, use a for/in loop on the century properties and call the average method on its array

console.log(centuries);
// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94
