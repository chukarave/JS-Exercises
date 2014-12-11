function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure();
  }
}
function reliableMultiply(a, b) {
  // Your code here.
  try {
    primitiveMultiply(a, b)
  } catch (error) {
    if (!(error instanceof MultiplicatorUnitFailure)) {
      throw new MultiplicatorUnitFailure();
    } else {
      return primitiveMultiply(a, b);
    }
  }
}


console.log(reliableMultiply(8, 8));
// → 64
