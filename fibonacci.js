// TRADITIONAL FIBONACCI
var fib = (function(){ // IIFE to return a memoized function
  var cache = [null,1,1];

  return function(n){
    if(cache[n] !== undefined) {return cache[n];} // return the cached value if it exists

    // Start after the last cached value; iterate up to the requested number
    for(var i = cache.length; i <= n; i++){
      // Store new cached values
      cache[i] = cache[i-1] + cache[i-2];
    }

    return cache[n]; // Return the value you just calculated
  }
})();

// CONSTANT-TIME FIBONACCI
var fibC = (function fibC(){ // IIFE for caching values of constants, rather than calculating them again each time
  var PHI = (1 + Math.sqrt(5))/2;
  var SQRT5 = Math.sqrt(5);

  return function(n){
    return Math.round(Math.pow(PHI,n)/SQRT5);
  }
})();

var num = 76;
console.log('Correct:      ' + fib(num));
console.log('Approximated: ' + fibC(num));

//for(var i = 6; i< 500; i++){
//  if(fib(i) !== fibC(i)){
//    console.log(i);
//    break;
//  }
//}
