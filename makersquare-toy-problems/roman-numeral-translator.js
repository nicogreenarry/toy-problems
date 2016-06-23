var DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

function translateRomanNumeral (romanNumeral) {
  romanNumeral.split('').forEach(ltr => {
    if(undefined === DIGIT_VALUES[ltr]) {romanNumeral = null;}
  });
  if(null === romanNumeral) {return 'null';}

  const keys = ['I','V','X','L','C','D','M'];

  const len = romanNumeral.length;
  if(0 === len) {return 0;}

  if(1 === len){
    return DIGIT_VALUES[romanNumeral];
  }

  if(DIGIT_VALUES[romanNumeral[len-1]] > DIGIT_VALUES[romanNumeral[len-2]]){
    return translateRomanNumeral(romanNumeral.slice(0,-2))
      - translateRomanNumeral(romanNumeral.slice(-2,-1))
      + translateRomanNumeral(romanNumeral.slice(-1));
  }

  return translateRomanNumeral(romanNumeral.slice(0,-1)) + translateRomanNumeral(romanNumeral.slice(-1));
}

console.log(translateRomanNumeral('horse'));
