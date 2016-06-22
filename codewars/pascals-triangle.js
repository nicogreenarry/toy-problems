// https://www.codewars.com/kata/5226eb40316b56c8d500030f/train/javascript
// return a flat array representing the values of Pascal's Triangle to the n-th level
'use strict';

function pascalsTriangle(n,pasTri) {
  pasTri = pasTri || [[1]];
  if(pasTri.length === n) {
    return pasTri.reduce((flatArr,level) => flatArr.concat(level));
  }
  const prevLevel = pasTri[pasTri.length-1];
  const nextLvl = prevLevel.reduce(
      (nxtL,num,i) => {
        let nextNum = i < prevLevel.length-1 ? prevLevel[i+1] : 0;
        return [...nxtL, num + nextNum];
      },[1]);
  return pascalsTriangle(n,[...pasTri,nextLvl]);
}

pascalsTriangle(3);