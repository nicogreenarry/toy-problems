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
