'use strict';

var lastDigit = function(arr){
  if(!arr.length) {return 1;}
  if(1 === arr.length) {return arr[0] % 10;}

  const lastDigit2 = function(n1, n2){
    if(0 === n2) {return 1;}
    if(1 >= n1) {return n1;}
    let n1ones = n1 % 10;
    if(n1ones === 0) {return !n1 || 100;}
    if(n1ones === 1) {
      n1ones = (n1 % 100) > 1 ? n1 % 100 : 5;
    }
    let truncatedResult = Math.pow(n1ones, n2 % 4 || 4);
    while(truncatedResult < 100){
      truncatedResult *= Math.pow(n1ones,4);
    }
    return truncatedResult % 100;
  };

  return arr.slice(0,-1).reverse()
      .reduce((exp,base) => {
        //console.log(`Base: ${base}; Exponent: ${exp}`);
        //console.log(lastDigit2(base,exp));
        return lastDigit2(base,exp);
      },
      arr[arr.length-1]) % 10;
};

//console.log(lastDigit([45179,659733]));
//console.log(lastDigit([534458,45179,659733])); // Expects 2; gets 8
console.log(lastDigit([534458,99])); // Expects 2; gets 8