'use strict';

function sumIntervals(intervals){
  const combinedInts = [];

  intervals.forEach(newInt => combineOverlappingIntervals(newInt,combinedInts));

  return combinedInts.reduce((sum,int) => sum + int[1] - int[0], 0)

  function combineOverlappingIntervals(newInt,intervals){
    let combined = false;
    intervals.forEach((int,idx) => {
      if(!(int[1] < newInt[0] || int[0] > newInt[1])){
        const oldInt = intervals.splice(idx,idx+1)[0];
        combined = intervals.push([Math.min(oldInt[0], newInt[0]), Math.max(oldInt[1], newInt[1])]);
      }
    });
    if(!combined){
      intervals.push(newInt);
    }
  }
}

console.log(sumIntervals([ [11,15],[6,10],[1,2] ]));