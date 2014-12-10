
function Vector(x, y) {   // Vector Data type for orientation. The constructor makes sure that two arguments are always passed
    this.x = x;         // x is translated into a property of the Vector object
    this.y = y;

}

/*
 *
 * the prototype gets an addition function:
 * when a critter moves, the values of its x and y
 * properties is added with the
 * property value of another vector object
 */
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};



// Represents a grid. Internally Grid is an array resulting from multiplication of the two arguments (width and height)
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) { // this method gets a vector object as an argument, and uses its properties to call values
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};// this function looks at the measurments of the Vector and check if this vector fits inside the grid

// gets the content of a cell with the location of x + width * y
Grid.prototype.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
// sets the content of a cell with the location of x + width * y
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};
/*
 * forEach method for the grid loops over each
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
 * Inside the World object, a loop is setup
 * in order to set each grid cell with an 
 * element 
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
 * the acted variable is an array of 
 *
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

World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
            return dest;
    }
};







function Wall() {}







function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return "#";
};
View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions)
        if (this.look(dir) == ch)
            found.push(dir);
    return found;
};
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
};






function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
    this.dir = "s";
}

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






function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

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

actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};

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
actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy === null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};
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






function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(context) {
    if (this.energy > 15) {
        var space = context.find(" ");
        if (space)
            return {type: "reproduce", direction: space};
    }
    if (this.energy < 20)
        return {type: "grow"};
};





function PlantEater() {
    this.energy = 20;
}
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



// Your code here
function SmartPlantEater() {
    this.energy = 30;
    this.eat_every = 1;
    this.i = 0;
}
SmartPlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    this.i++;

  //  console.log("Critter energy " + this.energy)

    if (this.energy > 60) {
        if (space) {
            return {type: "reproduce", direction: space};
        }
    } else {
        var plant = context.find("*");
        if (plant && this.i >= this.eat_every && context.findAll("*").length > 0) {
            this.i = 0;
            return {type: "eat", direction: plant};
        } else {
            //       console.log("not eating");
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
  //  console.log("Tiger energy " + this.energy)

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


