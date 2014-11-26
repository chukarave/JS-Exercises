var arrays = [[1, 2, 3], [4, 5], [6]];
var newarr = []
console.log(arrays.reduce(function(newarr, arrays) {
    newarr = newarr.concat(arrays);
    return newarr;	
}));

// Your code here.
// → [1, 2, 3, 4, 5, 6]


function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

// Your code here.
var mothers = [filter(ancestry, function(person) {
    return person.mother;
})];
var child = [ancestry.hasOwnProperty("mother")];

console.log(mothers)
    // → 31.2


