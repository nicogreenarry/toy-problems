// https://www.codewars.com/kata/last-digit-of-a-large-number/javascript
'use strict';

const prd = {
  '2': {
    period: 4,
    sequence: [2,4,8,6]
  },
  '3': {
    period: 4,
    sequence: [3,9,7,1]
  },
  '4': {
    period: 2,
    sequence: [4,6]
  },
  '7': {
    period: 4,
    sequence: [7,9,3,1]
  },
  '8': {
    period: 4,
    sequence: [8,4,2,6]
  },
  '9': {
    period: 2,
    sequence: [9,1]
  }
};

var lastDigit = function(str1, str2){
  if('0' === str2) {return 1}; // anything raised to the 0th power is 1
  let s1 = str1.slice(-1);
  if(~'0156'.indexOf(s1)){ // the last digit will always be the same if it's 0, 1, 5, or 6
    return +s1;
  }
  let period = prd[s1].period;
  let sequence = prd[s1].sequence;
  return sequence[(str2.slice(-2) - 1) % period];
}

// Wow, here's someone else's way simpler solution. This should teach me to really focus on boiling things down.
var lastDigit = function(str1, str2){
  return +!+str2 || Math.pow(str1.slice(-1) % 10, str2.slice(-2) % 4 || 4) % 10
}