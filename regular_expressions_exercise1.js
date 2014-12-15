// Fill in the regular expressions

verify(/ca(t|r)/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/p(r?)op/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\wious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s\.|,|:|;/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/.../,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/[^e]/g,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");

    // Your code here.
  });



var text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/'|(.'\w), (\W'|'\W), (\w'\w)/g, "$2\""));
// → "I'm the cook," he said, "it's my job."
