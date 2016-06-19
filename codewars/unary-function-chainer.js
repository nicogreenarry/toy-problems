// Your task is to write a higher order function for chaining together a list of unary functions. In other words, it
// should return a function that does a left fold on the given functions.

  // chained([a,b,c,d])(input)

//Should yield the same result as

  //d(c(b(a(input))))

function chained(functions) {
  return function(){
    return [...functions].reduce((result,fn,i) => {
      if(i===0) {return fn(...result);}
      return fn(result);
    }, arguments);
  }
}

function a(n){
  return n * 1.2;
}

function b(n){
  return n + 12;
}

function c(n){
  return n * 3;
}

function d(n){
  return n - 27;
}

function composite(n){
  return d(c(b(a(n))));
}

const n = 5;

console.log(composite(n), chained([a,b,c,d])(n));