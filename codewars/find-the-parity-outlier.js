// You are given an array (which will have a length of at least 3, but could be very large) containing integers. The
// integers in the array are either entirely odd or entirely even except for a single integer N. Write a method that
// takes the array as an argument and returns N.

function findOutlier(arr){
  // if arr is mostly odds, oddCount should be 3 or 2
  const oddCount = Math.abs(arr[0] % 2) + Math.abs(arr[1] % 2) + Math.abs(arr[2] % 2);
  const remainder = oddCount >= 2 ? 1 : 0; // expected remainder of most elements of arr
  console.log(oddCount,remainder);
  for(let int of arr){
    if(Math.abs(int % 2) !== remainder) {return int;}
  }
}
