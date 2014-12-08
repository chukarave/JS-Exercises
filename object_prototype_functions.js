function Vector(x, y) {
    this.x = x;
    this.y = y;
} // When a new object instance is created (using 'new'), the constructor allows defining new properties for it.
// These properties will always exist for that object. 

Vector.prototype.plus = function (newinstance) { // prototype method plus: Add the property .plus to the prototype that was created with the instance
    newx = this.x + newinstance.x;
    newy = this.y + newinstance.y;
    return new Vector(newx, newy); // the property returns a new instance of the Vector object, so as not to change the existing one (that wouldn't work)
};

Vector.prototype.minus = function (newinstance) { // prototype method minus: Add the property .minus to the prototype that was created with the instance
    newx = this.x - newinstance.x;
    newy = this.y - newinstance.y;
    return new Vector(newx, newy);
};

Object.defineProperty(Vector.prototype, "length", {     // the get is used to add a new property (in this case to the prototype but it could also be to the object))
    get: function() {                                   // when the get is not defined inside another object, the 'Object.defineProperty' syntax has to be used. 
        return Math.sqrt((this.x * this.x) + (this.y * this.y)); // Every time the length property is called, the getter calculates its values 
    }
});



console.log(new Vector(1, 2).plus(new Vector(2, 3))); // 'new' - everytime this operator is used a new instance, and a new prototype for that instance are created.
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 2)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5
