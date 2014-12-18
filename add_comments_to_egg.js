/*
 * finding the comments and cleaning the whitespaces 
 * require two separate regular expressions; one to
 * find and replace comments and one to cut whitespaces.
 */
function skipSpace(string) {
  string = string.replace(/#.*/, "");
  var first_whitespace = string.search(/\S/);
  if (first_whitespace == -1) return "";
  return string.slice(first_whitespace);
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse(" a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}
