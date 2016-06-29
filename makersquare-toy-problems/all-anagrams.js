/*
 Given a single input string, write a function that produces all possible anagrams of a string and outputs them as an
 array. At first, don’t worry about repeated strings. What time complexity is your solution?
 */

'use strict';

function allAnagrams (string) {
  const anagrams = [];

  function scramble(combo, remainingStr){
    if(!remainingStr.length){
      if(~anagrams.indexOf(combo)){ // If combo in anagrams already
        return;
      }
      return anagrams.push(combo);
    }
    for(let i = 0; i < remainingStr.length; i++){
      scramble(combo + remainingStr[i], remainingStr.slice(0,i) + remainingStr.slice(i+1));
    }
  }

  scramble('',string);

  return anagrams;
}