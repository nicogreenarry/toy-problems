// Perform the secret knock() to enter...
knock(knock)()();


// This is an unusual kata - it doesn't provide any guidance in the instructions or the sample code; instead, it
// initially instructs you to set up tests in the testing section. I'll have to use the tests to help me inspect the
// behavior of the knock function.

// TODO: TDD development by writing your own tests as you solve the kata.

// These are some of the methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// You can also use Chai (http://chaijs.com/)
var expect = require("chai").expect;
// var assert = require("chai").assert;
// require("chai").should();

describe("Solution", function(){
  it("should test for something", function(){
    expect("expected").to.equal("expected");
  });
});




// TODO: TDD development by writing your own tests as you solve the kata.

// These are some of the methods available:
//    Test.expect(boolean, [optional] message)
//    Test.assertEquals(actual, expected, [optional] message)
//    Test.assertSimilar(actual, expected, [optional] message)
//    Test.assertNotEquals(actual, expected, [optional] message)

// You can also use Chai (http://chaijs.com/)
var expect = require("chai").expect;
//console.log(expect('hello').to.equal('hello'));


for(let i = 0; i < 10; i++){
  describe("Solution " + i, function(){
    it('should return some value', function(){
      Test.assertEquals(knock.toString(),undefined);
    });
    // Reveals that knock is this function:
    var knock = function(arg){
      if(arg && arg === knock){
        console.log('"Knock knock."');
        console.log('Whos\'s there?');
        return deliverLine;
      }
    }

    it('should return some value', function(){
      Test.assertEquals(knock(i),undefined);
    });
  });
}

