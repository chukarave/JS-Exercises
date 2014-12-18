/*
 * As oppiosed to define, which changes the variable name only locally 
 * within a function, set changes the value of a global variable.
 *  
 */
specialForms["set"] = function(args, env) {
    // in case one of the arguments is invalid:
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of set");
    var name = args[0].name;    
    var value = evaluate(args[1], env);
    
    /*
     * This loop looks at the object scope and if there's a
     * variable with the same name as args[0], reassigns
     * it in the current environment (scope) and returns
     * its value
     */
    do {
        if (Object.prototype.hasOwnProperty.call(env, name)) {
            env[name] = value;
            return value;
        }
    // the loop runs as long as there's an object to assign to env
    } while (env = Object.getPrototypeOf(env));

    throw new ReferenceError("Undefined variable " + name);
};


/*
   specialForms["define"] = function(args, env) {
   if (args.length != 2 || args[0].type != "word")
   throw new SyntaxError("Bad use of define");
   var value = evaluate(args[1], env);
   env[args[0].name] = value;
   return value;
   };

*/
run("do(define(x, 4),",
        "   define(setx, fun(val, set(x, val))),",
        "   setx(50),",
        "   print(x))");
// → 50
run("set(quux, true)");
// → Some kind of ReferenceError
