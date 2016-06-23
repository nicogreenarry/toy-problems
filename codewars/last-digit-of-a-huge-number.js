var lastDigit = function(arr){
  if(!arr.length) {return 1;}
  if(1 === arr.length) {return arr[0] % 10;}

  const lastDigit2 = function(str1, str2){
    return +!+str2 || Math.pow(str1 % 10, str2 % 4 || 4) % 100;
  };

  return arr.slice(0,-1).reverse().reduce((exp,base) => lastDigit2(base,exp),
    arr[arr.length-1]) % 10;
};