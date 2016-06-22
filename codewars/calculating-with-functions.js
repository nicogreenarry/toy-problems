const operations = {
  plus: function(a,b) {return a+b;},
  minus: function(a,b) {return a-b;},
  times: function(a,b) {return a*b;},
  dividedBy: function(a,b) {return a/b;}
};

function numberMaker(n){
  return function(equation){
    if(!equation){ // If there's no argument, i.e. this function is being called as the right operand
      return {b: n};
    }
    return equation.operation(n, equation.b); // else there is one argument: an equation object
  }
}

function operationMaker(operation){
  return function(equation){
    equation.operation = operations[operation];
    return equation;
  }
}

const zero = numberMaker(0);
const one = numberMaker(1);
const two = numberMaker(2);
const three = numberMaker(3);
const four = numberMaker(4);
const five = numberMaker(5);
const six = numberMaker(6);
const seven = numberMaker(7);
const eight = numberMaker(8);
const nine = numberMaker(9);

const plus =      operationMaker('plus');
const minus =     operationMaker('minus');
const times =     operationMaker('times');
const dividedBy = operationMaker('dividedBy');