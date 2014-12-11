/*
 * Vector Data type for orientation.
 * The constructor makes sure that two arguments are always passed.
 * x and y are translated into a property of the Vector object.
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;

}

/*
 * The prototype gets an addition function:
 * when a critter moves, the values of its x and y
 * properties is added to the
 * property value of another vector object.
 */
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};


/*
 * The Grid constructor represents a grid.
 * Internally Grid is an array resulting from multiplication of
 * the two arguments (width and height).
 */
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}

/*
 * This function looks at the measurments of the
 * Vector and checks if this vector fits inside the grid.
 */
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};

// gets the content of a cell with the location of x + width * y
Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
// sets the content of a cell with the location of x + width * y
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

/*
 * This forEach method for the grid loops over each
 * cell of the grid and carries out a certain function (argument f).
 * context is a this.value that will be passed with the function.
 */
Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value !== null)
                f.call(context, value, new Vector(x, y));
        }
    }
};


/*
 * This variable is a map of Vector object instances
 * who represent directions.
 * The arguments for each objects are those added to
 * the given vector object in the .plus function.
 * This way a critter object finds out where to go in
 * order to move in the right direction.
 */
var directions = {
    "n":  new Vector( 0, -1),
    "ne": new Vector( 1, -1),
    "e":  new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s":  new Vector( 0,  1),
    "sw": new Vector(-1,  1),
    "w":  new Vector(-1,  0),
    "nw": new Vector(-1, -1)
};

//  Helper function to extract a random element.
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// variable directionNames creates an array of direction names.
var directionNames = "n ne e se s sw w nw".split(" ");

/*
 * This function assigns the this.direction property
 * with a random direction from the directionNames array.
 */
function BouncingCritter() {
    this.direction = randomElement(directionNames);
}

/*
 * The act prototype method takes an instance of the view
 * object (will later be coded) and looks at the cell in
 * the extracted direction.
 * If the cell is not empty (!= " "), it finds an
 * empty direction to got to, or assigns this.direction with south.
 * it changes the value of the type property to 'move'
 * and the direction to the randomly extracted one
 * or south.
 */
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return {type: "move", direction: this.direction};
};

// -------World Object--------
/*
 * elementFromChar identifies an Object by its representing character.
 * the Legend is what is given after the array to explain
 * which charachter refers to which object.
 * i.e. "#" Wall, "*" Plant
 * if the charactes is " ", null will be returned.
 * the variable element isi a new instance of the object represented by ch.
 * the charachter is saved as the value of the originalChar propety.
 */

function elementFromChar(legend, ch) {
    if (ch == " ")
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}
/*
 * charFromElement returns which charachter represents
 * an object.
 * if the element is null it represents " ".
 * otherwise it returns the charachter for the element
 */
function charFromElement(element) {
    if (element === null)
        return " ";
    else
        return element.originChar;
}

/*
 * The World constructor. recieves a legend as
 * an argument and a map argument, which is the layout
 * of our world (and is an array).
 * The grid variable is a new instance of the Grid
 * object, with the length of the first map element
 * and the entire map length passed as width and
 * height arguments.
 */
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    /*
     * 
     * ---What does this loop do exactly?---
     *
     */
    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++)
        grid.set(new Vector(x, y),
            elementFromChar(legend, line[x]));
    });
}

/*
 * The world's toString method returns the current
 * state of the and pretty much returns the current world map
 * in string form.
 *
 * It loops over both dimensions of the grid
 * and using grid.get gets the charachters placed in
 * each cell.
 */
World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};

/*
 * the acted variable is an array of critter index numbers
 * that already had their turn.-
 *
 * the loop checks if the critter already has a value in its
 * .act property and if they do not exist in the acted array
 * and then pushes it to the array.
 * the it calls the letAct method with the critter and a new
 * instance of the vector object as arguments.
 * 'this' is also passed as a third argument and reffers to the world object.
 */

World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};

