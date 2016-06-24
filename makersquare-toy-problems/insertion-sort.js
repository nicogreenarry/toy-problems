/*
 Insertion sort is a basic sorting algorithm.

 Insertion sort iterates over an array, growing a sorted array behind the current location. It takes each element from the input and finds the spot, up to the current point, where that element belongs (in constant space). It does this until it gets to the end of the array.

 Insertion sort should be implemented as a stable sort. This means that equal elements
 should retain their relative order. Numbers, as primitives, give us no way to check this,
 so we’ll be sorting objects with a value field, on which they will be sorted, like so:

 [{value: 10}, {value: 5, order: 1}, {value: 5, order: 2}]

 A stable sort must return {value: 5, order: 1}, {value:5, order: 2} in that order.
 */

// NOTE: INSERTION SORT IS SUPPOSED TO DO EVERYTHING WITHIN THE EXISTING ARRAY,
// WITHOUT CREATING ANY NEW ARRAYS. So I'll need to rewrite this if it comes
// up again.



function insertionSort (array) {
  for(var i = 1; i < array.length; i++){
    for(var j = 0; j < i; j++){
      if(array[i] === array[j]){ // If the two are equal we should insert el i after el j
        array = array.slice(0,j+1) // insert element i after element j
          .concat(array[i],array.slice(j+1,i),array.slice(i+1));
        break; // Break out of 'j' for loop
      }else if(array[i] < array[j]){
        array = array.slice(0,j) // insert element i before element j
          .concat(array[i],array.slice(j,i),array.slice(i+1));
        break; // Break out of 'j' for loop
      }
    }
  }

  return array;
}

// [DONE] Easy version: for loop through array; for loop through sorted segment
// Then extra credit
// harder version: Use binary search to find correct position in sorted segment


// EDGE CASES:
// Stable sort:
// If we're sorting objects, and not primitive values, and we want it to be a
// stable sort, we need to add this to our initial if array[i] === array[j] if
// condition:
// && array[i] !== array[j+1] // ...unless there's a sequence of equal values, and el i should be inserted at the very end of that sequence