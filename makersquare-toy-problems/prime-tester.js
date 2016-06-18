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
function primeTester (n) {
  if(n < 2) {return false;}
  if(n === 2) {return true;}
  var sqrt = Math.sqrt(n);
  for(var i = 2; i <= sqrt; i++){
    if(n % i === 0) {return false}
  }
  return true;
}