/*
 * The letAct method gets a critter and a new instance of the vector object
 * as arguments.
 *
 * The action variable is the act method called on the critter
 * with a new instance of the view object as an argument.
 * This instance of the view object gets an instance of the world
 * object (this) and an instance of the vector object.
 *
 * If action and action type both return "move", assign the dest
 * variable with the checkDestination method called on the world object.
 *
 * if the destination and grid.get called with the destination as an argument both return null (empty)
 * the cell in this vector coordinate is set as empty,
 * and the destination cell gets the critter charachter.
 */

World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) === null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};

/*
 * checkDestination checks if the directions variable (list of direction
 * variable with vector object instances assigned to them)
 * has the property action.direction.
 * If it does, it sets the dest variable to the plus method called on a vector in order
 * to add the direction coordinates with the action coordinates.
 *
 * If the destination is inside the grid boundries, return the
 * destination
 */
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
            return dest;
    }
};


// Constructor for the Wall object.

function Wall() {}


/*
 * The constructor for the View object gets instances of
 * the world and vector objects as arguments.
 */

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

/*
 * The look method gets a direction as an argument a
 * and assigns the coordinates of the the cell in that direction
 * (using the vector.plus method on the the world object instance)-
 * If the cell lies within the grid bounderies it returns
 * the charachter for the element in that spot.
 * If the cell lies outside the grid boundries it returns "#"
 */

View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return "#";
};


/*
 * finAll rotates clockwise around the current position
 * and returns an array of all the directions in which
 * the charachter passed as an argument is present.
 */
View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions)
        if (this.look(dir) == ch)
            found.push(dir);
    return found;
};

/*
 * find rotates clockwise in search of a specific
 * charachter and returns the direction
 * in which it is to be found.
 */
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};



// ----------Wall follower---------

/*
 * dirPlus is a method that allow to compute using direction
 * it adds the index number of the direction in the directionNames
 * array with the number passed as argument and 8 and
 * returns the % 8 of this number.
 */

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

/*
 * The wall follower constructor
 * direction is set to south.
 */
function WallFollower() {
    this.dir = "s";
}

/*
 * The act method for the WallFollower object.
 * The method rotates clockwise until it finds an empty square.
 * It then moves in the direction of that empty square.
 */

WallFollower.prototype.act = function(view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != " ")
        start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != " ") {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) break;
    }
    return {type: "move", direction: this.dir};
};


//--------LIfe like world---------


// The LifelikeWorld constructor is based on the World object.

function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}

// the prototype of the LifelikeWorld is based on the world prototype
LifelikeWorld.prototype = Object.create(World.prototype);

/*
 * The different properties of the actionTypes object
 * are in fact actions.
 */
var actionTypes = Object.create(null);


/*
 * The LifelikeWorld.prototype.letAct is similar
 * to the same method of the World object, except it checks which
 * action is at hand and then adjusts the critter's
 * energy setting accordingly.
 */
LifelikeWorld.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter,
                vector, action);
    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
            this.grid.set(vector, null);
    }
};


// The grow property adds energy to the critter.
actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};


/*
 * The move property is pretty much the same as the
 * content of the World.prototype.letAct method;
 * if the cell in the direction is empty, set the current
 * vector coordinate to empty, and set the destination
 * cell to the critter character.
 */
actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    if (dest === null ||
            critter.energy <= 1 ||
            this.grid.get(dest) !== null)
        return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
};

/*
 *  The eat property checks first if there's a valid cell in the
 *  given vector (done by variable dest)
 *  then assigns the value in the cell to atDest
 *  the checks if it has an energy property
 *  and if so takes its energy setting and adds it to the
 *  energy setting on the critter.
 */

actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy === null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};


/*
 * The reproduce property has a baby variable which is
 * the same charachter of the object which uses the property (this.legend)
 * The function checks the destination cell and if it is empty
 * uses grid.set to set the baby charachter into it.
 * The critter's energy is down reduces by 2 * baby.energy.
 */

actionTypes.reproduce = function(critter, vector, action) {
    var baby = elementFromChar(this.legend,
            critter.originChar);
    var dest = this.checkDestination(action, vector);
    if (dest === null ||
            critter.energy <= 2 * baby.energy ||
            this.grid.get(dest) !== null)
        return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};


