'use strict';

function LCS(x, y) {
  if('' === x || '' === y) {return '';}

  if(x.slice(-1) === y.slice(-1)){ // Per the First Property of LCS's, if the string share a last character...
    return LCS(x.slice(0,-1), y.slice(0,-1)) + x.slice(-1); // ...then find the LCS of their substrings (see https://en.wikipedia.org/wiki/Longest_common_subsequence_problem#First_property)
  }else{ // Else compare the greater of two LCS's based on two possible worlds (one where we trim x, one where we trim y). (See https://en.wikipedia.org/wiki/Longest_common_subsequence_problem#Second_property)
    let sub1 = LCS(x.slice(0,-1), y);
    let sub2 = LCS(x, y.slice(0,-1));
    return sub1.length > sub2.length ? sub1 : sub2;
  }
}

console.log(LCS("132535365", "123456789"));