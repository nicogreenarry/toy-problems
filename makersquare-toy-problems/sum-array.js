/*
 Given an array of numbers, calculate the greatest contiguous sum of numbers in it. A single array item will count as a contiguous sum.
 */

// TODO: This can be done in linear time. Do that next time.
function sumArray (array) {
  return Math.max(array.reduce((sum,num) => (sum + num)),
    array.length > 1 ?
      Math.max(sumArray(array.slice(1)), sumArray(array.slice(0,-1))) :
      -Infinity
  );
}

// MORE VERBOSE VERSION OF THE SAME LOGIC;
//function sumArray (array) {
//  if(array.length > 1){ // If array is only one element, we don't need to do anything recursive
//    var sumEveryElement = sumEvery(array); // Check he sum of the entire array
//    var sumSubslice1 = sumArray(array.slice(1)); // Recursively check the sum of the entire array, minus the 1st element
//    var sumSubslice2 = sumArray(array.slice(0,-1)); // Recursively check the sum of the entire array, minus the last element
//    return Math.max(sumEveryElement,sumSubslice1,sumSubslice2); // Return the largest
//  }
//
//  return array[0]; // If array.length is 1, then just return the only element
//
//  function sumEvery(array){
//    return array.reduce(function(sum,number){
//      return sum + number;
//    })
//  }
//}