'use strict';

// This was my initial attempt. There's something wrong with this recursive approach, which I'm having trouble diagnosing.
// It's getting stuck in some sort of loop, I think. Or maybe it's not actually an infinite loop, but it's still doing
// way too many permutations - a 77-length-string was up in the 340,000 iteration range when I killed it.
function longestPalindrome (str) {
  debugger;

  let longest = 0;
  let count = 0;

  function recurse(subStr){
    count++;
    !(count % 100) && console.log(count);
    if(subStr.length <= longest) { // subStr is no longer than our previous longest case
      //console.log(subStr + ' is <= than ' + longest);
      return '';
    }
    if(subStr === subStr.split('').reverse().join('')){ // The str is a palindrome
      //console.log(subStr + ' is a palindrome');
      if(subStr.length > longest.length) {
        longest = subStr;
        return subStr;
      }
      return '';
    }

    let subStr1 = recurse(subStr.slice(1));
    let subStr2 = recurse(subStr.slice(0,-1));

    return subStr1.length > subStr2.length ? subStr1 : subStr2;
  }

  recurse(str);
  //console.log('Result: ',longest);
  return longest;
}

function longestPalindrome (str){
  let longest = '';

  for(let i = 0; i <= str.length; i++){
    for(let j = i+1; j <= str.length; j++){
      let subStr = str.slice(i,j)
      if(subStr === subStr.split('').reverse().join('')){
        if(subStr.length > longest.length){
          longest = subStr;
        }
      }
    }
  }

  return longest;
}


//longestPalindrome('ac2c2c2coeun.ocou93939');
longestPalindrome('There was a tattarrattat on the racecar. It made a funny noise, gfedcbabcdefg');