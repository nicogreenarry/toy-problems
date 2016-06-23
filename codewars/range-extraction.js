function solution(list){
  let rangeStr = '' + list[0];
  let endOfCurrentRange = null;

  for(let i = 1; i < list.length; i++){
    if(2 === list[i+1] - list[i-1]){ // list[i] and its neighbors are part of a range
      endOfCurrentRange = i+1; // Update range tracker
    }else if(endOfCurrentRange === i) {
      endOfCurrentRange = null;
      rangeStr += '-' + list[i];
    }else{
      rangeStr += ',' + list[i];
    }
  }

  return rangeStr;
}