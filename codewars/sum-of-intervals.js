'use strict';

function sumIntervals(intervals){
  const newInts = [];



  function findOverlappingIntervals(newInt,intervals){
    const matches = [];

    intervals.forEach((int,idx) => {
      if(!(int[1] < newInt[0] || int[0] > int[1])){
        matches.push(idx);
      }
    });

    return matches;
  }
}