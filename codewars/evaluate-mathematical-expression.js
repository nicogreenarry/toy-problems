/*
 https://www.codewars.com/kata/52a78825cdfc2cfc87000005/train/javascript

 Given a mathematical expression as a string you must return the result as a number.

 Numbers

 Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.

 Operators

 You need to support the following mathematical operators:

 Multiplication *
 Division /
 Addition +
 Subtraction -
 Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.

 Parentheses

 You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

 Whitespace

 There may or may not be whitespace between numbers and operators.

 An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e., all of the following are valid expressions.

 1-1    // 0
 1 -1   // 0
 1- 1   // 0
 1 - 1  // 0
 1- -1  // 2
 1 - -1 // 2

 6 + -(4)   // 2
 6 + -( -4) // 10
 And the following are invalid expressions

 1 - - 1    // Invalid
 1- - 1     // Invalid
 6 + - (4)  // Invalid
 6 + -(- 4) // Invalid
 Validation

 You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.

 Eval

 For JavaScript, both eval and Function are disabled.

 */

'use strict';

var calc = function (expression) {
  const exp = expression.search(/ /g,''); // remove all spaces

  const firstOpenParen = exp.indexOf('(');
  if(~firstOpenParen){
    return operate(calc(exp.slice(0,firstOpenParen-1)),
                    exp.slice(firstOpenParen,1),
                    /* need to insert right operand here */);
  }
};

function findFirstBalancedParens(str){
  const firstOpenParen = str.indexOf('(');
  let openParensCount = 1;
  for(let i = firstOpenParen + 1; i< str.length; i++){
    if('(' === str[i]){
      openParensCount++;
    }else if(')' === str[i]){
      openParensCount--;
      if(1 === openParensCount) {return [firstOpenParen, i];}
    }
  }
  throw new Error('no closing parenthesis found!');
}

function operate(left, operator, right){
  const ops = {
    '+': function(){
      return left + right;
    },
    '-': function(){
      return left - right;
    },
    '/': function(){
      return left / right;
    },
    '*': function(){
      return left * right;
    }
  }
  return ops[operator]();
}