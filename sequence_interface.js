// Your code here.
function ArraySeq(arr) {  //Constructor for a sequence array. 
    this.i = -1;    // define the counter for the next and has_ended methods 
    this.arr = arr; // define the array as a local variable
    ArraySeq.prototype.next = function() {  // the next() method is defined as a prototype method so that all instances of ArraySeq will have it as well
        this.i++;   // increment the counter
        return arr[this.i]; //return the element in the corresponding index number from the array 
    }
    ArraySeq.prototype.has_ended = function() { // the has_ended method is also a prototype method, for other instances to use. 
        if ( this.i == this.arr.length) {   // if the counter is the same number as elements in the array, return true
            return true;
        }
    }
}


function RangeSeq(a, b) {   //Constructor for a range sequence
    this.i = -1;    //counter is set to -1 in order to begin with index number 0
    this.a = a;     //beginning of sequence 
    this.b = b;     //end of sequence

    RangeSeq.prototype.next = function() {  // again, next() is a prototype method, this time for the RangeSeq prototype
        this.i++;
        return this.a + this.i; // the next number is the beginning number of the sequence + the counter value
    }

    RangeSeq.prototype.has_ended = function() { // has_ended, again also a prototype method
        if (this.i >= this.b) { // >= is safer than == since it includes all the cases where i is bigger than the last number of the sequence (for whatever reason)
            return true;
        }
    }
}

function logFive(seq) {
    var n = 0;      // a local counter in order to make sure no more than 5 elements are printed.
    while (!seq.has_ended() && n < 5) { // as long as has_ended() returns false and the counter did not hit 5, continue looping
        n++;
        console.log(seq.next());    // print the next sequence element.

    }
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
