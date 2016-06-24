/*
 Find the first item that occurs an even number of times in an array. Remember to handle multiple even-occurrence items and return the first one. Return null if there are no even-occurrence items.

 Examples
 Input	Output
 arr:
 [ 1, 3, 3, 3, 2, 4, 4, 2, 5 ]	2
 arr:
 [ "cat", "dog", "dig", "cat" ]	"cat"

 */

function evenOccurrence (arr) {
  var freqs = {};

  arr.forEach(recordFrequency);

  return findFirstEven(arr,freqs);

  // Functions -----------------------
  function recordFrequency(num){
    if(undefined === freqs[num]) freqs[num] = 0;
    freqs[num]++;
  }

  function findFirstEven(arr,freqs){
    for(var i=0; i<arr.length; i++){
      if(freqs[arr[i]] % 2 === 0) return arr[i];
    }
    return null;
  }
}
