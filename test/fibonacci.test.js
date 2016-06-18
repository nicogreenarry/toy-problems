var assert = chai.assert;

describe('Fibonacci iterative function', function(){
  it('should return a number', function(){
    var testsArr = [0,1,2,15,50,100]
      .concat(randomNumbers(10,0,100)); // test some randoms

    testsArr.forEach(input => assert.equal(typeof fib(input), 'number'));
  });
});

function randomNumbers(n=10,lowerBound=0,upperBound=100){
  var rands = [];
  for(var i = 0; i < n; i++){
    rands.push(Math.floor(Math.random()*(upperBound-lowerBound)+lowerBound))
  }
  return rands;
}