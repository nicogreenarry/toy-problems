// https://www.codewars.com/kata/5279f6fe5ab7f447890006a7/train/javascript
'use strict';

function pickPeaks(arr){
  const peaks = {pos: [], peaks: []};
  let latestMax, latestMaxPos;

  for(var i = 1; i < arr.length; i++){
    if(arr[i] > arr[i-1]){ // This may be a local peak
      latestMaxPos = i;
      latestMax = arr[i];
    }else if(arr[i] < arr[i-1]){
      if(latestMaxPos) {
        peaks.pos.push(latestMaxPos);
        peaks.peaks.push(latestMax);
        latestMax = latestMaxPos = null;
      }
    }
  }
  return peaks;
}

console.log(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]));

    //if(arr[i] > arr[i-1] && arr[i] > arr[i+1]){ // If this element is a local peak
    //  peaks.pos.push(i);
    //  peaks.peaks.push(arr[i]);
    //}else if(arr[i] > arr[i-1] &&  arr[i] === arr[i+1]){ // If the element may be the beginning of a plateau
    //  latestMaxPos = i;
    //  latestMax = arr[i];
    //}
