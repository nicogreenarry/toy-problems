/*
 A prime number is an integer greater than 1 that has no divisors other than itself and 1. Write a function that accepts a number and returns true if it’s a prime number, false if it’s not. The grader is looking at the efficiency of your solution (number of operations) as well as correctness!
 */

// My initial attempt, before seeing the actual challenge
function primeTester(num){
  if(num < 2) {return false;}
  var sqrt = Math.sqrt(num);
  for(var i = 3; i < sqrt; i += 2){
    if(num % i === 0) {return false}
  }
  return true;
}

// Correct solution I reached with the actual challenge (and after testing, which I didn't do for the attempt above)
// TODO: once I've tested for evenness, I can increment my potential factors by two rather than by one
function primeTester (n) {
  if(n < 2) {return false;}
  if(n === 2) {return true;}
  var sqrt = Math.sqrt(n);
  for(var i = 2; i <= sqrt; i++){
    if(n % i === 0) {return false}
  }
  return true;
}
