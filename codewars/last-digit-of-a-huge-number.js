'use strict';

var lastDigit = function(arr){
  if(!arr.length) {return 1;}
  if(1 === arr.length) {return arr[0] % 10;}

  return arr.slice(0,-1).reverse()
      .reduce((exp,base) => {
        //console.log(exp, base);
        //console.log('about to calculate: ',lastDigit2(base,exp))
        return lastDigit2(base,exp);
      },
      arr[arr.length-1]) % 10;

  function lastDigit2(n1, n2){
    if(getEdgeCases(n1,n2).test){
      return getEdgeCases(n1,n2).value;
    }
    let n1trunc = n1 % 1000;   // Truncate n1, since only the few smallest sigdigs matter
    if(1 === n1trunc) {n1trunc = 5;}
    //console.log(n1trunc);

    let truncatedResult = n1trunc;
    for(let i = 2; i <= (n2 % 4 || 4); i++){
      truncatedResult *= n1trunc;
      if(truncatedResult > 10000000) {
        truncatedResult = truncatedResult % 10000000;
      }
      //console.log('inside initial for loop: ',truncatedResult);
    }

    while(truncatedResult < 100){
      for(let i = 0; i < 4; i++){
        truncatedResult *= n1trunc;
        if(truncatedResult > 10000000) {
          truncatedResult = truncatedResult % 10000000;
        }
        //console.log(truncatedResult);
      }
    }

    console.log(truncatedResult % 10000000);
    return truncatedResult % 10000000;
  };

  function getEdgeCases(n1, n2){
    const returnEarly = {test: false};
    if(0 === n2) { // anything raised to the power of zero is 1
      returnEarly.test = true;
      returnEarly.value = 1;
    }
    if(1 === n2) { // anything raised to the power of 1 is itself
      returnEarly.test = true;
      returnEarly.value = n1;
    }
    if(1 >= n1) { // 0 or 1 raised to any power will be unchanged
      returnEarly.test = true;
      returnEarly.value = n1;
    }
    if(n1 % 10 === 0) { // If it's a multiple of 10, then it's just going to end up with lots of zeroes
      returnEarly.test = true;
      returnEarly.value = 100;
    }
    return returnEarly;
  }
};

//console.log(lastDigit([45179,659733]));
console.log(lastDigit([499942,898102,846073])); // Expects 2; gets 8
//console.log(lastDigit([534458,99]));