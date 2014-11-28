function StretchCell(inner, width, height) {
    this.inner = inner;     // each variable that is to be used at a later time in the prototype of this object has to be assigned like this in the constructor.
    this.width = width;	
    this.height = height;
}

StretchCell.prototype.minWidth = function () {  // creat the minWidth prototype method which returns the bigger value of either the cell width, or the inner cell's width
    return Math.max(this.width, this.inner.minWidth());
};

StretchCell.prototype.minHeight = function () { // Prototype minHeight method. same as minWidth but for height.
    return Math.max(this.height, (this.inner.minHeight()));
};

StretchCell.prototype.draw = function(width, height) {  //draw the cell - take the contents of the inner cell and concatenate empty spaces as many as the cell width.
    return this.inner.draw(width, height -1)	
        .concat([repeat(" ", this.width)]);

}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]
