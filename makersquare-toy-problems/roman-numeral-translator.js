/*
 Given a roman numeral as input, write a function that converts the roman numeral to a number and outputs it.

 In a roman numeral, each character adds its value to the total. See the helper object DIGIT_VALUES for the correspondence between roman numeral characters and integers.
 VI = 6 (5 + 1 = 6)
 LXX = 70 (50 + 10 + 10 = 70)
 MCC = 1200 (1000 + 100 + 100 = 1200)

 When a smaller numeral appears before a larger one, it becomes a subtractive operation. You can assume only one smaller numeral may appear in front of larger one.
 IV = 4 (5 – 1 = 4)
 XC = 90 (100 – 10 = 90)
 CM = 900 (1000 – 100 = 900)

 You should return "null" on invalid input.


 */

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