/*
 * The Plant constructor sets the plant energy to a random
 * number (to be gained by the eating critter)
 */

function Plant() {
    this.energy = 3 + Math.random() * 4;
}

/*
 * The plant act method checks if the element's
 * energy is larger than 15 it reproduces in the direction
 * of the next empty space.
 *
 * If the energy is smaller than 20, more energy is added
 * using .grow.
 */

Plant.prototype.act = function(context) {
    if (this.energy > 15) {
        var space = context.find(" ");
        if (space)
            return {type: "reproduce", direction: space};
    }
    if (this.energy < 20)
        return {type: "grow"};
};



// The constructor for the planteater critter object ("o")
// starting energy level is 20

function PlantEater() {
    this.energy = 20;
}

/*
 * The act function checks the closest charachter
 * and depending on the energy level and which
 * charachter it is, decides whether to move,
 * reproduce or eat.
 */
PlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 60 && space)
        return {type: "reproduce", direction: space};
    var plant = context.find("*");
    if (plant)
        return {type: "eat", direction: plant};
    if (space)
        return {type: "move", direction: space};
};


/*
 * The animated world constructor prints
 * the toString method called on the world
 * object.
 * setTimeout allows to set the speed of
 * printing in miliseconds.
 */

function animateWorld(world) {
    console.log(world.toString());
    world.turn();
    setTimeout(function() {
        animateWorld(world);
    }, 250);
}


/*#########################################################################
###########################################################################
#########################################################################*/

/*
 * The SmartPlantEater can decide whether to eat
 * a plant now or wait till there are more plants around
 * and that way make the world more stable.
 */

// Your code here
function SmartPlantEater() {
    this.energy = 30;
    this.eat_every = 1;
    this.i = 0;
}
SmartPlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    this.i++;


    if (this.energy > 60) {
        if (space) {
            return {type: "reproduce", direction: space};
        }
    } else {
        var plant = context.find("*");
        if (plant && this.i >= this.eat_every && context.findAll("*").length > 0) {
            this.i = 0;
            return {type: "eat", direction: plant};
        }

    }

    if (space) {
        return {type: "move", direction: space};
    }
};


/*

   var valley = new LifelikeWorld(
   ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
   {"#": Wall,
   "O": SmartPlantEater,
   "*": Plant}
   );
   animateWorld(valley);
   */


function Tiger() {
    this.energy = 800;
    this.i = 0;
    this.available_food = 4;
}
Tiger.prototype.act = function(context) {
    var space = context.find(" ");
    var herbivor = context.find("O");

    //  if (context.findAll("O").length > 0) {
    //          this.i++
    //          console.log("food here");
    //     }

    if (this.energy >= 820) {
        if (space) {
            return {type: "reproduce", direction: space};
        }
    } else {
        if (herbivor) {
            return {type: "eat", direction: herbivor};
        }
    }
    if (space) {
        return {type: "move", direction: space};
    }

};



//  else if (herbivor && this.i >= this.available_food) {
//  this.i = 0;




animateWorld(new LifelikeWorld(
            ["####################################################",
            "#                 ####         ****              ###",
            "#   *     ##                 ########       OO    ##",
            "#   *    ##        O O                 ****       *#",
            "#       ##*             @          ##########     *#",
            "#      ##***  *         ****                     **#",
            "#* **  #  *  ***      #########                  **#",
            "#* **  #      *               #   *              **#",
            "#     ##              #   O   #  ***          ######",
            "#*            @       #       #   *        O  #    #",
            "#*                    #  ######                 ** #",
            "###          ****          ***                  ** #",
            "#       O                        @         O       #",
            "#   *     ##  ##  ##  ##               ###      *  #",
            "#   **         #              *       #####  O     #",
            "##  **  O   O  #  #    ***  ***        ###      ** #",
            "###               #   *****                    ****#",
            "####################################################"],
            {"#": Wall,
                "@": Tiger,
                "O": SmartPlantEater, // from previous exercise
                "*": Plant}
                ));


