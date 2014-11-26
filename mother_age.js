ancestry = JSON.parse(require("./ancestry"));  // require the JSON file, parsed into an array

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}  // the average method, as provided in the exercise

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
}); // the byName variable, as provided in the exercise

function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
} // Filter function - take an existing array and perform a test on it. return a new array containing all object for which the test === 'true'

if (typeof Array.prototype.map === "undefined") {
    Array.prototype.map = function (array, transform) {
        var mapped = [];
        for (var i = 0; i < array.length; i++)
            mapped.push(transform(array[i]));
        return mapped;
    }; // If the browser has no prototype map method, use the explicit one
}; // map function - take an existing array and perform an action on it. return a new array containing all objects for which the action was successfully performed.

var has_mother = function(person) {
    if (person.mother && typeof byName[person.mother] !== "undefined") {
        return true;
    } else {
        return false;
    }  // has_mother function - if there's something entered for this person under the mother property which is not 'undefined, return 'true'
};

var children = filter(ancestry, has_mother); // from the JSON objects array, return a list of all persons who have a known mother

var birth_ages = map(children, function(p) {
    var year_of_birth = p.born;

    var mother = byName[p.mother];  // get the person object for the mother

    var mother_year_of_birth = mother.born; // get the born property for the mother object

    return year_of_birth - mother_year_of_birth;    // return an array of mother ages (child YOB - mother YOB)
});

console.log(average(birth_ages));  // use the average function to calculate the average age
